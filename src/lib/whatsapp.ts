import type { Category, Service, RequestDraft, SpeedOption } from '@/types';
import { speedOptions } from '@/config';

const speedLabels: Record<SpeedOption, string> = speedOptions.reduce(
  (acc, opt) => ({ ...acc, [opt.id]: opt.label }),
  {} as Record<SpeedOption, string>
);

const materialLabels: Record<string, string> = {
  self: 'Mám vlastný',
  needed: 'Potrebujem',
  unknown: 'Neviem',
};

export function generateWhatsAppMessage(
  category: Category,
  service: Service,
  draft: RequestDraft
): string {
  const lines: string[] = [];

  lines.push(`*${service.name}*`);
  lines.push(`Kategória: ${category.name}`);
  lines.push('');

  const answered = service.questions.filter((q) => {
    const val = draft.answers[q.id];
    return val && val.trim().length > 0;
  });

  if (answered.length > 0) {
    lines.push('*Detaily:*');
    for (const q of answered) {
      lines.push(`• ${q.label}: ${draft.answers[q.id]}`);
    }
    lines.push('');
  }

  if (draft.description.trim()) {
    lines.push('*Popis:*');
    lines.push(draft.description.trim());
    lines.push('');
  }

  lines.push(`*Rýchlosť:* ${speedLabels[draft.speed]}`);

  if (service.hasMaterial) {
    lines.push(`*Materiál:* ${materialLabels[draft.material] ?? draft.material}`);
  }

  if (draft.proposedPrice.trim()) {
    lines.push(`*Navrhovaná cena:* ${draft.proposedPrice.trim()} €`);
  }

  if (draft.files.length > 0) {
    lines.push('');
    lines.push(`*Priložené súbory:* ${draft.files.join(', ')}`);
  }

  return lines.join('\n');
}
