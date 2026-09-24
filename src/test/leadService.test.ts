import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  generateSecureTrackingId,
  isValidCorporateEmail,
  submitDiagnosticRequest
} from '../services/leadService';

describe('leadService — Defensive Lead Capture Engine', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('generates a cryptographically valid tracking ID in format MZ-DIAG-XXXX', () => {
    const id = generateSecureTrackingId();
    expect(id).toMatch(/^MZ-DIAG-\d{4}$/);
  });

  describe('isValidCorporateEmail RFC 5321 verification', () => {
    it('accepts standard corporate and professional email formats', () => {
      expect(isValidCorporateEmail('contacto@mizenstudio.com')).toBe(true);
      expect(isValidCorporateEmail('direccion.operativa@grupo-restauracion.es')).toBe(true);
      expect(isValidCorporateEmail('user+tag@company.co')).toBe(true);
    });

    it('rejects invalid, truncated or excessively long emails', () => {
      expect(isValidCorporateEmail('')).toBe(false);
      expect(isValidCorporateEmail('invalid-string')).toBe(false);
      expect(isValidCorporateEmail('user@')).toBe(false);
      expect(isValidCorporateEmail('@domain.com')).toBe(false);
      expect(isValidCorporateEmail('a'.repeat(250) + '@domain.com')).toBe(false); // > 254 chars
    });
  });

  describe('submitDiagnosticRequest workflow', () => {
    it('silently absorbs automated bots if honeypot token is populated', async () => {
      const result = await submitDiagnosticRequest({
        selectedService: 'TPV Sala',
        email: 'bot@spam.com',
        acceptedPrivacy: false,
        honeypotToken: 'im-a-bot'
      });

      expect(result.success).toBe(true);
      expect(result.trackingId).toMatch(/^MZ-DIAG-\d{4}$/);
    });

    it('fails when email format is invalid', async () => {
      const result = await submitDiagnosticRequest({
        selectedService: 'KDS Cocina',
        email: 'bad-email',
        acceptedPrivacy: true
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain('dirección de correo profesional válida');
    });

    it('fails when privacy consent is not granted', async () => {
      const result = await submitDiagnosticRequest({
        selectedService: 'KDS Cocina',
        email: 'valido@restauracion.es',
        acceptedPrivacy: false
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain('política de confidencialidad');
    });

    it('processes server response successfully when backend returns 200', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          trackingId: 'MZ-DIAG-7788',
          timestamp: '2026-09-24T00:00:00.000Z'
        })
      } as Response);

      const result = await submitDiagnosticRequest({
        selectedService: 'Software a Medida',
        email: 'director@mizenstudio.com',
        acceptedPrivacy: true
      });

      expect(result.success).toBe(true);
      expect(result.trackingId).toBe('MZ-DIAG-7788');
      expect(result.timestamp).toBe('2026-09-24T00:00:00.000Z');
    });

    it('handles backend validation errors gracefully', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: false,
        json: async () => ({
          success: false,
          error: 'Demasiadas solicitudes desde su conexión.'
        })
      } as Response);

      const result = await submitDiagnosticRequest({
        selectedService: 'Software a Medida',
        email: 'director@mizenstudio.com',
        acceptedPrivacy: true
      });

      expect(result.success).toBe(false);
      expect(result.error).toBe('Demasiadas solicitudes desde su conexión.');
    });

    it('falls back resiliently to local storage queue when network is offline', async () => {
      vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new TypeError('Failed to fetch'));

      const result = await submitDiagnosticRequest({
        selectedService: 'Software a Medida',
        email: 'director@mizenstudio.com',
        acceptedPrivacy: true
      });

      expect(result.success).toBe(true);
      expect(result.trackingId).toMatch(/^MZ-DIAG-\d{4}$/);
    });
  });
});
