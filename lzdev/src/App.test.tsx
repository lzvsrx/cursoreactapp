import React from 'react';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import App from './App';
import { githubRepositories } from './repositories';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

test('renders portfolio owner and certificates section', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: /Luiz Otavio Valenzi Sousa/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Formacao, cursos e documentos/i })).toBeInTheDocument();
  expect(screen.getByText('Spring Boot')).toBeInTheDocument();
  expect(screen.getByText('Unity 3D')).toBeInTheDocument();
  expect(screen.getByText('Analise de Dados com Python')).toBeInTheDocument();
});

test('filters private repositories', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Privados' }));
  const privateCount = githubRepositories.filter((project) => project.private).length;
  expect(screen.getByText(`${privateCount} de ${githubRepositories.length}`)).toBeInTheDocument();
  expect(screen.queryByLabelText('Metadados do repositorio Angular')).not.toBeInTheDocument();
});

test('finds projects by release version and links to the published release', () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText(/Buscar projeto/i), {
    target: { value: 'v0.1.0-alpha.17' },
  });
  expect(screen.getByText(`1 de ${githubRepositories.length}`)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Ver release v0.1.0-alpha.17/i })).toHaveAttribute(
    'href', 'https://github.com/lzvsrx/LZ-AGENT/releases/tag/v0.1.0-alpha.17',
  );
  expect(screen.getByText('Pre-release:')).toBeInTheDocument();
});

test('sends service request to WhatsApp with customer details', () => {
  const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);

  render(<App />);

  fireEvent.change(screen.getByLabelText('Nome do cliente'), {
    target: { value: 'Cliente Teste' },
  });
  fireEvent.change(screen.getByLabelText('Contato para retorno'), {
    target: { value: '(35) 99999-0000' },
  });
  fireEvent.change(screen.getByLabelText('Servico desejado'), {
    target: { value: 'Criacao de Sites' },
  });
  fireEvent.change(screen.getByLabelText('Valor ou orcamento disponivel'), {
    target: { value: 'R$ 500,00' },
  });
  fireEvent.change(screen.getByLabelText('Descreva tudo que precisa que eu faca'), {
    target: { value: 'Preciso de um site institucional com contato.' },
  });

  fireEvent.click(screen.getByRole('button', { name: /Enviar pedido pelo WhatsApp/i }));

  expect(openSpy).toHaveBeenCalledTimes(1);
  const [whatsAppUrl] = openSpy.mock.calls[0];
  const decodedUrl = decodeURIComponent(String(whatsAppUrl));

  expect(decodedUrl).toContain('https://wa.me/5535999215995?text=');
  expect(decodedUrl).toContain('Protocolo do pedido: LZ-');
  expect(decodedUrl).toContain('Nome do cliente: Cliente Teste');
  expect(decodedUrl).toContain('Contato do cliente: (35) 99999-0000');
  expect(decodedUrl).toContain('Servico desejado: Criacao de Sites');
  expect(decodedUrl).toContain('Valor/orcamento informado: R$ 500,00');
  expect(decodedUrl).toContain('Preciso de um site institucional com contato.');
  expect(screen.getAllByText('Pedido recebido').length).toBeGreaterThan(0);
  expect(screen.getByText('A combinar pelo WhatsApp')).toBeInTheDocument();
}, 15000);

test('admin panel edits visible hero title', () => {
  const { container } = render(<App />);
  const admin = within(container.querySelector<HTMLElement>('#admin')!);
  const hero = within(container.querySelector<HTMLElement>('#inicio')!);

  fireEvent.change(admin.getByLabelText('Login administrativo'), {
    target: { value: 'admin' },
  });
  fireEvent.change(admin.getByLabelText('Senha administrativa'), {
    target: { value: 'lzadmin2026' },
  });
  fireEvent.click(admin.getByRole('button', { name: /Entrar no painel/i }));
  fireEvent.change(admin.getByLabelText('Nome/titulo da tela inicial'), {
    target: { value: 'Titulo administrado' },
  });

  expect(admin.getByRole('heading', { name: /Sincronizacao GitHub/i })).toBeInTheDocument();
  expect(admin.getByText('data/admin-content.json')).toBeInTheDocument();
  expect(hero.getByRole('heading', { level: 1, name: /Titulo administrado/i })).toBeInTheDocument();
}, 30000);

test('admin panel edits project progress shown on project cards', () => {
  const { container } = render(<App />);

  fireEvent.change(screen.getByLabelText('Login administrativo'), {
    target: { value: 'admin' },
  });
  fireEvent.change(screen.getByLabelText('Senha administrativa'), {
    target: { value: 'lzadmin2026' },
  });
  fireEvent.click(screen.getByRole('button', { name: /Entrar no painel/i }));

  const lzdevStatusInput = container.querySelector<HTMLInputElement>('[aria-label="Status do projeto lzdev"]');
  expect(lzdevStatusInput).not.toBeNull();
  fireEvent.change(lzdevStatusInput as HTMLInputElement, {
    target: { value: 'Em desenvolvimento ativo' },
  });
  const lzdevProgressInput = container.querySelector<HTMLInputElement>('[aria-label="Progresso do projeto lzdev"]');
  const lzdevDeliveryInput = container.querySelector<HTMLInputElement>('[aria-label="Previsao do projeto lzdev"]');
  const lzdevStepInput = container.querySelector<HTMLTextAreaElement>('[aria-label="Etapa atual do projeto lzdev"]');

  expect(lzdevProgressInput).not.toBeNull();
  expect(lzdevDeliveryInput).not.toBeNull();
  expect(lzdevStepInput).not.toBeNull();

  fireEvent.change(lzdevProgressInput as HTMLInputElement, {
    target: { value: '88' },
  });
  fireEvent.change(lzdevDeliveryInput as HTMLInputElement, {
    target: { value: '30/08/2026' },
  });
  fireEvent.change(lzdevStepInput as HTMLTextAreaElement, {
    target: { value: 'Finalizando painel administrativo.' },
  });

  expect(lzdevStatusInput).toHaveValue('Em desenvolvimento ativo');
  expect(lzdevProgressInput).toHaveValue(88);
  expect(lzdevDeliveryInput).toHaveValue('30/08/2026');
  expect(lzdevStepInput).toHaveValue('Finalizando painel administrativo.');
}, 90000);
