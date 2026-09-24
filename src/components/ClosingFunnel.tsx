import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Mail, Sparkles } from 'lucide-react';
import { submitDiagnosticRequest } from '../services/leadService';
import { PrivacyModal } from './PrivacyModal';

interface ClosingFunnelProps {
  preselectedService?: string | null;
}

export const ClosingFunnel: React.FC<ClosingFunnelProps> = ({ preselectedService }) => {
  const [selectedNeed, setSelectedNeed] = useState<string>(preselectedService || 'Auditoría y optimización de mi TPV o software actual');
  const [email, setEmail] = useState<string>('');
  const [acceptedPrivacy, setAcceptedPrivacy] = useState<boolean>(false);
  const [honeypot, setHoneypot] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [trackingId, setTrackingId] = useState<string>('');
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const result = await submitDiagnosticRequest({
      selectedService: selectedNeed,
      email,
      acceptedPrivacy,
      honeypotToken: honeypot
    });

    if (!result.success) {
      setErrorMessage(result.error || 'Ocurrió un error al procesar su solicitud.');
      return;
    }

    setTrackingId(result.trackingId);
    setSubmitted(true);
  };

  return (
    <section id="diagnostico" style={{
      paddingTop: '90px',
      paddingBottom: '90px',
      borderBottom: '1px solid var(--border-industrial)',
      backgroundColor: 'var(--canvas-bg)',
      position: 'relative'
    }} className="grid-bg-overlay">
      
      {/* Cartesian Markers */}
      <span className="cartesian-coord cartesian-tl">SYS_24:84 // CONTACTO</span>
      <span className="cartesian-coord cartesian-tr">DISCOVERY // 30MIN</span>

      <div className="container-custom" style={{ maxWidth: '800px' }}>
        
        <div className="card-panel" style={{
          padding: 'clamp(28px, 5vw, 48px)',
          textAlign: 'center',
          backgroundColor: 'var(--surface-card)',
          position: 'relative'
        }}>
          
          {/* Badge */}
          <div style={{ display: 'inline-block', marginBottom: '16px' }}>
            <span className="badge-tag">
              <Sparkles size={12} style={{ color: 'var(--accent-amber)' }} />
              <span>SESIÓN TÉCNICA // 30 MINUTOS SIN COMPROMISO</span>
            </span>
          </div>

          {/* Punchy Empathetic Headline (Norma DOC 4 y MIZE-ideaLanding) */}
          <h2 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(1.85rem, 3.5vw, 2.5rem)',
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: '16px',
            color: 'var(--text-primary)'
          }}>
            ¿Su software actual frena el ritmo de su equipo?
          </h2>

          {/* Empathetic & Explanatory Subtitle */}
          <p style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            maxWidth: '660px',
            margin: '0 auto 32px auto'
          }}>
            Analicemos su operativa de sala o cocina en una sesión de 30 minutos sin coste ni compromiso.
            Identificamos dónde se pierde tiempo o dinero y le mostramos cómo resolverlo con herramientas a medida.
          </p>

          {!submitted ? (
            <form id="diagnostic-form" onSubmit={handleSubmit} noValidate style={{ textAlign: 'left' }}>
              <input type="hidden" name="selected_service" value={selectedNeed} />
              
              {/* Need Selector */}
              <div style={{ marginBottom: '24px' }}>
                <div id="need-selector-label" style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                  letterSpacing: '0.04em'
                }}>
                  Seleccione el área de intervención principal:
                </div>
                
                <div
                  role="group"
                  aria-labelledby="need-selector-label"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '10px'
                  }}>
                  {[
                    'Auditoría y optimización de mi TPV o software actual',
                    'Rediseño de pantallas de comanderos / monitores de cocina (KDS)',
                    'Desarrollo de software operativo a medida para mi negocio'
                  ].map((option) => (
                    <button
                      type="button"
                      key={option}
                      data-agent-action="select-service"
                      data-service-name={option}
                      onClick={() => setSelectedNeed(option)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-control)',
                        border: selectedNeed === option
                          ? '1px solid var(--accent-amber)'
                          : '1px solid var(--border-industrial)',
                        backgroundColor: selectedNeed === option
                          ? 'var(--canvas-bg)'
                          : 'var(--surface-card)',
                        color: selectedNeed === option
                          ? 'var(--accent-text)'
                          : 'var(--text-secondary)',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '13px',
                        fontWeight: selectedNeed === option ? 600 : 500,
                        cursor: 'pointer',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      <span>{option}</span>
                      {selectedNeed === option && (
                        <CheckCircle2 size={15} style={{ color: 'var(--accent-amber)' }} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Honeypot Anti-Bot Field (Off-screen) */}
              <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
                <input
                  type="text"
                  name="company_security_token_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {/* Email Input Field */}
              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="client-email" style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                  letterSpacing: '0.04em'
                }}>
                  Correo electrónico de contacto:
                </label>
                
                <div style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-secondary)'
                  }}>
                    <Mail size={16} />
                  </div>
                  
                  <input
                    id="client-email"
                    name="email"
                    type="email"
                    required
                    aria-required="true"
                    aria-label="Correo electrónico de contacto"
                    autoComplete="email"
                    maxLength={254}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder="ejemplo@su-restaurante.com o nombre@gmail.com"
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 40px',
                      backgroundColor: 'var(--canvas-bg)',
                      border: errorMessage ? '1px solid var(--status-danger)' : '1px solid var(--border-industrial)',
                      borderRadius: 'var(--radius-control)',
                      fontSize: '14px',
                      fontFamily: 'var(--font-sans)',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      transition: 'border-color var(--transition-fast)'
                    }}
                  />
                </div>
              </div>

              {/* RGPD / Privacidad Consent Checkbox */}
              <div style={{
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px'
              }}>
                <input
                  id="privacy-consent"
                  type="checkbox"
                  required
                  aria-required="true"
                  checked={acceptedPrivacy}
                  onChange={(e) => {
                    setAcceptedPrivacy(e.target.checked);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  style={{
                    marginTop: '3px',
                    accentColor: 'var(--accent-amber)',
                    cursor: 'pointer'
                  }}
                />
                <label htmlFor="privacy-consent" style={{
                  fontSize: '12px',
                  lineHeight: 1.5,
                  color: 'var(--text-secondary)',
                  cursor: 'pointer'
                }}>
                  Confirmo que he leído y acepto el tratamiento confidencial de mis datos exclusivamente para coordinar la sesión técnica de diagnóstico según la normativa de privacidad y RGPD (
                  <button
                    type="button"
                    onClick={() => setIsPrivacyModalOpen(true)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--accent-text)',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      padding: 0,
                      font: 'inherit',
                      fontWeight: 600
                    }}
                  >
                    ver política de confidencialidad
                  </button>
                  ).
                </label>
              </div>

              {/* Mensaje de Error de Validación */}
              {errorMessage && (
                <div role="alert" style={{
                  marginBottom: '16px',
                  padding: '10px 14px',
                  backgroundColor: 'var(--status-danger-bg)',
                  border: '1px solid var(--status-danger)',
                  borderRadius: 'var(--radius-control)',
                  color: 'var(--status-danger)',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)'
                }}>
                  {errorMessage}
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  fontSize: '14px',
                  fontWeight: 600
                }}
              >
                <span>Solicitar Diagnóstico de 30 Minutos</span>
                <ArrowRight size={16} />
              </button>

              <div style={{
                marginTop: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                color: 'var(--text-secondary)',
                fontSize: '12px',
                fontFamily: 'var(--font-mono)'
              }}>
                <ShieldCheck size={14} style={{ color: 'var(--status-online)' }} />
                <span>Trato confidencial y directo con Claudio Ceppi (Fundador)</span>
              </div>

              {/* Direct Channels (Norma DOC 4 y DOC 2) — PII Sanitized */}
              <div style={{
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid var(--border-industrial)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
                flexWrap: 'wrap',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-secondary)'
              }}>
                <span>CANAL DIRECTO: <a href="mailto:contacto@mizenstudio.com" style={{ color: 'var(--accent-text)', textDecoration: 'none', fontWeight: 600 }}>contacto@mizenstudio.com</a></span>
                <span>•</span>
                <span>LINKEDIN: <a href="https://linkedin.com/in/claudioceppi" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-text)', textDecoration: 'none', fontWeight: 600 }}>claudioceppi</a></span>
                <span>•</span>
                <span>SEDE: BARCELONA (GLOBAL REMOTO)</span>
              </div>

            </form>
          ) : (
            /* Confirmation State */
            <div style={{
              padding: '24px',
              backgroundColor: 'var(--canvas-bg)',
              border: '1px solid var(--status-online)',
              borderRadius: 'var(--radius-panel)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'var(--status-online-bg)',
                color: 'var(--status-online)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}>
                <CheckCircle2 size={24} />
              </div>

              <h3 style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '18px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}>
                Solicitud registrada con éxito
              </h3>

              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                Hemos reservado su turno de diagnóstico. Nos pondremos en contacto con usted en menos de 24 horas hábiles.
              </p>

              <div className="font-mono" style={{
                fontSize: '11px',
                color: 'var(--text-secondary)',
                padding: '6px 12px',
                backgroundColor: 'var(--surface-card)',
                borderRadius: 'var(--radius-badge)',
                border: '1px solid var(--border-industrial)',
                display: 'inline-block'
              }}>
                ID DE SEGUIMIENTO: <span style={{ color: 'var(--accent-text)', fontWeight: 600 }}>{trackingId}</span>
              </div>
            </div>
          )}

        </div>

      </div>

      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </section>
  );
};
