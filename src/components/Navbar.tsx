import React, { useEffect, useState } from 'react';
import { Sun, Moon, ArrowUpRight, Terminal } from 'lucide-react';

interface NavbarProps {
  onDiagnosticClick: () => void;
}

const THEME_STORAGE_KEY = 'mizen_theme';
type ThemeMode = 'light' | 'dark';

/**
 * Recupera el tema inicial de forma segura protegiendo contra excepciones
 * de acceso a almacenamiento (SecurityError en sandbox/modo incógnito restrictivo).
 */
const getInitialTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
  } catch {
    // Manejo defensivo: almacenamiento bloqueado o restringido
  }
  try {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch {
    // Fallback si matchMedia no está disponible
  }
  return 'light';
};

/**
 * Persiste la preferencia de tema de forma resiliente sin romper la ejecución.
 */
const persistTheme = (nextTheme: ThemeMode): void => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  } catch {
    // Fallback silencioso si el almacenamiento local está deshabilitado
  }
};

export const Navbar: React.FC<NavbarProps> = ({ onDiagnosticClick }) => {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    const metaTheme = document.getElementById('meta-theme-color');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'dark' ? '#0E1117' : '#F4F4F6');
    }
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    persistTheme(nextTheme);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      height: '56px',
      backgroundColor: 'var(--surface-card)',
      borderBottom: '1px solid var(--border-industrial)',
      display: 'flex',
      alignItems: 'center',
      transition: 'background-color var(--transition-fast), border-color var(--transition-fast)'
    }}>
      <div className="container-custom" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px'
      }}>
        {/* Brand & Status Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <img
              src={theme === 'dark' ? '/assets/brand/mizen-symbol-dark.svg' : '/assets/brand/mizen-symbol-light.svg'}
              alt="MIZEN Isotipo"
              width={16}
              height={16}
              style={{ display: 'block' }}
            />
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '18px',
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)'
            }}>
              MIZEN
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--accent-text)',
              fontWeight: 600,
              padding: '2px 4px',
              border: '1px solid var(--border-industrial)',
              borderRadius: 'var(--radius-badge)'
            }}>
              STUDIO
            </span>
          </a>

          <div className="badge-tag badge-live" style={{ display: 'none', minWidth: 'fit-content' }}>
            <span className="status-dot"></span>
            <span>SYS_STATUS: ONLINE // Q3 2026</span>
          </div>
        </div>

        {/* Studio Descriptor (Desktop) */}
        <div style={{
          display: 'none',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--text-secondary)',
          fontSize: '12px',
          fontFamily: 'var(--font-mono)'
        }} className="desktop-descriptor">
          <Terminal size={13} style={{ color: 'var(--accent-amber)' }} />
          <span>Software Operativo &amp; Sistemas a Medida</span>
        </div>

        {/* Navigation Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={toggleTheme}
            aria-label="Cambiar modo de iluminación"
            style={{
              background: 'transparent',
              border: '1px solid var(--border-industrial)',
              borderRadius: 'var(--radius-control)',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'background-color var(--transition-fast)'
            }}
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          <button
            onClick={onDiagnosticClick}
            className="btn-primary"
            style={{ fontSize: '13px' }}
          >
            <span>Solicitar Diagnóstico</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .badge-tag.badge-live { display: inline-flex !important; }
        }
        @media (min-width: 1024px) {
          .desktop-descriptor { display: flex !important; }
        }
      `}</style>
    </header>
  );
};
