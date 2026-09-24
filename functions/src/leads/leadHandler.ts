/**
 * 🏛️ MIZEN Studio — Lead Handler & Validation Core
 * 
 * Controlador seguro para la recepción de solicitudes de diagnóstico operativo.
 * Implementa defensas en profundidad:
 * - Detección silenciosa de bots vía honeypot en servidor.
 * - Validación estricta Zod (RFC 5321, límites de longitud, sanitización).
 * - Rate limiting defensivo por IP.
 * - Hashing de IP (cumplimiento estricto RGPD).
 * - Persistencia segura en Cloud Firestore vía Firebase Admin SDK.
 */

import { z } from 'zod';
import * as crypto from 'crypto';
import * as admin from 'firebase-admin';
import { sendGoogleChatAlert } from '../notifications/googleNotificationService';

// Esquema de validación en frontera
export const LeadSchema = z.object({
  email: z
    .string()
    .trim()
    .min(5, 'Email requerido')
    .max(254, 'Longitud de email excede el estándar RFC 5321')
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Formato de email corporativo no válido'),
  selectedService: z
    .string()
    .trim()
    .min(2, 'Servicio no especificado')
    .max(120, 'Identificador de servicio demasiado largo'),
  acceptedPrivacy: z
    .boolean()
    .refine((val) => val === true, 'Debe aceptar la política de confidencialidad'),
  honeypotToken: z.string().optional().default(''),
});

export type ValidatedLeadPayload = z.infer<typeof LeadSchema>;

// Rate limiter en memoria por IP (Max 5 peticiones por ventana de 10 minutos)
interface RateLimitEntry {
  count: number;
  resetAt: number;
}
const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

export function checkRateLimit(clientIp: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(clientIp);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(clientIp, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  entry.count += 1;
  return true;
}

export function generateDiagnosticTrackingId(): string {
  const randomBuffer = crypto.randomBytes(2);
  const code = 1000 + (randomBuffer.readUInt16BE(0) % 9000);
  return `MZ-DIAG-${code}`;
}

export function hashIpForPrivacy(ip: string): string {
  return crypto.createHash('sha256').update(ip + (process.env.IP_SALT || 'mizen_salt_2026')).digest('hex').slice(0, 16);
}

export interface ProcessLeadOptions {
  db?: admin.firestore.Firestore;
  skipDb?: boolean;
}

export async function processLeadSubmission(
  rawBody: unknown,
  clientIp: string = '127.0.0.1',
  userAgent: string = 'unknown',
  options: ProcessLeadOptions = {}
): Promise<{ status: number; body: { success: boolean; trackingId?: string; timestamp?: string; error?: string } }> {
  // 1. Rate Limiting por IP
  if (!checkRateLimit(clientIp)) {
    return {
      status: 429,
      body: {
        success: false,
        error: 'Demasiadas solicitudes desde su conexión. Por favor espere unos minutos antes de reintentar.'
      }
    };
  }

  // 2. Validación Zod
  const parseResult = LeadSchema.safeParse(rawBody);
  if (!parseResult.success) {
    const errorMsg = parseResult.error.issues[0]?.message || 'Datos de formulario no válidos.';
    return {
      status: 400,
      body: {
        success: false,
        error: errorMsg
      }
    };
  }

  const payload = parseResult.data;
  const trackingId = generateDiagnosticTrackingId();
  const timestamp = new Date().toISOString();

  // 3. Detección silenciosa de bots vía honeypot
  if (payload.honeypotToken && payload.honeypotToken.trim().length > 0) {
    console.warn(`[BOT_HONEYPOT_TRIGGERED] IP: ${hashIpForPrivacy(clientIp)} - Lead silenciosamente descartado.`);
    return {
      status: 200,
      body: {
        success: true,
        trackingId,
        timestamp
      }
    };
  }

  // 4. Persistencia en Cloud Firestore (si la BD está disponible)
  if (!options.skipDb) {
    try {
      const db = options.db || admin.firestore();
      await db.collection('diagnostic_leads').doc(trackingId).set({
        trackingId,
        email: payload.email.toLowerCase(),
        service: payload.selectedService,
        status: 'RECEIVED',
        consentGiven: true,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        ipHash: hashIpForPrivacy(clientIp),
        userAgent: userAgent.slice(0, 200),
      });

      // 5. Despacho asíncrono de alerta
      sendGoogleChatAlert({
        trackingId,
        email: payload.email.toLowerCase(),
        service: payload.selectedService,
        timestamp,
      }).catch((err) => console.error('[NOTIFICATION_ASYNC_ERR]', err));

    } catch (dbError) {
      console.error('[FIRESTORE_WRITE_ERROR]', dbError);
      return {
        status: 500,
        body: {
          success: false,
          error: 'Error al registrar la solicitud en nuestros sistemas. Por favor, contacte directamente a contacto@mizen.studio.'
        }
      };
    }
  }

  return {
    status: 200,
    body: {
      success: true,
      trackingId,
      timestamp
    }
  };
}
