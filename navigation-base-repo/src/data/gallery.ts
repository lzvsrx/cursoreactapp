export const projects = [
  { id: 'stack', title: 'Navegação em pilha', category: 'STACK', symbol: '▱', color: '#b9a2ff', description: 'Cada nova tela entra na pilha. Ao voltar, a tela anterior é exibida novamente. Este detalhe é uma rota do Native Stack.' },
  { id: 'tabs', title: 'Um lugar para cada fluxo', category: 'TABS', symbol: '▦', color: '#8de5cb', description: 'As abas alternam entre áreas principais do aplicativo. Início e Galeria mantêm suas próprias posições de navegação.' },
  { id: 'params', title: 'Dados que viajam', category: 'PARÂMETROS', symbol: '↗', color: '#ffc98a', description: 'Esta tela recebe apenas o identificador do item pela rota. O conteúdo é encontrado localmente a partir desse identificador.' },
] as const;

export function getProject(id: string) {
  return projects.find(project => project.id === id);
}
