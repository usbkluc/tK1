import { useState } from 'react';
import { MessageCircle, Copy, CheckCheck } from 'lucide-react';
import { siteConfig } from '@/config';

interface WhatsAppButtonProps {
  variant?: 'primary' | 'floating' | 'compact';
  className?: string;
  text?: string;
}

export default function WhatsAppButton({
  variant = 'primary',
  className = '',
  text = 'Poslať na WhatsApp',
}: WhatsAppButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    const message = siteConfig.whatsappDefaultText;
    try {
      await navigator.clipboard.writeText(message);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = message;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const base =
    'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 rounded-xl';

  const variants = {
    primary:
      'bg-[#25D366] hover:bg-[#1ebe5d] text-white px-5 py-3 shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:-translate-y-0.5',
    floating:
      'fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-5 py-3.5 shadow-xl shadow-[#25D366]/30 hover:shadow-2xl hover:shadow-[#25D366]/50 hover:-translate-y-1',
    compact:
      'bg-[#25D366] hover:bg-[#1ebe5d] text-white px-4 py-2 text-sm shadow-md shadow-[#25D366]/20',
  };

  const iconSize = variant === 'compact' ? 16 : 20;

  return (
    <button
      onClick={handleCopy}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {copied ? (
        <>
          <CheckCheck size={iconSize} className="shrink-0" />
          <span>Skopírované!</span>
        </>
      ) : (
        <>
          <MessageCircle size={iconSize} className="shrink-0" />
          <span>{text}</span>
        </>
      )}
    </button>
  );
}
