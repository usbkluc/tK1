import { useState, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import type { AppView, RequestDraft } from '@/types';
import { categories, findCategory, findSubcategory, findService } from '@/data/catalog';
import { speedOptions, siteConfig } from '@/config';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategoryGrid from '@/components/CategoryGrid';
import SubcategoryView from '@/components/SubcategoryView';
import ServiceDetail from '@/components/ServiceDetail';
import WhatsAppMessagePreview from '@/components/WhatsAppMessagePreview';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import PriceListPage from '@/components/PriceListPage';
import HowItWorksPage from '@/components/HowItWorksPage';
import AboutPage from '@/components/AboutPage';
import ContactPage from '@/components/ContactPage';
import Breadcrumbs from '@/components/Breadcrumbs';
import MatrixBackground from '@/components/MatrixBackground';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function emptyDraft(categoryId: string, subcategoryId: string, serviceId: string): RequestDraft {
  return {
    categoryId,
    subcategoryId,
    serviceId,
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

  const navigate = useCallback((v: AppView) => {
    if (v.name === 'service') {
      setDraft(emptyDraft(v.categoryId, v.subcategoryId, v.serviceId));
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

  const handleSubmitToWhatsApp = async () => {
    if (!draft) return;
    const cat = findCategory(view.name === 'message' ? view.categoryId : '');
    if (!cat) return;
    const sub = findSubcategory(cat.id, view.name === 'message' ? view.subcategoryId : '');
    const svc = findService(cat.id, sub?.id ?? '', view.name === 'message' ? view.serviceId : '');
    if (!sub || !svc) return;

    try {
      await supabase.from('service_requests').insert({
        category_id: cat.id,
        category_name: cat.name,
        subcategory_id: sub.id,
        subcategory_name: sub.name,
        service_id: svc.id,
        service_name: svc.name,
        answers: draft.answers,
        description: draft.description,
        speed: draft.speed,
        material: draft.material,
        risk_accepted: draft.riskAccepted,
        files: draft.files,
        status: 'pending',
      });
    } catch {
      // ignore DB errors — WhatsApp is the primary channel
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
            onGenerateMessage={() => {
              handleSubmitToWhatsApp();
              navigate({ name: 'message', categoryId: cat.id, subcategoryId: sub.id, serviceId: svc.id });
            }}
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
          <WhatsAppMessagePreview
            category={cat}
            service={svc}
            draft={draft!}
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
      {view.name !== 'message' && <WhatsAppButton variant="floating" text="Napíš na WhatsApp" />}
    </div>
  );
}
