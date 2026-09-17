import { useState, useCallback } from 'react';
import type { AppView, RequestDraft } from '@/types';
import { categories, findCategory, findSubcategory, findService } from '@/data/catalog';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategoryGrid from '@/components/CategoryGrid';
import SubcategoryView from '@/components/SubcategoryView';
import ServiceDetail from '@/components/ServiceDetail';
import SubmissionConfirmation from '@/components/SubmissionConfirmation';
import Footer from '@/components/Footer';
import PriceListPage from '@/components/PriceListPage';
import HowItWorksPage from '@/components/HowItWorksPage';
import AboutPage from '@/components/AboutPage';
import ContactPage from '@/components/ContactPage';
import Breadcrumbs from '@/components/Breadcrumbs';
import MatrixBackground from '@/components/MatrixBackground';

function emptyDraft(categoryId: string, subcategoryId: string, serviceId: string): RequestDraft {
  return {
    categoryId,
    subcategoryId,
    serviceId,
    customerName: '',
    customerSurname: '',
    answers: {},
    description: '',
    speed: 'normal',
    material: 'self',
    riskAccepted: false,
    proposedPrice: '',
    files: [],
  };
}

export default function App() {
  const [view, setView] = useState<AppView>({ name: 'home' });
  const [draft, setDraft] = useState<RequestDraft | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const navigate = useCallback((v: AppView) => {
    if (v.name === 'service') {
      setDraft(emptyDraft(v.categoryId, v.subcategoryId, v.serviceId));
      setSubmitted(false);
      setSubmitError(null);
    }
    setView(v);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectCategory = (categoryId: string) => {
    const cat = categories.find((c) => c.id === categoryId);
    if (!cat) return;
    const sub = cat.subcategories[0];
    if (cat.subcategories.length === 1 && sub.services.length === 1) {
      navigate({ name: 'service', categoryId, subcategoryId: sub.id, serviceId: sub.services[0].id });
    } else {
      navigate({ name: 'subcategory', categoryId, subcategoryId: sub.id });
    }
  };

  const handleSelectSubcategory = (categoryId: string, subcategoryId: string) => {
    navigate({ name: 'subcategory', categoryId, subcategoryId });
  };

  const handleSelectService = (categoryId: string, subcategoryId: string, serviceId: string) => {
    navigate({ name: 'service', categoryId, subcategoryId, serviceId });
  };

  const handleSubmit = async () => {
    if (!draft) return;
    const cat = findCategory(view.categoryId);
    const sub = findSubcategory(view.categoryId, view.subcategoryId);
    const svc = findService(view.categoryId, view.subcategoryId, view.serviceId);
    if (!cat || !sub || !svc) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-request`;
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          customerName: draft.customerName,
          customerSurname: draft.customerSurname,
          categoryName: cat.name,
          serviceName: svc.name,
          answers: draft.answers,
          description: draft.description,
          speed: draft.speed,
          material: draft.material,
          proposedPrice: draft.proposedPrice,
          files: draft.files,
        }),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error ?? `HTTP ${res.status}`);
      }

      setSubmitted(true);
      setView({ name: 'message', categoryId: cat.id, subcategoryId: sub.id, serviceId: svc.id });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Neznáma chyba');
      setView({ name: 'message', categoryId: cat.id, subcategoryId: sub.id, serviceId: svc.id });
    } finally {
      setSubmitting(false);
    }
  };

  const renderView = () => {
    if (view.name === 'home') {
      return (
        <>
          <Hero onNavigate={navigate} />
          <CategoryGrid categories={categories} onSelectCategory={handleSelectCategory} onNavigate={navigate} />
        </>
      );
    }

    if (view.name === 'categories') {
      return (
        <CategoryGrid categories={categories} onSelectCategory={handleSelectCategory} onNavigate={navigate} />
      );
    }

    if (view.name === 'pricelist') {
      return <PriceListPage />;
    }

    if (view.name === 'how-it-works') {
      return <HowItWorksPage />;
    }

    if (view.name === 'about') {
      return <AboutPage onNavigate={navigate} />;
    }

    if (view.name === 'contact') {
      return <ContactPage onNavigate={navigate} />;
    }

    if (view.name === 'subcategory') {
      const cat = findCategory(view.categoryId);
      if (!cat) return null;
      const sub = cat.subcategories.find((s) => s.id === view.subcategoryId);
      if (!sub) return null;
      return (
        <>
          <Breadcrumbs
            crumbs={[{ label: 'Domov', onClick: () => navigate({ name: 'home' }) }, { label: cat.name }]}
            onBack={() => navigate({ name: 'home' })}
          />
          <SubcategoryView
            category={cat}
            onSelectSubcategory={(subcategoryId) => handleSelectSubcategory(cat.id, subcategoryId)}
            onSelectService={(subcategoryId, svcId) => handleSelectService(cat.id, subcategoryId, svcId)}
          />
        </>
      );
    }

    if (view.name === 'service') {
      const cat = findCategory(view.categoryId);
      if (!cat) return null;
      const sub = findSubcategory(view.categoryId, view.subcategoryId);
      if (!sub) return null;
      const svc = findService(view.categoryId, view.subcategoryId, view.serviceId);
      if (!svc) return null;
      if (!draft) {
        return null;
      }
      return (
        <>
          <Breadcrumbs
            crumbs={[
              { label: 'Domov', onClick: () => navigate({ name: 'home' }) },
              { label: cat.name, onClick: () => navigate({ name: 'subcategory', categoryId: cat.id, subcategoryId: sub.id }) },
            ]}
          />
          <ServiceDetail
            category={cat}
            service={svc}
            draft={draft!}
            onUpdateDraft={(updates) => setDraft((current) => current ? { ...current, ...updates } : current)}
            onGenerateMessage={handleSubmit}
            submitting={submitting}
          />
        </>
      );
    }

    if (view.name === 'message') {
      const cat = findCategory(view.categoryId);
      if (!cat) return null;
      const sub = findSubcategory(view.categoryId, view.subcategoryId);
      if (!sub) return null;
      const svc = findService(view.categoryId, view.subcategoryId, view.serviceId);
      if (!svc) return null;
      return (
        <>
          <Breadcrumbs
            crumbs={[
              { label: 'Domov', onClick: () => navigate({ name: 'home' }) },
              { label: cat.name, onClick: () => navigate({ name: 'subcategory', categoryId: cat.id, subcategoryId: sub.id }) },
              { label: svc.name, onClick: () => navigate({ name: 'service', categoryId: cat.id, subcategoryId: sub.id, serviceId: svc.id }) },
            ]}
          />
          <SubmissionConfirmation
            category={cat}
            service={svc}
            draft={draft!}
            submitted={submitted}
            error={submitError}
            onBack={() => navigate({ name: 'service', categoryId: cat.id, subcategoryId: sub.id, serviceId: svc.id })}
            onDone={() => navigate({ name: 'home' })}
          />
        </>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <MatrixBackground opacity={0.15} />
      <Header currentView={view} onNavigate={navigate} />
      <main>{renderView()}</main>
      <Footer onNavigate={navigate} />
    </div>
  );
}
