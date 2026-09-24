import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Terminal } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Registro defensivo en telemetría o consola local
    console.error('Unhandled runtime exception caught by MIZEN ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: 'var(--canvas-bg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: 'var(--font-sans)',
          color: 'var(--text-primary)'
        }}>
          <div className="card-panel" style={{
            maxWidth: '520px',
            width: '100%',
            padding: '32px',
            textAlign: 'center',
            backgroundColor: 'var(--surface-card)',
            border: '1px solid var(--border-industrial)',
            borderRadius: 'var(--radius-panel)'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-control)',
              backgroundColor: 'var(--status-warning-bg)',
              color: 'var(--status-warning)',
              marginBottom: '16px'
            }}>
              <AlertTriangle size={24} />
            </div>

            <div className="badge-tag" style={{
              marginBottom: '14px',
              fontSize: '10px',
              borderColor: 'var(--border-industrial)'
            }}>
              <Terminal size={12} style={{ color: 'var(--accent-amber)' }} />
              <span>SYS_FAULT // INTERVENCIÓN DEFENSIVA</span>
            </div>

            <h2 style={{
              fontSize: '20px',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              marginBottom: '10px',
              color: 'var(--text-primary)'
            }}>
              Interrupción Operativa Detectada
            </h2>

            <p style={{
              fontSize: '13px',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              marginBottom: '24px'
            }}>
              El sistema ha contenido un error no previsto para proteger la integridad de los datos de sesión.
              La arquitectura de aislamiento ha evitado un fallo generalizado.
            </p>

            <button
              onClick={this.handleReset}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '12px 20px',
                fontSize: '13px',
                fontWeight: 600
              }}
            >
              <RefreshCw size={14} />
              <span>Reiniciar Entorno Operativo</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
