import { LeadSubmission } from '../types';

const LEADS_STORAGE_KEY = 'longevilab_leads_submissions_v1';
const WEBHOOK_STORAGE_KEY = 'longevilab_leads_webhook_url';

export function getWebhookUrl(): string {
  if (typeof window === 'undefined') return '';
  const stored = localStorage.getItem(WEBHOOK_STORAGE_KEY);
  if (stored) return stored.trim();
  const envUrl = (import.meta as any).env?.VITE_LEADS_WEBHOOK_URL;
  return (envUrl || '').trim();
}

export function setWebhookUrl(url: string): void {
  if (typeof window === 'undefined') return;
  if (!url || !url.trim()) {
    localStorage.removeItem(WEBHOOK_STORAGE_KEY);
  } else {
    localStorage.setItem(WEBHOOK_STORAGE_KEY, url.trim());
  }
}

/**
 * Dispatches a lead submission to the configured Webhook (Google Sheets Apps Script or Zapier/Make)
 */
async function dispatchToWebhook(lead: LeadSubmission, customUrl?: string): Promise<boolean> {
  const url = customUrl || getWebhookUrl();
  if (!url) return false;

  try {
    // Note: Google Apps Script Web Apps require 'mode: no-cors' or text/plain to avoid CORS 302 preflight issues in browsers
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(lead),
    });
    return true;
  } catch (err) {
    console.warn('Webhook dispatch failed:', err);
    return false;
  }
}

/**
 * Service to manage interested leads submissions.
 * Stores reliably in localStorage (with exportable CSV/JSON for the team),
 * and dispatches to Google Sheets / Webhook in real time.
 */
export function saveLeadSubmission(submission: Omit<LeadSubmission, 'id' | 'createdAt'>): LeadSubmission {
  const newLead: LeadSubmission = {
    ...submission,
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
  };

  try {
    const existing = getStoredLeads();
    const updated = [newLead, ...existing];
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));

    // Dispatch in background
    dispatchToWebhook(newLead);
  } catch (error) {
    console.error('Failed to save lead submission:', error);
  }

  return newLead;
}

export function getStoredLeads(): LeadSubmission[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read leads:', err);
    return [];
  }
}

export function deleteLead(id: string): void {
  const leads = getStoredLeads();
  const filtered = leads.filter((l) => l.id !== id);
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(filtered));
}

export function clearAllLeads(): void {
  localStorage.removeItem(LEADS_STORAGE_KEY);
}

/**
 * Sends a test row to verify Google Sheets integration
 */
export async function sendTestWebhook(targetUrl?: string): Promise<{ success: boolean; message: string }> {
  const url = targetUrl || getWebhookUrl();
  if (!url) {
    return { success: false, message: 'No hay URL configurada.' };
  }

  const testLead: LeadSubmission = {
    id: `test_${Date.now()}`,
    source: 'mapa_longevidad',
    name: 'Prueba de Conexión LongeviLab',
    email: 'contacto.prueba@longevilab.cl',
    phone: '+56 9 1234 5678',
    region: 'Región Metropolitana',
    interests: ['Prueba de sincronización con Google Sheets'],
    message: 'Esta es una fila de prueba generada desde la plataforma web.',
    mapSummary: {
      date: new Date().toLocaleDateString('es-CL'),
      phrase: 'Prueba de integración exitosa',
      priorities: ['Sincronización', 'Automatización'],
      importantThemes: ['Prueba técnica'],
    },
    createdAt: new Date().toISOString(),
  };

  try {
    await dispatchToWebhook(testLead, url);
    return { success: true, message: 'Fila de prueba enviada con éxito. Revisa tu Google Sheet.' };
  } catch (err: any) {
    return { success: false, message: `Error al enviar: ${err?.message || 'Error de red'}` };
  }
}

/**
 * Helper to download leads as CSV for the LongeviLab team
 */
export function exportLeadsToCSV(): void {
  const leads = getStoredLeads();
  if (leads.length === 0) {
    alert('Aún no hay registros guardados en este dispositivo.');
    return;
  }

  const headers = ['Fecha', 'Origen', 'Nombre', 'Email', 'Teléfono', 'Región', 'Intereses', 'Mensaje', 'Frase Mapa', 'Prioridades'];
  const rows = leads.map((l) => [
    `"${new Date(l.createdAt).toLocaleString('es-CL')}"`,
    `"${l.source === 'mapa_longevidad' ? 'Mapa de Longevidad' : 'Contacto Web'}"`,
    `"${(l.name || '').replace(/"/g, '""')}"`,
    `"${(l.email || '').replace(/"/g, '""')}"`,
    `"${(l.phone || '').replace(/"/g, '""')}"`,
    `"${(l.region || '').replace(/"/g, '""')}"`,
    `"${(l.interests || []).join('; ')}"`,
    `"${(l.message || '').replace(/"/g, '""')}"`,
    `"${(l.mapSummary?.phrase || '').replace(/"/g, '""')}"`,
    `"${(l.mapSummary?.priorities || []).join('; ')}"`,
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `longevilab_interesados_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

