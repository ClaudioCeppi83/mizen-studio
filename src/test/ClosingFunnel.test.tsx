import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ClosingFunnel } from '../components/ClosingFunnel';

describe('ClosingFunnel Component — Lead Discovery & B2B Form', () => {
  it('renders with default selected need and all option buttons', () => {
    render(<ClosingFunnel />);

    expect(screen.getByText('¿Su software actual frena el ritmo de su equipo?')).toBeInTheDocument();
    expect(screen.getByText('Auditoría y optimización de mi TPV o software actual')).toBeInTheDocument();
    expect(screen.getByText('Rediseño de pantallas de comanderos / monitores de cocina (KDS)')).toBeInTheDocument();
    expect(screen.getByText('Desarrollo de software operativo a medida para mi negocio')).toBeInTheDocument();
  });

  it('respects preselectedService prop passed from Services section', () => {
    render(<ClosingFunnel preselectedService="Auditoría de Fricción & Reingeniería Operativa" />);
    // El input oculto contiene el servicio preseleccionado
    const hiddenInput = document.querySelector('input[name="selected_service"]') as HTMLInputElement;
    expect(hiddenInput.value).toBe('Auditoría de Fricción & Reingeniería Operativa');
  });

  it('displays validation error if email is invalid', async () => {
    render(<ClosingFunnel />);

    const emailInput = screen.getByLabelText(/correo electrónico de contacto/i);
    const submitBtn = screen.getByRole('button', { name: /solicitar diagnóstico/i });

    fireEvent.change(emailInput, { target: { value: 'not-an-email' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/dirección de correo profesional válida/i);
    });
  });

  it('displays validation error if privacy consent is not checked', async () => {
    render(<ClosingFunnel />);

    const emailInput = screen.getByLabelText(/correo electrónico de contacto/i);
    const submitBtn = screen.getByRole('button', { name: /solicitar diagnóstico/i });

    fireEvent.change(emailInput, { target: { value: 'gerente@restauracion.com' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/política de confidencialidad/i);
    });
  });

  it('opens PrivacyModal when clicking the link in the consent label', () => {
    render(<ClosingFunnel />);

    const viewPolicyBtn = screen.getByRole('button', { name: /ver política de confidencialidad/i });
    fireEvent.click(viewPolicyBtn);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/DOC_LEGAL \/\/ POLÍTICA DE CONFIDENCIALIDAD B2B/i)).toBeInTheDocument();
  });

  it('completes submission with valid data and renders confirmation card with tracking ID', async () => {
    render(<ClosingFunnel />);

    const emailInput = screen.getByLabelText(/correo electrónico de contacto/i);
    const consentCheckbox = screen.getByRole('checkbox');
    const submitBtn = screen.getByRole('button', { name: /solicitar diagnóstico/i });

    fireEvent.change(emailInput, { target: { value: 'director@mizenstudio.com' } });
    fireEvent.click(consentCheckbox);
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('Solicitud registrada con éxito')).toBeInTheDocument();
      expect(screen.getByText(/ID DE SEGUIMIENTO:/i)).toBeInTheDocument();
      expect(screen.getByText(/MZ-DIAG-/i)).toBeInTheDocument();
    });
  });
});
