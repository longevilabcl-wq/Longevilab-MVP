import { LeadSubmission } from '../types';

export const DEFAULT_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbxzCt9Cp5L4Kx7QprE5NIc8MIsaXfn18gvoaFhjYXs8wo5Cf5iTs4AWlgfZmdQAHpkJqw/exec';

const LEADS_STORAGE_KEY = 'longevilab_leads_submissions_v1';
const WEBHOOK_STORAGE_KEY = 'longevilab_leads_webhook_url';
const LAST_DISPATCH_KEY = 'longevilab_last_dispatch_status';

export function normalizeWebhookUrl(url: string): string {
  if (!url) return '';
  let clean = url.trim();
  // If the user copied the dev or edit URL from Google Apps Script, convert to /exec
  if (clean.includes('script.google.com/macros/s/')) {
    clean = clean.replace(/\/dev(\?.*)?$/, '/exec$1').replace(/\/edit(\?.*)?$/, '/exec$1');
  }
  return clean;
}

export function getWebhookUrl(): string {
  if (typeof window === 'undefined') return DEFAULT_WEBHOOK_URL;
  const stored = localStorage.getItem(WEBHOOK_STORAGE_KEY);
  if (stored) return normalizeWebhookUrl(stored);
  const envUrl = (import.meta as any).env?.VITE_LEADS_WEBHOOK_URL;
  if (envUrl) return normalizeWebhookUrl(envUrl);
  return DEFAULT_WEBHOOK_URL;
}

export function setWebhookUrl(url: string): void {
  if (typeof window === 'undefined') return;
  const clean = normalizeWebhookUrl(url);
  if (!clean) {
    localStorage.removeItem(WEBHOOK_STORAGE_KEY);
  } else {
    localStorage.setItem(WEBHOOK_STORAGE_KEY, clean);
  }
}

export function getLastDispatchStatus(): { timestamp: string; success: boolean; url: string; error?: string } | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(LAST_DISPATCH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Dispatches a lead submission to the configured Webhook (Google Sheets Apps Script or Zapier/Make)
 */
export async function dispatchToWebhook(lead: LeadSubmission, customUrl?: string): Promise<boolean> {
  const rawUrl = customUrl || getWebhookUrl();
  const url = normalizeWebhookUrl(rawUrl);
  if (!url) {
    console.warn('No webhook URL configured. Lead saved only locally.');
    return false;
  }

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

    localStorage.setItem(
      LAST_DISPATCH_KEY,
      JSON.stringify({
        timestamp: new Date().toISOString(),
        success: true,
        url,
      })
    );
    return true;
  } catch (err: any) {
    console.warn('Webhook dispatch failed:', err);
    localStorage.setItem(
      LAST_DISPATCH_KEY,
      JSON.stringify({
        timestamp: new Date().toISOString(),
        success: false,
        url,
        error: err?.message || 'Error de conexión',
      })
    );
    return false;
  }
}

/**
 * Syncs all locally stored leads to the Google Sheets webhook
 */
export async function syncAllLeadsToWebhook(): Promise<{ count: number; success: boolean; message: string }> {
  const leads = getStoredLeads();
  const url = getWebhookUrl();

  if (!url) {
    return { count: 0, success: false, message: 'No hay URL de Google Sheets configurada.' };
  }

  if (leads.length === 0) {
    return { count: 0, success: false, message: 'No hay respuestas registradas para enviar.' };
  }

  let sent = 0;
  for (const lead of leads) {
    await dispatchToWebhook(lead, url);
    sent++;
    // small pause between calls
    await new Promise((r) => setTimeout(r, 400));
  }

  return {
    count: sent,
    success: true,
    message: `Se enviaron ${sent} respuestas a tu Google Sheet con éxito.`,
  };
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

