import React from 'react';
import { Shield, Zap, Sparkles } from 'lucide-react';

export const Authority: React.FC = () => {
  return (
    <section id="direccion" style={{
      paddingTop: '80px',
      paddingBottom: '80px',
      borderBottom: '1px solid var(--border-industrial)',
      backgroundColor: 'var(--surface-card)',
      position: 'relative'
    }}>
      {/* Cartesian Markers */}
      <span className="cartesian-coord cartesian-tl">SYS_24:84 // AUTORIDAD</span>
      <span className="cartesian-coord cartesian-tr">FOUNDER // BIO</span>

      <div className="container-custom">
        
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <div className="badge-tag" style={{ marginBottom: '12px' }}>
            <span>// 04. DIRECCIÓN & AUTORIDAD</span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)'
          }}>
            Criterio de autor: Software creado por quien ha gestionado sala.
          </h2>
        </div>

        {/* Founder Split Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'center',
          marginBottom: '48px'
        }}>
          
          {/* Founder Portrait with Technical Frame (Strictly founder-claudio-ceppi.webp) */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'relative',
              borderRadius: 'var(--radius-panel)',
              overflow: 'hidden',
              border: '1px solid var(--border-industrial)',
              backgroundColor: 'var(--canvas-bg)',
              maxHeight: '440px'
            }}>
              <img
                src="/assets/brand/founder-claudio-ceppi.webp"
                alt="Claudio Ceppi — Founder & Head of Product Design en MIZEN Studio"
                loading="lazy"
                decoding="async"
                width={1254}
                height={1254}
                style={{
                  width: '100%',
                  height: '100%',
                  maxHeight: '440px',
                  objectFit: 'cover',
                  objectPosition: 'center 20%',
                  display: 'block',
                  filter: 'grayscale(15%) contrast(102%)'
                }}
              />
              
              {/* Corner Overlay Tag */}
              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                right: '12px',
                padding: '8px 12px',
                backgroundColor: 'rgba(17, 24, 39, 0.85)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-control)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}>
                <span>DIR // CLAUDIO CEPPI</span>
                <span style={{ color: 'var(--accent-amber)' }}>ID: MZ-FOUNDER-01</span>
              </div>
            </div>
          </div>

          {/* Founder Philosophy Bio */}
          <div>
            <blockquote style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '18px',
              lineHeight: 1.6,
              color: 'var(--text-primary)',
              marginBottom: '24px',
              fontWeight: 500,
              fontStyle: 'normal'
            }}>
              «No programamos software desde la abstracción de un despacho. Nuestro criterio técnico nace
              de años gestionando directamente salas, compras y turnos con el salón lleno. Conozco de primera mano
              la desesperación de un TPV bloqueado con cola para pagar o una comanda perdida en el pase de cocina.
              En MIZEN construimos las herramientas con la fiabilidad y la inmediatez que exige la realidad del servicio.»
            </blockquote>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              color: 'var(--text-secondary)',
              borderLeft: '2px solid var(--accent-amber)',
              paddingLeft: '12px'
            }}>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Claudio Ceppi</span>
              <span>Founder &amp; Head of Product Design — MIZEN Studio</span>
            </div>
          </div>

        </div>

        {/* 3 Immutable Guarantees Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px'
        }}>
          <div className="card-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Sparkles size={16} style={{ color: 'var(--accent-amber)' }} />
              <div className="font-mono" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>
                01 // ERGONOMÍA REAL EN SALA
              </div>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Interfaces diseñadas para dedos con prisa, visibilidad bajo cualquier iluminación y turnos intensivos de trabajo.
            </p>
          </div>

          <div className="card-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Shield size={16} style={{ color: 'var(--status-online)' }} />
              <div className="font-mono" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>
                02 // RESISTENCIA AL ERROR HUMANO
              </div>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Doble confirmación visual y salvaguardas que impiden errores involuntarios de caja, mesas o comandas.
            </p>
          </div>

          <div className="card-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Zap size={16} style={{ color: 'var(--accent-amber)' }} />
              <div className="font-mono" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>
                03 // VELOCIDAD INSTANTÁNEA (&lt;100MS)
              </div>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Cero esperas y cero bloqueos. Cada botón responde al instante para no frenar jamás el ritmo del equipo.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
