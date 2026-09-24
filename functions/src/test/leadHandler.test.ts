import { describe, it, expect, beforeEach } from 'vitest';
import {
  processLeadSubmission,
  generateDiagnosticTrackingId,
  hashIpForPrivacy
} from '../leads/leadHandler';

describe('🏛️ MIZEN Studio — Lead Handler Unit Tests', () => {
  beforeEach(() => {
    // Reset test state if needed
  });

  it('debe generar un Tracking ID con el prefijo canónico MZ-DIAG-', () => {
    const id = generateDiagnosticTrackingId();
    expect(id).toMatch(/^MZ-DIAG-\d{4}$/);
  });

  it('debe hashear la IP para cumplimiento estricto RGPD', () => {
    const hash1 = hashIpForPrivacy('192.168.1.1');
    const hash2 = hashIpForPrivacy('192.168.1.1');
    const hash3 = hashIpForPrivacy('10.0.0.1');

    expect(hash1).toBe(hash2);
    expect(hash1).not.toBe(hash3);
    expect(hash1.length).toBe(16);
  });

  it('debe procesar exitosamente un lead con datos corporativos válidos', async () => {
    const payload = {
      email: 'director.operaciones@grupostudio.es',
      selectedService: 'Software o Web a medida',
      acceptedPrivacy: true,
      honeypotToken: '',
    };

    const res = await processLeadSubmission(payload, '185.20.10.1', 'Mozilla/5.0', { skipDb: true });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.trackingId).toMatch(/^MZ-DIAG-\d{4}$/);
    expect(res.body.timestamp).toBeDefined();
  });

  it('debe rechazar un email inválido con código 400', async () => {
    const payload = {
      email: 'correo_invalido_sin_dominio',
      selectedService: 'Software o Web a medida',
      acceptedPrivacy: true,
    };

    const res = await processLeadSubmission(payload, '185.20.10.2', 'Mozilla/5.0', { skipDb: true });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('Formato de email corporativo no válido');
  });

  it('debe rechazar si no se acepta la política de privacidad con código 400', async () => {
    const payload = {
      email: 'gerencia@asador.com',
      selectedService: 'Arquitectura TPV y Sala',
      acceptedPrivacy: false,
    };

    const res = await processLeadSubmission(payload, '185.20.10.3', 'Mozilla/5.0', { skipDb: true });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('política de confidencialidad');
  });

  it('debe descartar silenciosamente a un bot con honeypot devolviendo 200 fingido', async () => {
    const payload = {
      email: 'spambot@marketing-crawler.com',
      selectedService: 'Software o Web a medida',
      acceptedPrivacy: true,
      honeypotToken: 'i_am_a_malicious_bot',
    };

    const res = await processLeadSubmission(payload, '185.20.10.4', 'BotAgent/1.0', { skipDb: true });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.trackingId).toBeDefined();
  });

  it('debe bloquear con 429 tras superar el límite de peticiones por IP', async () => {
    const testIp = '203.0.113.99';
    const payload = {
      email: 'rapid.tester@mizen.studio',
      selectedService: 'Auditoría',
      acceptedPrivacy: true,
    };

    // Consumir cupo (5 peticiones)
    for (let i = 0; i < 5; i++) {
      const res = await processLeadSubmission(payload, testIp, 'StressTest', { skipDb: true });
      expect(res.status).toBe(200);
    }

    // Sexta petición debe dar 429 Too Many Requests
    const blockedRes = await processLeadSubmission(payload, testIp, 'StressTest', { skipDb: true });
    expect(blockedRes.status).toBe(429);
    expect(blockedRes.body.success).toBe(false);
    expect(blockedRes.body.error).toContain('Demasiadas solicitudes');
  });
});
