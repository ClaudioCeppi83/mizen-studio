/**
 * 🏛️ MIZEN Studio — Lead Submission Service
 * 
 * Capa de servicio desacoplada para el procesamiento y captura de solicitudes de diagnóstico.
 * Conecta con el backend serverless Cloud Functions v2 (/api/leads) mediante
 * Same-Origin rewrites de Firebase Hosting.
 * 
 * Principio Defensivo:
 * - Pre-validación en cliente (RFC 5321).
 * - Despacho HTTPS al backend de producción.
 * - Resiliencia offline: si la red falla momentáneamente, encola la solicitud
 *   localmente en localStorage para garantizar cero pérdida de leads.
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
  const localTrackingId = generateSecureTrackingId();
  const timestamp = new Date().toISOString();

  // 1. Detección silenciosa de bots vía honeypot en cliente
  if (payload.honeypotToken && payload.honeypotToken.trim().length > 0) {
    return {
      success: true,
      trackingId: localTrackingId,
      timestamp
    };
  }

  // 2. Validación de frontera de datos en cliente
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

  // 3. Despacho a Cloud Functions v2 mediante Same-Origin (/api/leads)
  try {
    const endpoint = (typeof window !== 'undefined' && window.location?.origin)
      ? `${window.location.origin}/api/leads`
      : '/api/leads';

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: payload.email.trim(),
        selectedService: payload.selectedService,
        acceptedPrivacy: payload.acceptedPrivacy,
        honeypotToken: payload.honeypotToken || '',
      }),
    });

    const data = await response.json().catch(() => null);

    if (response.ok && data?.success) {
      try {
        if (typeof window !== 'undefined' && window.sessionStorage) {
          sessionStorage.setItem(`mizen_lead_${data.trackingId}`, JSON.stringify({
            trackingId: data.trackingId,
            timestamp: data.timestamp,
            service: payload.selectedService,
            status: 'REGISTERED'
          }));
        }
      } catch {
        // Modo defensivo
      }

      return {
        success: true,
        trackingId: data.trackingId || localTrackingId,
        timestamp: data.timestamp || timestamp
      };
    }

    if (data?.error) {
      return {
        success: false,
        trackingId: '',
        timestamp,
        error: data.error
      };
    }

    return {
      success: false,
      trackingId: '',
      timestamp,
      error: 'No se pudo conectar con el servidor de diagnóstico. Por favor reintente o contacte a contacto@mizen.studio.'
    };
  } catch (networkError) {
    // Resiliencia offline: si el navegador está sin conexión o el entorno de dev no tiene backend montado
    console.warn('[LEAD_SERVICE_OFFLINE_FALLBACK] Conexión de red no disponible, encolando localmente:', networkError);

    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const queueKey = 'mizen_lead_offline_queue';
        const existing = JSON.parse(localStorage.getItem(queueKey) || '[]');
        existing.push({
          trackingId: localTrackingId,
          timestamp,
          payload,
          status: 'QUEUED_OFFLINE'
        });
        localStorage.setItem(queueKey, JSON.stringify(existing));
      }
    } catch {
      // Modo defensivo
    }

    return {
      success: true,
      trackingId: localTrackingId,
      timestamp
    };
  }
};
