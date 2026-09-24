/**
 * 🏛️ MIZEN Studio — Lead Submission Service
 * 
 * Capa de servicio desacoplada para el procesamiento y captura de solicitudes de diagnóstico.
 * Previene llamadas de red rotas a endpoints no provisionados y provee un contrato
 * tipado listo para conectar un Webhook / Cloud Function / Resend en producción.
 */

export interface LeadPayload {
  selectedService: string;
  email: string;
  acceptedPrivacy: boolean;
  honeypotToken?: string;
}

export interface LeadSubmissionResult {
  success: boolean;
  trackingId: string;
  timestamp: string;
  error?: string;
}

/**
 * Genera un identificador de seguimiento criptográficamente seguro utilizando Web Crypto API.
 */
export const generateSecureTrackingId = (): string => {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    const code = 1000 + (array[0] % 9000);
    return `MZ-DIAG-${code}`;
  }
  return `MZ-DIAG-${Date.now().toString().slice(-4)}`;
};

/**
 * Validador defensivo de formato de email bajo estándar RFC 5321.
 */
export const isValidCorporateEmail = (email: string): boolean => {
  const cleanEmail = email.trim();
  if (!cleanEmail || cleanEmail.length > 254) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(cleanEmail);
};

export const submitDiagnosticRequest = async (payload: LeadPayload): Promise<LeadSubmissionResult> => {
  const trackingId = generateSecureTrackingId();
  const timestamp = new Date().toISOString();

  // 1. Detección silenciosa de bots vía honeypot
  if (payload.honeypotToken && payload.honeypotToken.trim().length > 0) {
    return {
      success: true,
      trackingId,
      timestamp
    };
  }

  // 2. Validación de frontera de datos
  if (!isValidCorporateEmail(payload.email)) {
    return {
      success: false,
      trackingId: '',
      timestamp,
      error: 'Por favor, introduzca una dirección de correo profesional válida.'
    };
  }

  if (!payload.acceptedPrivacy) {
    return {
      success: false,
      trackingId: '',
      timestamp,
      error: 'Es necesario confirmar la aceptación de la política de confidencialidad para continuar.'
    };
  }

  // 3. Simulación de persistencia segura local
  try {
    const sessionRecord = {
      trackingId,
      timestamp,
      service: payload.selectedService,
      status: 'PENDING_DISPATCH'
    };
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem(`mizen_lead_${trackingId}`, JSON.stringify(sessionRecord));
    }
  } catch {
    // Modo defensivo: no bloquea si sessionStorage está restringido
  }

  // Punto de extensión: en el futuro, conectar aquí fetch('/api/leads', ...)
  return {
    success: true,
    trackingId,
    timestamp
  };
};
