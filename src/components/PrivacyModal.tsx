import React, { useEffect, useRef } from 'react';
import { X, Shield, Lock, FileText, CheckCircle2 } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    closeBtnRef.current?.focus();

    // Bloqueo de scroll del body mientras el modal está activo
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(14, 17, 23, 0.75)',
        backdropFilter: 'blur(3px)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="card-panel"
        style={{
          width: '100%',
          maxWidth: '560px',
          maxHeight: '90vh',
          backgroundColor: 'var(--surface-card)',
          border: '1px solid var(--border-industrial)',
          borderRadius: 'var(--radius-panel)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-industrial)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--canvas-bg)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={16} style={{ color: 'var(--accent-amber)' }} />
            <span id="privacy-modal-title" className="font-mono" style={{
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              letterSpacing: '0.04em'
            }}>
              DOC_LEGAL // POLÍTICA DE CONFIDENCIALIDAD B2B
            </span>
          </div>

          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Cerrar modal de confidencialidad"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 'var(--radius-control)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div style={{
          padding: '24px 20px',
          overflowY: 'auto',
          fontSize: '13px',
          lineHeight: 1.6,
          color: 'var(--text-secondary)'
        }}>
          <div className="badge-tag" style={{ marginBottom: '14px', fontSize: '10px' }}>
            <span>NORMATIVA RGPD (UE) 2016/679 &amp; LOPDGDD 3/2018</span>
          </div>

          <h3 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '10px'
          }}>
            Compromiso de Confidencialidad y Tratamiento Operativo
          </h3>

          <p style={{ marginBottom: '14px' }}>
            En <strong>MIZEN Studio &amp; Systems</strong> aplicamos la misma disciplina de diseño defensivo al tratamiento
            de la información corporativa de nuestros clientes. Sus datos nunca serán comercializados, cedidos ni empleados para prospección indiscriminada.
          </p>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginBottom: '20px',
            padding: '14px',
            backgroundColor: 'var(--canvas-bg)',
            borderRadius: 'var(--radius-control)',
            border: '1px solid var(--border-industrial)'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <Lock size={15} style={{ color: 'var(--status-online)', flexShrink: 0, marginTop: '3px' }} />
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Responsable del Tratamiento:</strong>
                <div>MIZEN Studio &amp; Systems — Sede Barcelona (España).</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <FileText size={15} style={{ color: 'var(--accent-amber)', flexShrink: 0, marginTop: '3px' }} />
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Finalidad Exclusiva:</strong>
                <div>Coordinación técnica y valoración operativa previa de la sesión de diagnóstico de 30 minutos solicitada.</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <CheckCircle2 size={15} style={{ color: 'var(--status-online)', flexShrink: 0, marginTop: '3px' }} />
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Retención de Datos &amp; Soberanía:</strong>
                <div>Los datos proporcionados se custodian con cifrado en reposo y se destruyen a los 90 días si no se formaliza una relación contractual.</div>
              </div>
            </div>
          </div>

          <h4 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '6px'
          }}>
            Ejercicio de Derechos ARCO
          </h4>
          <p style={{ marginBottom: '12px' }}>
            Puede ejercer sus derechos de acceso, rectificación, limitación y supresión de datos en cualquier momento enviando una comunicación formal a{' '}
            <a href="mailto:contacto@mizenstudio.com" style={{ color: 'var(--accent-text)', fontWeight: 600, textDecoration: 'none' }}>
              contacto@mizenstudio.com
            </a>.
          </p>
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 20px',
          borderTop: '1px solid var(--border-industrial)',
          backgroundColor: 'var(--canvas-bg)',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={onClose}
            className="btn-primary"
            style={{ fontSize: '12px', padding: '6px 16px' }}
          >
            Entendido y Conforme
          </button>
        </div>
      </div>
    </div>
  );
};
