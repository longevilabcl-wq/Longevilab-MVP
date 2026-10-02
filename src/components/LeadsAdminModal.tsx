import React, { useState, useEffect } from 'react';
import {
  getStoredLeads,
  getWebhookUrl,
  setWebhookUrl,
  sendTestWebhook,
  exportLeadsToCSV,
  deleteLead,
  clearAllLeads,
} from '../services/leadService';
import { LeadSubmission } from '../types';
import {
  X,
  FileSpreadsheet,
  Download,
  Trash2,
  Copy,
  Check,
  Send,
  Users,
  Settings,
  AlertCircle,
  HelpCircle,
  Lock,
  KeyRound,
  ShieldCheck,
  LogOut,
} from 'lucide-react';

interface LeadsAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_PIN = 'longevi2026';
const PIN_STORAGE_KEY = 'longevilab_admin_pin_v1';

export const LeadsAdminModal: React.FC<LeadsAdminModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [enteredPin, setEnteredPin] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'leads' | 'sheets'>('sheets');
  const [leads, setLeads] = useState<LeadSubmission[]>([]);
  const [webhookInput, setWebhookInput] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [testStatus, setTestStatus] = useState<{ loading: boolean; message: string | null; isError: boolean }>({
    loading: false,
    message: null,
    isError: false,
  });
  const [copiedCode, setCopiedCode] = useState(false);

  // Change PIN state
  const [isChangingPin, setIsChangingPin] = useState(false);
  const [newPinInput, setNewPinInput] = useState('');
  const [changePinSuccess, setChangePinSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLeads(getStoredLeads());
      setWebhookInput(getWebhookUrl());
      setTestStatus({ loading: false, message: null, isError: false });
      setEnteredPin('');
      setPinError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getSavedPin = () => {
    return localStorage.getItem(PIN_STORAGE_KEY) || DEFAULT_PIN;
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = getSavedPin();
    if (enteredPin.trim() === correctPin.trim()) {
      setIsAuthenticated(true);
      setPinError(null);
    } else {
      setPinError('PIN incorrecto. Intenta de nuevo.');
      setEnteredPin('');
    }
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPinInput.trim().length < 4) {
      alert('El PIN debe tener al menos 4 caracteres.');
      return;
    }
    localStorage.setItem(PIN_STORAGE_KEY, newPinInput.trim());
    setChangePinSuccess(true);
    setTimeout(() => {
      setChangePinSuccess(false);
      setIsChangingPin(false);
      setNewPinInput('');
    }, 2000);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEnteredPin('');
    onClose();
  };

  const handleSaveWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    setWebhookUrl(webhookInput.trim());
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleSendTest = async () => {
    setTestStatus({ loading: true, message: null, isError: false });
    const result = await sendTestWebhook(webhookInput.trim());
    setTestStatus({
      loading: false,
      message: result.message,
      isError: !result.success,
    });
    // refresh local list since test also adds or verifies
    setLeads(getStoredLeads());
  };

  const handleDeleteOne = (id: string) => {
    if (confirm('¿Eliminar este registro local?')) {
      deleteLead(id);
      setLeads(getStoredLeads());
    }
  };

  const handleClearAll = () => {
    if (confirm('¿Estás seguro de vaciar todos los registros locales? (No afectará tu Google Sheet si ya los sincronizaste)')) {
      clearAllLeads();
      setLeads([]);
    }
  };

  const GOOGLE_APPS_SCRIPT_CODE = `function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Si la hoja está vacía, crear encabezados automáticos
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Fecha y Hora',
        'Origen',
        'Nombre',
        'Email',
        'Teléfono',
        'Región',
        'Intereses',
        'Mensaje',
        'Frase del Mapa',
        'Prioridades Seleccionadas'
      ]);
      sheet.getRange(1, 1, 1, 10).setFontWeight('bold').setBackground('#E8F0E7');
    }
    
    var fecha = new Date(data.createdAt || new Date()).toLocaleString('es-CL', { timeZone: 'America/Santiago' });
    var origen = data.source === 'mapa_longevidad' ? 'Mapa de Longevidad' : 'Contacto General';
    var intereses = (data.interests || []).join('; ');
    var frase = data.mapSummary ? (data.mapSummary.phrase || '') : '';
    var prioridades = data.mapSummary && data.mapSummary.priorities ? data.mapSummary.priorities.join('; ') : '';
    
    sheet.appendRow([
      fecha,
      origen,
      data.name || '',
      data.email || '',
      data.phone || '',
      data.region || '',
      intereses,
      data.message || '',
      frase,
      prioridades
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

  const copyScriptToClipboard = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  if (!isAuthenticated) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pin-modal-title"
        className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      >
        <div className="bg-[#FAF7F2] rounded-3xl max-w-md w-full border-2 border-[#879B83]/30 shadow-2xl p-7 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-[#DFEBDE] text-[#4F6757] flex items-center justify-center font-bold">
              <Lock className="w-6 h-6 stroke-[2.5]" />
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-[#303530]/70 hover:text-[#303530] hover:bg-black/5 transition-colors cursor-pointer"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C97863] bg-[#FDF5F1] px-2.5 py-1 rounded-full border border-[#E8B89F]">
              Área Privada
            </span>
            <h3 id="pin-modal-title" className="text-2xl font-extrabold text-[#303530] tracking-tight">
              Acceso Administrativo
            </h3>
            <p className="text-sm text-[#303530]/75 leading-relaxed">
              Esta sección está reservada para el equipo de LongeviLab. Ingresa tu PIN de seguridad para acceder a los registros y la configuración.
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="admin-pin-input" className="block text-xs font-bold uppercase tracking-wider text-[#4F6757]">
                PIN de Seguridad
              </label>
              <input
                id="admin-pin-input"
                type="password"
                required
                autoFocus
                value={enteredPin}
                onChange={(e) => setEnteredPin(e.target.value)}
                placeholder="••••••••"
                className="w-full p-4 rounded-xl bg-white border-2 border-[#879B83]/30 text-lg font-mono text-[#303530] tracking-widest focus:border-[#4F6757] focus:outline-none transition-colors"
              />
            </div>

            {pinError && (
              <div className="p-3 rounded-xl bg-[#FDF5F1] border border-[#C97863] text-[#C97863] text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{pinError}</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-3 rounded-xl text-sm font-semibold text-[#303530]/70 hover:bg-black/5 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4F6757] hover:bg-[#3D5244] text-white text-sm font-bold shadow-sm transition-colors cursor-pointer"
              >
                <KeyRound className="w-4 h-4" />
                <span>Desbloquear</span>
              </button>
            </div>
          </form>

          <div className="pt-3 border-t border-[#879B83]/20 flex items-center justify-center gap-2 text-xs text-[#303530]/60">
            <ShieldCheck className="w-3.5 h-3.5 text-[#879B83]" />
            <span>PIN predeterminado inicial: <code className="bg-black/5 px-1.5 py-0.5 rounded text-[#303530] font-mono">longevi2026</code></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="leads-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
    >
      <div className="bg-[#FAF7F2] rounded-3xl max-w-4xl w-full border-2 border-[#879B83]/30 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-5 bg-white border-b border-[#879B83]/20 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#DFEBDE] text-[#4F6757] flex items-center justify-center font-bold">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 id="leads-modal-title" className="text-xl sm:text-2xl font-bold text-[#303530]">
                Gestión de Personas Interesadas
              </h2>
              <p className="text-xs sm:text-sm text-[#303530]/75">
                Conexión con Google Sheets y visualizador de respuestas de LongeviLab
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsChangingPin(!isChangingPin)}
              title="Cambiar PIN de seguridad"
              className="p-2 rounded-xl text-[#303530]/70 hover:text-[#4F6757] hover:bg-[#FAF7F2] transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1"
            >
              <KeyRound className="w-4 h-4" />
              <span className="hidden sm:inline">PIN</span>
            </button>
            <button
              type="button"
              onClick={handleLogout}
              title="Cerrar sesión de administración"
              className="p-2 rounded-xl text-[#303530]/70 hover:text-[#C97863] hover:bg-[#FAF7F2] transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Salir</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-[#303530]/70 hover:text-[#303530] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
              aria-label="Cerrar ventana"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Change PIN Banner */}
        {isChangingPin && (
          <form onSubmit={handleChangePin} className="p-4 bg-[#F2F6F1] border-b border-[#879B83]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-[#4F6757]" />
              <span className="font-bold text-[#303530]">Definir nuevo PIN de acceso:</span>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="password"
                required
                value={newPinInput}
                onChange={(e) => setNewPinInput(e.target.value)}
                placeholder="Nuevo PIN (mín. 4 car.)"
                className="p-2 rounded-lg bg-white border border-[#879B83]/40 text-xs font-mono w-44"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-lg bg-[#4F6757] hover:bg-[#3D5244] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={() => setIsChangingPin(false)}
                className="px-2 py-2 text-xs text-[#303530]/60 hover:text-[#303530] cursor-pointer"
              >
                Cancelar
              </button>
            </div>
            {changePinSuccess && (
              <span className="text-xs font-bold text-[#4F6757] flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> ¡PIN actualizado!
              </span>
            )}
          </form>
        )}

        {/* Tabs */}
        <div className="px-6 pt-3 bg-white border-b border-[#879B83]/20 flex gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('sheets')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-bold text-sm transition-all border-b-2 cursor-pointer ${
              activeTab === 'sheets'
                ? 'border-[#4F6757] text-[#4F6757] bg-[#FAF7F2]'
                : 'border-transparent text-[#303530]/70 hover:text-[#303530]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Conectar a Google Sheets</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-bold text-sm transition-all border-b-2 cursor-pointer ${
              activeTab === 'leads'
                ? 'border-[#4F6757] text-[#4F6757] bg-[#FAF7F2]'
                : 'border-transparent text-[#303530]/70 hover:text-[#303530]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Ver Respuestas Registradas ({leads.length})</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-[#303530]">
          {activeTab === 'sheets' ? (
            <div className="space-y-6">
              {/* Status Box */}
              <div className="p-5 rounded-2xl bg-white border-2 border-[#879B83]/30 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-[#303530]">
                      URL del Webhook de tu Google Sheets
                    </h3>
                    <p className="text-xs sm:text-sm text-[#303530]/75">
                      Cuando alguien complete el formulario en el Mapa de Longevidad o en Contacto, los datos se enviarán inmediatamente a esta hoja.
                    </p>
                  </div>
                  {webhookInput ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#DFEBDE] text-[#4F6757]">
                      <Check className="w-3.5 h-3.5" /> Conectado
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FDF5F1] text-[#C97863]">
                      <AlertCircle className="w-3.5 h-3.5" /> Sin configurar
                    </span>
                  )}
                </div>

                <form onSubmit={handleSaveWebhook} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="url"
                      placeholder="https://script.google.com/macros/s/.../exec"
                      value={webhookInput}
                      onChange={(e) => setWebhookInput(e.target.value)}
                      className="flex-1 p-3.5 rounded-xl bg-[#FAF7F2] border-2 border-[#879B83]/30 text-sm text-[#303530] focus:border-[#4F6757] focus:bg-white focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-5 py-3.5 rounded-xl bg-[#4F6757] hover:bg-[#3D5244] text-white font-bold text-sm transition-colors cursor-pointer shrink-0"
                    >
                      Guardar URL
                    </button>
                    {webhookInput && (
                      <button
                        type="button"
                        onClick={handleSendTest}
                        disabled={testStatus.loading}
                        className="px-4 py-3.5 rounded-xl bg-[#C97863] hover:bg-[#B56652] text-white font-bold text-sm transition-colors cursor-pointer shrink-0 inline-flex items-center gap-2 disabled:opacity-50"
                      >
                        <Send className="w-4 h-4" />
                        <span>{testStatus.loading ? 'Enviando...' : 'Probar conexión'}</span>
                      </button>
                    )}
                  </div>
                </form>

                {savedSuccess && (
                  <p className="text-xs font-bold text-[#4F6757] flex items-center gap-1.5">
                    <Check className="w-4 h-4" /> URL guardada exitosamente en este navegador.
                  </p>
                )}

                {testStatus.message && (
                  <div
                    className={`p-3.5 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 ${
                      testStatus.isError
                        ? 'bg-[#FDF5F1] border border-[#C97863] text-[#C97863]'
                        : 'bg-[#DFEBDE] border border-[#879B83] text-[#4F6757]'
                    }`}
                  >
                    {testStatus.isError ? <AlertCircle className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                    <span>{testStatus.message}</span>
                  </div>
                )}
              </div>

              {/* Instructions 5-Step Guide */}
              <div className="bg-white rounded-2xl border-2 border-[#879B83]/20 p-6 space-y-5">
                <div className="flex items-center gap-2 text-base font-bold text-[#303530]">
                  <HelpCircle className="w-5 h-5 text-[#4F6757]" />
                  <h4>Paso a paso: ¿Cómo crear tu Google Sheet en 2 minutos?</h4>
                </div>

                <ol className="space-y-4 text-sm text-[#303530]/85 list-decimal pl-5">
                  <li className="leading-relaxed">
                    <strong>Crea una hoja de cálculo en blanco:</strong> Ve a tu Google Drive (con tu cuenta <code>longevilab.cl@gmail.com</code>) y abre una nueva hoja de cálculo llamada <em>“LongeviLab - Registro de Interesados”</em>.
                  </li>
                  <li className="leading-relaxed">
                    <strong>Abre el editor de scripts:</strong> En el menú superior de la hoja, haz clic en <strong>Extensiones &gt; Apps Script</strong>.
                  </li>
                  <li className="leading-relaxed">
                    <strong>Pega el código automatizador:</strong> Borra cualquier texto que aparezca en el editor y pega el siguiente código:
                    <div className="mt-2 relative">
                      <div className="absolute top-2 right-2 z-10">
                        <button
                          type="button"
                          onClick={copyScriptToClipboard}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#4F6757] hover:bg-[#3D5244] text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer transition-colors"
                        >
                          {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedCode ? '¡Copiado!' : 'Copiar código'}</span>
                        </button>
                      </div>
                      <pre className="p-4 rounded-xl bg-[#252825] text-[#DCE8DB] text-xs font-mono overflow-x-auto max-h-56 leading-relaxed border border-black/20">
                        {GOOGLE_APPS_SCRIPT_CODE}
                      </pre>
                    </div>
                  </li>
                  <li className="leading-relaxed">
                    <strong>Publica la aplicación web:</strong>
                    <ul className="list-disc pl-5 mt-1.5 space-y-1 text-xs sm:text-sm text-[#303530]/80">
                      <li>Haz clic en el botón azul superior <strong>“Implementar” &gt; “Nueva implementación”</strong>.</li>
                      <li>Haz clic en el ícono de engranaje ⚙️ y selecciona <strong>“Aplicación web”</strong>.</li>
                      <li>En <em>“Ejecutar como”</em>: Déjalo en <strong>“Yo”</strong> (tu email).</li>
                      <li>
                        En <em>“Quién tiene acceso”</em>: Selecciona <strong>“Cualquier usuario”</strong> (o <em>Anyone</em>). Esto es imprescindible para que la web pueda escribir en la hoja sin pedir inicio de sesión a los visitantes.
                      </li>
                      <li>Haz clic en <strong>“Implementar”</strong> (si te pide autorizar permisos, acéptalos).</li>
                    </ul>
                  </li>
                  <li className="leading-relaxed">
                    <strong>Copia la URL obtenida:</strong> Google te mostrará una URL que termina en <code>/exec</code>. Cópiala, pégala arriba en el campo <em>“URL del Webhook”</em> y haz clic en <strong>“Probar conexión”</strong>. ¡Listo! Verás aparecer una fila de prueba en tu hoja de inmediato.
                  </li>
                </ol>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Actions row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <p className="text-sm text-[#303530]/80">
                  Total de registros guardados localmente: <strong>{leads.length}</strong>
                </p>
                <div className="flex items-center gap-2">
                  {leads.length > 0 && (
                    <>
                      <button
                        type="button"
                        onClick={exportLeadsToCSV}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4F6757] hover:bg-[#3D5244] text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Descargar Excel (CSV)</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleClearAll}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FDF5F1] hover:bg-[#FCEAE2] border border-[#C97863]/30 text-[#C97863] text-xs font-bold transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Vaciar</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {leads.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-2xl border-2 border-dashed border-[#879B83]/30 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#DFEBDE] text-[#4F6757] flex items-center justify-center mx-auto">
                    <Users className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-[#303530]">Aún no hay respuestas en este navegador</h4>
                  <p className="text-xs sm:text-sm text-[#303530]/70 max-w-md mx-auto">
                    Cuando las personas completen el formulario al final del Mapa de Longevidad o en la página de Contacto, aparecerán aquí y también en tu Google Sheet configurado.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {leads.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-4 sm:p-5 rounded-2xl bg-white border border-[#879B83]/20 shadow-xs space-y-2 relative"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-base text-[#303530]">{lead.name}</span>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              lead.source === 'mapa_longevidad'
                                ? 'bg-[#DFEBDE] text-[#4F6757]'
                                : 'bg-[#FDF5F1] text-[#C97863]'
                            }`}
                          >
                            {lead.source === 'mapa_longevidad' ? 'Mapa Longevidad' : 'Contacto Web'}
                          </span>
                        </div>
                        <span className="text-xs text-[#303530]/60">
                          {new Date(lead.createdAt).toLocaleString('es-CL')}
                        </span>
                      </div>

                      <div className="text-xs sm:text-sm text-[#303530]/85 grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                        <div>
                          <strong>Email:</strong> <a href={`mailto:${lead.email}`} className="text-[#4F6757] underline">{lead.email}</a>
                        </div>
                        {lead.phone && (
                          <div>
                            <strong>Teléfono:</strong> <a href={`tel:${lead.phone}`} className="text-[#303530]">{lead.phone}</a>
                          </div>
                        )}
                        {lead.region && (
                          <div>
                            <strong>Región:</strong> {lead.region}
                          </div>
                        )}
                      </div>

                      {lead.interests && lead.interests.length > 0 && (
                        <div className="pt-1.5 flex flex-wrap gap-1">
                          {lead.interests.map((int, i) => (
                            <span
                              key={i}
                              className="text-[11px] bg-[#FAF7F2] border border-[#879B83]/30 px-2.5 py-0.5 rounded-lg text-[#303530]/80"
                            >
                              {int}
                            </span>
                          ))}
                        </div>
                      )}

                      {lead.mapSummary && (
                        <div className="mt-2 p-3 rounded-xl bg-[#FAF7F2] text-xs space-y-1 border border-[#879B83]/20">
                          <p className="font-bold text-[#4F6757]">Resumen del Mapa generado:</p>
                          {lead.mapSummary.phrase && (
                            <p className="italic text-[#303530]/85">“{lead.mapSummary.phrase}”</p>
                          )}
                          {lead.mapSummary.priorities && lead.mapSummary.priorities.length > 0 && (
                            <p className="text-[#303530]/75">
                              <strong>Prioridades:</strong> {lead.mapSummary.priorities.join(', ')}
                            </p>
                          )}
                        </div>
                      )}

                      {lead.message && (
                        <div className="mt-1 text-xs text-[#303530]/85 bg-[#FAF7F2] p-2.5 rounded-lg">
                          <strong>Mensaje:</strong> {lead.message}
                        </div>
                      )}

                      <div className="pt-1 flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleDeleteOne(lead.id)}
                          className="text-xs text-red-600 hover:text-red-800 transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Eliminar</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#879B83]/20 flex justify-between items-center shrink-0">
          <span className="text-xs text-[#303530]/60">
            LongeviLab • Datos almacenados de forma segura
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#879B83]/30 hover:bg-[#F2F6F1] font-bold text-sm text-[#303530] transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
