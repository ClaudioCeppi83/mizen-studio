import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../components/ErrorBoundary';

const FaultyComponent = () => {
  throw new Error('Simulation of catastrophic runtime failure');
};

describe('ErrorBoundary Component — Defensive Isolation', () => {
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div data-testid="safe-child">Operational UI Ready</div>
      </ErrorBoundary>
    );

    expect(screen.getByTestId('safe-child')).toHaveTextContent('Operational UI Ready');
  });

  it('catches runtime exceptions and displays Warm Industrial fallback card', () => {
    // Silencia console.error esperado en el test runner durante la captura
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <FaultyComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('SYS_FAULT // INTERVENCIÓN DEFENSIVA')).toBeInTheDocument();
    expect(screen.getByText('Interrupción Operativa Detectada')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reiniciar entorno operativo/i })).toBeInTheDocument();

    spy.mockRestore();
  });
});
