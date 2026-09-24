/**
 * 🏛️ MIZEN Studio — Google-Native Notification Service
 * 
 * Orquesta notificaciones asíncronas dentro del ecosistema Google Cloud:
 * 1. Google Chat Incoming Webhook (Alertas internas para el equipo de MIZEN).
 * 2. Formato canónico de confirmación B2B para el cliente.
 */

export interface LeadNotificationPayload {
  trackingId: string;
  email: string;
  service: string;
  timestamp: string;
}

/**
 * Despacha una tarjeta interactiva (Google Chat Card v2) al espacio de operaciones de MIZEN.
 */
export async function sendGoogleChatAlert(
  payload: LeadNotificationPayload,
  webhookUrl?: string
): Promise<{ success: boolean; delivered: boolean; info?: string }> {
  const targetUrl = webhookUrl || process.env.GOOGLE_CHAT_WEBHOOK_URL;

  if (!targetUrl) {
    // Modo defensivo: En desarrollo o staging sin webhook configurado, se registra structured log
    console.info('[GOOGLE_CHAT_DISPATCH_MOCK] Sin GOOGLE_CHAT_WEBHOOK_URL configurada. Lead procesado:', {
      trackingId: payload.trackingId,
      email: payload.email,
      service: payload.service,
    });
    return { success: true, delivered: false, info: 'Webhook URL not configured, logged to console' };
  }

  const cardMessage = {
    cardsV2: [
      {
        cardId: `lead-${payload.trackingId}`,
        card: {
          header: {
            title: '🏛️ MIZEN Studio // Solicitud de Diagnóstico',
            subtitle: `Ref: ${payload.trackingId}`,
            imageUrl: 'https://fonts.gstatic.com/s/i/short-term/release/googlesymbols/terminal/default/24px.svg',
            imageType: 'CIRCLE'
          },
          sections: [
            {
              header: 'Datos de la Operación',
              widgets: [
                {
                  decoratedText: {
                    topLabel: 'Email Corporativo',
                    text: `<b>${payload.email}</b>`,
                    wrapText: true
                  }
                },
                {
                  decoratedText: {
                    topLabel: 'Área Requerida',
                    text: payload.service,
                    wrapText: true
                  }
                },
                {
                  decoratedText: {
                    topLabel: 'Marca Temporal (UTC)',
                    text: payload.timestamp,
                    wrapText: true
                  }
                }
              ]
            }
          ]
        }
      }
    ]
  };

  try {
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(cardMessage),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`[GOOGLE_CHAT_ERROR] HTTP ${response.status}: ${errText}`);
      return { success: false, delivered: false, info: errText };
    }

    return { success: true, delivered: true };
  } catch (error) {
    console.error('[GOOGLE_CHAT_EXCEPTION]', error);
    return { success: false, delivered: false, info: (error as Error).message };
  }
}
