import { describe, it, expect } from 'vitest';
import {
  generateSecureTrackingId,
  isValidCorporateEmail,
  submitDiagnosticRequest
} from '../services/leadService';

describe('leadService — Defensive Lead Capture Engine', () => {
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

    it('succeeds with valid payload and provides secure tracking ID', async () => {
      const result = await submitDiagnosticRequest({
        selectedService: 'Software a Medida',
        email: 'director@mizenstudio.com',
        acceptedPrivacy: true
      });

      expect(result.success).toBe(true);
      expect(result.trackingId).toMatch(/^MZ-DIAG-\d{4}$/);
      expect(result.timestamp).toBeDefined();
    });
  });
});
