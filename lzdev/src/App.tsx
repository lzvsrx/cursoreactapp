import React, { useEffect, useMemo, useState } from 'react';
import {
  Award,
  BadgeCheck,
  BarChart3,
  BookOpen,
  Boxes,
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
  Camera,
  Code2,
  Cpu,
  Database,
  DollarSign,
  ExternalLink,
  FileText,
  FolderGit2,
  Gamepad2,
  GitFork,
  Globe,
  HardDrive,
  Layers3,
  Lock,
  LockKeyhole,
  MessageCircle,
  MonitorCog,
  Package,
  Phone,
  Plus,
  RotateCcw,
  Save,
  Search,
  Send,
  Server,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Star,
  Target,
  Trophy,
  TrendingUp,
  Upload,
  Users,
  Wrench,
  Trash2,
  type LucideIcon,
} from 'lucide-react';
import './App.css';
import { certificates } from './certificates';
import { githubRepositories, repositoriesSyncedAt } from './repositories';
import { readCachedRecord, readDatabaseRecord, writeDatabaseRecord } from './siteDatabase';

type IconComponent = LucideIcon;

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/luiz-otavio-valenzi-sousa-1180bb360/', Icon: BriefcaseBusiness },
  { label: 'Instagram', href: 'https://www.instagram.com/luizotaviovs/', Icon: Camera },
  { label: 'Instagram LZ World Games', href: 'https://www.instagram.com/lzworldgames/', Icon: Gamepad2 },
  { label: 'WhatsApp', href: 'https://wa.me/5535999215995', Icon: MessageCircle },
  { label: 'Telefone', href: 'tel:+5535999215995', Icon: Phone },
  { label: 'GitHub', href: 'https://github.com/lzvsrx', Icon: FolderGit2 },
  { label: 'Repositorio', href: 'https://github.com/lzvsrx/lzworldstech-dev', Icon: FolderGit2 },
];

const skills = [
  { name: 'HTML', percentage: 95, Icon: Globe },
  { name: 'CSS', percentage: 90, Icon: Layers3 },
  { name: 'JavaScript', percentage: 85, Icon: Code2 },
  { name: 'PHP', percentage: 80, Icon: Server },
  { name: 'Python', percentage: 75, Icon: Cpu },
  { name: 'Analise de Dados com Python', percentage: 78, Icon: BarChart3 },
  { name: 'Django', percentage: 74, Icon: Server },
  { name: 'Java', percentage: 88, Icon: Code2 },
  { name: 'Orientacao a Objetos', percentage: 86, Icon: Boxes },
  { name: 'Estruturas de Dados', percentage: 82, Icon: Layers3 },
  { name: 'Spring Boot', percentage: 76, Icon: Server },
  { name: 'Spring Data JPA', percentage: 72, Icon: Database },
  { name: 'Spring Security', percentage: 70, Icon: ShieldCheck },
  { name: 'APIs REST e Swagger', percentage: 76, Icon: Globe },
  { name: 'Maven e Gradle', percentage: 74, Icon: Package },
  { name: 'JUnit e Mockito', percentage: 72, Icon: CheckCircle2 },
  { name: 'SOLID e Design Patterns', percentage: 78, Icon: Sparkles },
  { name: 'UML', percentage: 72, Icon: FileText },
  { name: 'Unity 3D', percentage: 86, Icon: Gamepad2 },
  { name: 'C# para Jogos', percentage: 78, Icon: Gamepad2 },
  { name: 'Game Design', percentage: 82, Icon: Trophy },
  { name: 'Fisica e IA em Jogos', percentage: 76, Icon: Cpu },
  { name: 'IoT e Sensores', percentage: 74, Icon: MonitorCog },
  { name: 'Redes de Computadores', percentage: 72, Icon: Globe },
  { name: 'Direito Digital', percentage: 70, Icon: ShieldCheck },
  { name: 'Empreendedorismo e Inovacao', percentage: 74, Icon: TrendingUp },
  { name: 'Tecnico de Informatica', percentage: 88, Icon: Wrench },
  { name: 'React.js', percentage: 85, Icon: Code2 },
  { name: 'Node.js', percentage: 80, Icon: Server },
  { name: 'TypeScript', percentage: 70, Icon: Code2 },
  { name: 'React Native', percentage: 80, Icon: Smartphone },
  { name: 'Flutter', percentage: 75, Icon: Smartphone },
  { name: 'Swift', percentage: 65, Icon: Smartphone },
  { name: 'Kotlin', percentage: 70, Icon: Smartphone },
];

const databases = ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'Firebase', 'MariaDB'];

const services = [
  {
    Icon: MonitorCog,
    title: 'Formatacao',
    text: 'Formatacao completa de computadores com reinstalacao do sistema operacional e configuracao.',
  },
  {
    Icon: HardDrive,
    title: 'Instalacao de Pecas',
    text: 'Instalacao e upgrade de memoria RAM, HD, SSD, placas de video e outros componentes.',
  },
  {
    Icon: Wrench,
    title: 'Manutencao',
    text: 'Manutencao preventiva e corretiva, limpeza, otimizacao, configuracao e reparos.',
  },
  {
    Icon: Code2,
    title: 'Programacao',
    text: 'Desenvolvimento de software personalizado, automacao de processos e solucoes sob medida.',
  },
  {
    Icon: Globe,
    title: 'Criacao de Sites',
    text: 'Sites profissionais, responsivos e otimizados para apresentar marcas, servicos e projetos.',
  },
  {
    Icon: Smartphone,
    title: 'Criacao de Apps',
    text: 'Aplicativos mobile e web apps com tecnologias modernas e experiencia objetiva para o usuario.',
  },
];

const showcaseFeatures = [
  { label: 'PHP', Icon: Server },
  { label: 'MySQL', Icon: Database },
  { label: 'JavaScript', Icon: Code2 },
  { label: 'Bootstrap', Icon: Layers3 },
  { label: 'Dashboard', Icon: BarChart3 },
  { label: 'Relatorios', Icon: FileText },
];

const showcaseGallery = [
  {
    image: '/cores-dashboard.png',
    title: 'Dashboard Interativo',
    text: 'Visualizacao de metricas de vendas e estoque com graficos comparativos.',
    Icon: BarChart3,
  },
  {
    image: '/cores-products.png',
    title: 'Gerenciamento de Produtos',
    text: 'Cadastro completo com imagem, marca, tipo, preco e data de vencimento.',
    Icon: Package,
  },
  {
    image: '/cores-users.png',
    title: 'Gerenciamento de Usuarios',
    text: 'Sistema de permissoes com diferentes niveis de acesso: Admin, Funcionario e Cliente.',
    Icon: Users,
  },
];

const showcaseDetails = [
  {
    Icon: Boxes,
    title: 'Controle de Estoque',
    text: 'Acompanhamento em tempo real das quantidades disponiveis e alertas de estoque baixo.',
  },
  {
    Icon: DollarSign,
    title: 'Gestao de Vendas',
    text: 'Registro completo de vendas com calculo automatico de totais e historico de transacoes.',
  },
  {
    Icon: BarChart3,
    title: 'Relatorios Financeiros',
    text: 'Relatorios detalhados de produtos mais vendidos, faturamento total e analise de desempenho.',
  },
  {
    Icon: Users,
    title: 'Multi-Usuario',
    text: 'Sistema com diferentes perfis de acesso e preferencias personalizadas por cliente.',
  },
  {
    Icon: Upload,
    title: 'Importacao/Exportacao',
    text: 'Funcionalidade de importar e exportar dados via CSV e gerar relatorios em PDF.',
  },
  {
    Icon: ShieldCheck,
    title: 'Seguranca',
    text: 'Sistema de autenticacao seguro com senhas criptografadas e controle de sessao.',
  },
];

const featuredProjectNames = [
  'LZ-AGENT',
  'aesdivinuscomplete',
  'aesdivinus-multiplataforma',
  'Angular',
  'lzdev',
  'lojacoresefragranciasbyberenice',
];

const projectCaseStudies = [
  {
    Icon: Cpu,
    title: 'LZ Agent: assistente pessoal em alfa',
    repoName: 'LZ-AGENT',
    problem: 'Organizar tarefas, documentos e memoria de projetos em um assistente pessoal com controle do usuario.',
    solution: 'Nucleo Python/FastAPI, SQLite, registro de acoes e interface web, com clientes de plataforma em desenvolvimento.',
    impact: 'Reune memoria local e ferramentas em uma base extensivel. Recursos avancados e suporte de producao ainda estao em desenvolvimento.',
  },
  {
    Icon: Gamepad2,
    title: 'Aes Divinus: prototipo tatico em Godot',
    repoName: 'aesdivinuscomplete',
    problem: 'Levar os sistemas de um RPG tatico web para uma experiencia de jogo em Godot.',
    solution: 'Migracao em andamento com missoes, arena de combate, inventario, saves locais e nucleo de regras em C++.',
    impact: 'Disponibiliza um prototipo versionado para experimentar a campanha e acompanhar a evolucao da migracao.',
  },
  {
    Icon: Trophy,
    title: 'Portfolio Luiz Otavio Valenzi Sousa',
    repoName: 'lzdev',
    problem: 'Reunir certificados, contatos e repositorios em uma experiencia unica e facil de avaliar.',
    solution: 'Interface em React com busca de certificados, lista completa do GitHub e links de contato diretos.',
    impact: 'Mostra presenca profissional, organizacao tecnica e velocidade para publicar melhorias.',
  },
  {
    Icon: BarChart3,
    title: 'Cores & Fragrancias by Berenice',
    repoName: 'lojacoresefragranciasbyberenice',
    problem: 'Controlar produtos, vendas, usuarios, estoque e relatorios sem depender de planilhas soltas.',
    solution: 'Sistema com dashboard, cadastros, perfis de acesso, exportacao e relatorios financeiros.',
    impact: 'Transforma uma rotina operacional em um fluxo rastreavel e mais profissional.',
  },
  {
    Icon: Gamepad2,
    title: 'Projetos de jogos e Unity',
    repoName: 'jogosunity',
    problem: 'Demonstrar logica, interatividade, fisica, cenas e experiencia em desenvolvimento de jogos.',
    solution: 'Projetos com Unity, C#, mecanicas, audio, cena 3D e polimento visual.',
    impact: 'Complementa o perfil full stack com raciocinio de produto, gameplay e sistemas interativos.',
  },
];

const workflowSteps = [
  {
    Icon: Search,
    title: 'Diagnostico',
    text: 'Entendo o objetivo, publico, conteudo e restricoes antes de escrever codigo.',
  },
  {
    Icon: Target,
    title: 'Planejamento',
    text: 'Transformo a necessidade em telas, dados, prioridades e um caminho de entrega claro.',
  },
  {
    Icon: Code2,
    title: 'Desenvolvimento',
    text: 'Construo com componentes, responsividade, acessibilidade, versionamento e boas praticas.',
  },
  {
    Icon: CheckCircle2,
    title: 'Validacao',
    text: 'Testo build, navegacao, seguranca, links e comportamento antes de publicar.',
  },
];

const visibilityOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'public', label: 'Publicos' },
  { value: 'private', label: 'Privados' },
] as const;

type VisibilityFilter = (typeof visibilityOptions)[number]['value'];

type ServiceRequest = {
  clientName: string;
  clientContact: string;
  serviceType: string;
  budget: string;
  details: string;
};

type EditableLink = {
  label: string;
  href: string;
};

type EditableSkill = {
  name: string;
  percentage: number;
};

type EditableService = {
  title: string;
  text: string;
};

type ProjectProgress = {
  projectName: string;
  status: string;
  progress: number;
  estimatedDelivery: string;
  currentStep: string;
};

type AdminContent = {
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutText: string;
  links: EditableLink[];
  skills: EditableSkill[];
  databases: string[];
  services: EditableService[];
  projectProgresses: ProjectProgress[];
};

type GitHubSyncSettings = {
  owner: string;
  repo: string;
  branch: string;
  syncSecret: string;
  autoSync: boolean;
};

type GitHubSyncFile = {
  label: string;
  path: string;
  content: unknown;
};

type OrderStatus = 'Pedido recebido' | 'Em analise' | 'Em andamento' | 'Em revisao' | 'Entregue';

type TrackedOrder = ServiceRequest & {
  protocol: string;
  status: OrderStatus;
  submittedAt: string;
  lastUpdate: string;
  estimatedDelivery: string;
  nextStep: string;
};

const initialServiceRequest: ServiceRequest = {
  clientName: '',
  clientContact: '',
  serviceType: '',
  budget: '',
  details: '',
};

const orderStorageKey = 'lzdev-service-orders';
const adminContentStorageKey = 'lzdev-admin-content';
const siteCatalogStorageKey = 'lzdev-site-catalog';
const githubSyncStorageKey = 'lzdev-github-sync-settings';
const adminCredentials = {
  username: 'admin',
  password: 'lzadmin2026',
};

const defaultGitHubSyncSettings: GitHubSyncSettings = {
  owner: 'lzvsrx',
  repo: 'lzdev',
  branch: 'main',
  syncSecret: '',
  autoSync: false,
};

const orderStatusSteps: OrderStatus[] = ['Pedido recebido', 'Em analise', 'Em andamento', 'Em revisao', 'Entregue'];

const publishedTrackedOrders: TrackedOrder[] = [];

const defaultAdminContent: AdminContent = {
  heroTitle: 'Luiz Otavio Valenzi Sousa',
  heroSubtitle: 'Desenvolvedor apaixonado por tecnologia, com experiencia em criacao de sites, aplicativos, programacao e servicos de informatica.',
  aboutTitle: 'Desenvolvimento web, apps e manutencao de computadores',
  aboutText: 'Especializado em desenvolvimento web e manutencao de computadores, com atuacao em sites profissionais, sistemas personalizados, aplicativos mobile, automacoes e suporte tecnico.',
  links: socialLinks.map(({ label, href }) => ({ label, href })),
  skills: skills.map(({ name, percentage }) => ({ name, percentage })),
  databases,
  services: services.map(({ title, text }) => ({ title, text })),
  projectProgresses: githubRepositories.slice(0, 8).map((project) => ({
    projectName: project.name,
    status: project.archived ? 'Arquivado' : 'Disponivel',
    progress: project.homepage ? 100 : 70,
    estimatedDelivery: project.homepage ? 'Publicado' : 'Em evolucao',
    currentStep: project.homepage ? 'Projeto publicado e disponivel para acesso.' : 'Projeto em desenvolvimento ou manutencao.',
  })),
};

const siteCatalog = {
  certificates,
  githubRepositories,
  repositoriesSyncedAt,
  showcaseFeatures: showcaseFeatures.map(({ label }) => ({ label })),
  showcaseGallery: showcaseGallery.map(({ image, title, text }) => ({ image, title, text })),
  showcaseDetails: showcaseDetails.map(({ title, text }) => ({ title, text })),
  workflowSteps: workflowSteps.map(({ title, text }) => ({ title, text })),
  featuredProjectNames,
};

function mergeAdminSkills(storedSkills?: EditableSkill[]) {
  const mergedSkills = [...(storedSkills ?? [])];

  defaultAdminContent.skills.forEach((defaultSkill) => {
    const alreadyExists = mergedSkills.some((skill) => skill.name.toLowerCase() === defaultSkill.name.toLowerCase());

    if (!alreadyExists) {
      mergedSkills.push(defaultSkill);
    }
  });

  return mergedSkills;
}

function readAdminContent(): AdminContent {
  const parsedContent = readCachedRecord<Partial<AdminContent>>(adminContentStorageKey, {});

  return {
    ...defaultAdminContent,
    ...parsedContent,
    links: parsedContent.links ?? defaultAdminContent.links,
    skills: mergeAdminSkills(parsedContent.skills),
    databases: parsedContent.databases ?? defaultAdminContent.databases,
    services: parsedContent.services ?? defaultAdminContent.services,
    projectProgresses: parsedContent.projectProgresses ?? defaultAdminContent.projectProgresses,
  };
}

function writeAdminContent(content: AdminContent) {
  void writeDatabaseRecord(adminContentStorageKey, content);
}

function readGitHubSyncSettings(): GitHubSyncSettings {
  const storedSettings = readCachedRecord<Partial<GitHubSyncSettings>>(githubSyncStorageKey, {});

  return {
    ...defaultGitHubSyncSettings,
    ...storedSettings,
    syncSecret: '',
  };
}

function writeGitHubSyncSettings(settings: GitHubSyncSettings) {
  const { syncSecret: _syncSecret, ...safeSettings } = settings;
  void writeDatabaseRecord(githubSyncStorageKey, safeSettings);
}

function buildGitHubSyncFiles(adminContent: AdminContent, storedOrders: TrackedOrder[]): GitHubSyncFile[] {
  const updatedAt = new Date().toISOString();

  return [
    {
      label: 'Conteudos administraveis',
      path: 'data/admin-content.json',
      content: {
        recordKey: adminContentStorageKey,
        updatedAt,
        data: adminContent,
      },
    },
    {
      label: 'Pedidos e acompanhamentos',
      path: 'data/service-orders.json',
      content: {
        recordKey: orderStorageKey,
        updatedAt,
        data: storedOrders,
      },
    },
    {
      label: 'Catalogo publicado do site',
      path: 'data/site-catalog.json',
      content: {
        recordKey: siteCatalogStorageKey,
        updatedAt,
        data: siteCatalog,
      },
    },
    {
      label: 'Backup completo do banco local',
      path: 'data/database-backup.json',
      content: {
        updatedAt,
        database: {
          engine: 'IndexedDB',
          records: [adminContentStorageKey, orderStorageKey, siteCatalogStorageKey],
        },
        adminContent,
        storedOrders,
        siteCatalog,
      },
    },
  ];
}

async function publishGitHubFiles(settings: GitHubSyncSettings, files: GitHubSyncFile[]) {
  const response = await fetch('/api/sync-github', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-sync-secret': settings.syncSecret,
    },
    body: JSON.stringify({
      owner: settings.owner,
      repo: settings.repo,
      branch: settings.branch,
      files,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(errorBody || 'Falha ao sincronizar dados com o GitHub.');
  }
}

function getLinkIcon(label: string) {
  const normalizedLabel = label.toLowerCase();

  if (normalizedLabel.includes('instagram')) return normalizedLabel.includes('game') ? Gamepad2 : Camera;
  if (normalizedLabel.includes('whatsapp')) return MessageCircle;
  if (normalizedLabel.includes('telefone')) return Phone;
  if (normalizedLabel.includes('github') || normalizedLabel.includes('repo')) return FolderGit2;
  if (normalizedLabel.includes('linkedin')) return BriefcaseBusiness;

  return Globe;
}

function getSkillIcon(name: string) {
  const normalizedName = name.toLowerCase();

  if (normalizedName.includes('react native') || normalizedName.includes('flutter') || normalizedName.includes('swift') || normalizedName.includes('kotlin')) return Smartphone;
  if (normalizedName.includes('unity') || normalizedName.includes('jogos') || normalizedName.includes('game')) return Gamepad2;
  if (normalizedName.includes('spring') || normalizedName.includes('django') || normalizedName.includes('php') || normalizedName.includes('node')) return Server;
  if (normalizedName.includes('data') || normalizedName.includes('analise')) return BarChart3;
  if (normalizedName.includes('security') || normalizedName.includes('direito')) return ShieldCheck;
  if (normalizedName.includes('iot') || normalizedName.includes('sensor')) return MonitorCog;
  if (normalizedName.includes('maven') || normalizedName.includes('gradle')) return Package;
  if (normalizedName.includes('junit') || normalizedName.includes('mockito')) return CheckCircle2;
  if (normalizedName.includes('solid') || normalizedName.includes('design patterns')) return Sparkles;
  if (normalizedName.includes('uml')) return FileText;
  if (normalizedName.includes('empreendedor')) return TrendingUp;
  if (normalizedName.includes('tecnico') || normalizedName.includes('informatica')) return Wrench;
  if (normalizedName.includes('orientacao') || normalizedName.includes('estruturas')) return Layers3;
  if (normalizedName.includes('python') || normalizedName.includes('ia')) return Cpu;
  if (normalizedName.includes('api') || normalizedName.includes('redes') || normalizedName.includes('html') || normalizedName.includes('css')) return Globe;

  return Code2;
}

function getServiceIcon(title: string) {
  const normalizedTitle = title.toLowerCase();

  if (normalizedTitle.includes('format')) return MonitorCog;
  if (normalizedTitle.includes('peca') || normalizedTitle.includes('peça')) return HardDrive;
  if (normalizedTitle.includes('manut')) return Wrench;
  if (normalizedTitle.includes('site')) return Globe;
  if (normalizedTitle.includes('app')) return Smartphone;

  return Code2;
}

function readStoredOrders(): TrackedOrder[] {
  return readCachedRecord<TrackedOrder[]>(orderStorageKey, []);
}

function writeStoredOrders(orders: TrackedOrder[]) {
  void writeDatabaseRecord(orderStorageKey, orders);
}

function formatDisplayDate(date: Date) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

function createOrderProtocol(date = new Date()) {
  const datePart = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('');
  const randomPart = Math.random().toString(36).slice(2, 6).toUpperCase();

  return `LZ-${datePart}-${randomPart}`;
}

function ExternalIcon() {
  return <ExternalLink aria-hidden="true" className="icon" />;
}

function IconBadge({ Icon }: { Icon: IconComponent }) {
  return (
    <span className="card-icon" aria-hidden="true">
      <Icon />
    </span>
  );
}

function App() {
  const [query, setQuery] = useState('');
  const [projectQuery, setProjectQuery] = useState('');
  const [visibilityFilter, setVisibilityFilter] = useState<VisibilityFilter>('all');
  const [serviceRequest, setServiceRequest] = useState<ServiceRequest>(initialServiceRequest);
  const [storedOrders, setStoredOrders] = useState<TrackedOrder[]>(() => readStoredOrders());
  const [trackingQuery, setTrackingQuery] = useState('');
  const [adminContent, setAdminContent] = useState<AdminContent>(() => readAdminContent());
  const [adminLogin, setAdminLogin] = useState({ username: '', password: '' });
  const [adminLoginError, setAdminLoginError] = useState('');
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [importContent, setImportContent] = useState('');
  const [githubSync, setGitHubSync] = useState<GitHubSyncSettings>(() => readGitHubSyncSettings());
  const [githubSyncStatus, setGitHubSyncStatus] = useState('Configure a senha de sincronizacao para o site publicar os dados salvos no repositorio.');
  const [databaseStatus] = useState('Banco de dados local ativo: IndexedDB com fallback automatico.');

  const editableLinks = useMemo(() => (
    adminContent.links.map((link) => ({
      ...link,
      Icon: getLinkIcon(link.label),
    }))
  ), [adminContent.links]);

  const editableHeroLinks = useMemo(() => (
    editableLinks.filter((link) => !['WhatsApp', 'GitHub', 'Repositorio'].includes(link.label))
  ), [editableLinks]);

  const editableAllLinks = useMemo(() => ([
    ...editableLinks,
    { label: 'Repo original', href: 'https://github.com/lzvsrx/luizotaviodevs', Icon: BookOpen },
    { label: 'Todos os repositorios', href: 'https://github.com/lzvsrx?tab=repositories', Icon: Boxes },
  ]), [editableLinks]);

  const editableSkills = useMemo(() => (
    adminContent.skills.map((skill) => ({
      ...skill,
      Icon: getSkillIcon(skill.name),
    }))
  ), [adminContent.skills]);

  const editableServices = useMemo(() => (
    adminContent.services.map((service) => ({
      ...service,
      Icon: getServiceIcon(service.title),
    }))
  ), [adminContent.services]);

  const githubSyncFiles = useMemo(() => (
    buildGitHubSyncFiles(adminContent, storedOrders)
  ), [adminContent, storedOrders]);

  useEffect(() => {
    let isMounted = true;

    async function hydrateDatabase() {
      const [databaseAdminContent, databaseOrders] = await Promise.all([
        readDatabaseRecord(adminContentStorageKey, defaultAdminContent),
        readDatabaseRecord(orderStorageKey, [] as TrackedOrder[]),
      ]);

      if (!isMounted) {
        return;
      }

      const normalizedAdminContent = {
        ...defaultAdminContent,
        ...databaseAdminContent,
        links: databaseAdminContent.links ?? defaultAdminContent.links,
        skills: mergeAdminSkills(databaseAdminContent.skills),
        databases: databaseAdminContent.databases ?? defaultAdminContent.databases,
        services: databaseAdminContent.services ?? defaultAdminContent.services,
        projectProgresses: databaseAdminContent.projectProgresses ?? defaultAdminContent.projectProgresses,
      };

      if (JSON.stringify(normalizedAdminContent) !== JSON.stringify(readAdminContent())) {
        setAdminContent(normalizedAdminContent);
      }

      if (JSON.stringify(databaseOrders) !== JSON.stringify(readStoredOrders())) {
        setStoredOrders(databaseOrders);
      }
    }

    void hydrateDatabase();
    void writeDatabaseRecord(siteCatalogStorageKey, siteCatalog);

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isAdminUnlocked || !githubSync.autoSync || !githubSync.syncSecret.trim()) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      void syncDataToGitHub('automatico');
    }, 2500);

    return () => window.clearTimeout(timeoutId);
  }, [adminContent, storedOrders, isAdminUnlocked, githubSync, githubSyncFiles]);

  const filteredCertificates = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return certificates;
    }

    return certificates.filter((certificate) => {
      const searchable = [
        certificate.title,
        certificate.originalName,
        certificate.type,
      ].join(' ').toLowerCase();

      return searchable.includes(normalizedQuery);
    });
  }, [query]);

  const portfolioStats = useMemo(() => {
    const publicRepositories = githubRepositories.filter((project) => !project.private).length;
    const privateRepositories = githubRepositories.length - publicRepositories;
    const liveProjects = githubRepositories.filter((project) => Boolean(project.homepage)).length;
    const technologies = new Set(githubRepositories.map((project) => project.language).filter(Boolean));

    return [
      { Icon: FolderGit2, value: githubRepositories.length, label: 'repositorios mapeados' },
      { Icon: Globe, value: liveProjects, label: 'projetos com site publicado' },
      { Icon: LockKeyhole, value: privateRepositories, label: 'repositorios privados listados' },
      { Icon: Code2, value: technologies.size, label: 'tecnologias identificadas' },
    ];
  }, []);

  const featuredProjects = useMemo(() => (
    featuredProjectNames
      .map((name) => githubRepositories.find((project) => project.name === name))
      .filter((project): project is (typeof githubRepositories)[number] => Boolean(project))
  ), []);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = projectQuery.trim().toLowerCase();

    return githubRepositories.filter((project) => {
      const matchesVisibility =
        visibilityFilter === 'all' ||
        (visibilityFilter === 'public' && !project.private) ||
        (visibilityFilter === 'private' && project.private);

      if (!matchesVisibility) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const projectProgress = adminContent.projectProgresses.find((progress) => progress.projectName === project.name);
      const searchable = [
        project.name,
        project.description,
        project.summary,
        project.latestRelease?.name,
        project.latestRelease?.tag,
        project.language,
        project.homepage,
        projectProgress?.status,
        projectProgress?.currentStep,
        projectProgress?.estimatedDelivery,
        project.private ? 'privado' : 'publico',
      ].filter(Boolean).join(' ').toLowerCase();

      return searchable.includes(normalizedQuery);
    });
  }, [adminContent.projectProgresses, projectQuery, visibilityFilter]);

  const trackedOrders = useMemo(() => {
    const ordersByProtocol = new Map<string, TrackedOrder>();

    [...storedOrders, ...publishedTrackedOrders].forEach((order) => {
      ordersByProtocol.set(order.protocol.toLowerCase(), order);
    });

    return Array.from(ordersByProtocol.values());
  }, [storedOrders]);

  const trackedOrder = useMemo(() => {
    const normalizedQuery = trackingQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return storedOrders[0] ?? null;
    }

    return trackedOrders.find((order) => order.protocol.toLowerCase() === normalizedQuery) ?? null;
  }, [storedOrders, trackedOrders, trackingQuery]);

  function updateServiceRequest(field: keyof ServiceRequest, value: string) {
    setServiceRequest((currentRequest) => ({
      ...currentRequest,
      [field]: value,
    }));
  }

  function updateAdminContent(nextContent: AdminContent) {
    setAdminContent(nextContent);
    writeAdminContent(nextContent);
  }

  function updateAdminField(field: keyof AdminContent, value: string) {
    updateAdminContent({
      ...adminContent,
      [field]: value,
    });
  }

  function updateAdminLink(index: number, field: keyof EditableLink, value: string) {
    const nextLinks = adminContent.links.map((link, linkIndex) => (
      linkIndex === index ? { ...link, [field]: value } : link
    ));

    updateAdminContent({ ...adminContent, links: nextLinks });
  }

  function addAdminLink() {
    updateAdminContent({
      ...adminContent,
      links: [...adminContent.links, { label: 'Novo link', href: 'https://' }],
    });
  }

  function removeAdminLink(index: number) {
    updateAdminContent({
      ...adminContent,
      links: adminContent.links.filter((_, linkIndex) => linkIndex !== index),
    });
  }

  function updateAdminSkill(index: number, field: keyof EditableSkill, value: string) {
    const nextSkills = adminContent.skills.map((skill, skillIndex) => (
      skillIndex === index
        ? { ...skill, [field]: field === 'percentage' ? Number(value) : value }
        : skill
    ));

    updateAdminContent({ ...adminContent, skills: nextSkills });
  }

  function addAdminSkill() {
    updateAdminContent({
      ...adminContent,
      skills: [...adminContent.skills, { name: 'Nova tecnologia', percentage: 70 }],
    });
  }

  function removeAdminSkill(index: number) {
    updateAdminContent({
      ...adminContent,
      skills: adminContent.skills.filter((_, skillIndex) => skillIndex !== index),
    });
  }

  function updateAdminService(index: number, field: keyof EditableService, value: string) {
    const nextServices = adminContent.services.map((service, serviceIndex) => (
      serviceIndex === index ? { ...service, [field]: value } : service
    ));

    updateAdminContent({ ...adminContent, services: nextServices });
  }

  function addAdminService() {
    updateAdminContent({
      ...adminContent,
      services: [...adminContent.services, { title: 'Novo servico', text: 'Descreva o servico oferecido.' }],
    });
  }

  function removeAdminService(index: number) {
    updateAdminContent({
      ...adminContent,
      services: adminContent.services.filter((_, serviceIndex) => serviceIndex !== index),
    });
  }

  function updateProjectProgress(index: number, field: keyof ProjectProgress, value: string) {
    const nextProjectProgresses = adminContent.projectProgresses.map((progress, progressIndex) => (
      progressIndex === index
        ? { ...progress, [field]: field === 'progress' ? Number(value) : value }
        : progress
    ));

    updateAdminContent({ ...adminContent, projectProgresses: nextProjectProgresses });
  }

  function addProjectProgress() {
    const projectWithoutProgress = githubRepositories.find((project) => (
      !adminContent.projectProgresses.some((progress) => progress.projectName === project.name)
    ));

    updateAdminContent({
      ...adminContent,
      projectProgresses: [
        ...adminContent.projectProgresses,
        {
          projectName: projectWithoutProgress?.name ?? 'Novo projeto',
          status: 'Em andamento',
          progress: 50,
          estimatedDelivery: 'A definir',
          currentStep: 'Descreva a etapa atual do projeto.',
        },
      ],
    });
  }

  function removeProjectProgress(index: number) {
    updateAdminContent({
      ...adminContent,
      projectProgresses: adminContent.projectProgresses.filter((_, progressIndex) => progressIndex !== index),
    });
  }

  function updateAdminDatabase(index: number, value: string) {
    updateAdminContent({
      ...adminContent,
      databases: adminContent.databases.map((database, databaseIndex) => (
        databaseIndex === index ? value : database
      )),
    });
  }

  function addAdminDatabase() {
    updateAdminContent({
      ...adminContent,
      databases: [...adminContent.databases, 'Novo banco'],
    });
  }

  function removeAdminDatabase(index: number) {
    updateAdminContent({
      ...adminContent,
      databases: adminContent.databases.filter((_, databaseIndex) => databaseIndex !== index),
    });
  }

  function updateStoredOrder(index: number, field: keyof TrackedOrder, value: string) {
    const nextOrders = storedOrders.map((order, orderIndex) => (
      orderIndex === index ? { ...order, [field]: value } : order
    ));

    setStoredOrders(nextOrders);
    writeStoredOrders(nextOrders);
  }

  function removeStoredOrder(index: number) {
    const nextOrders = storedOrders.filter((_, orderIndex) => orderIndex !== index);
    setStoredOrders(nextOrders);
    writeStoredOrders(nextOrders);
  }

  function updateGitHubSyncField(field: keyof GitHubSyncSettings, value: string | boolean) {
    const nextSettings = {
      ...githubSync,
      [field]: value,
    };

    setGitHubSync(nextSettings);
    writeGitHubSyncSettings(nextSettings);
  }

  async function syncDataToGitHub(mode: 'manual' | 'automatico' = 'manual') {
    const hasRequiredSettings = githubSync.owner.trim() && githubSync.repo.trim() && githubSync.branch.trim() && githubSync.syncSecret.trim();

    if (!hasRequiredSettings) {
      setGitHubSyncStatus('Preencha dono, repositorio, branch e senha de sincronizacao antes de sincronizar.');
      return;
    }

    try {
      setGitHubSyncStatus(mode === 'automatico' ? 'Sincronizando automaticamente com o GitHub...' : 'Sincronizando dados com o GitHub...');

      await publishGitHubFiles(githubSync, githubSyncFiles);

      setGitHubSyncStatus(`Sincronizacao concluida: ${githubSyncFiles.length} arquivos salvos em ${githubSync.owner}/${githubSync.repo}.`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido ao sincronizar com o GitHub.';
      setGitHubSyncStatus(message);
    }
  }

  function unlockAdmin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isValidLogin =
      adminLogin.username.trim() === adminCredentials.username &&
      adminLogin.password === adminCredentials.password;

    setIsAdminUnlocked(isValidLogin);
    setAdminLoginError(isValidLogin ? '' : 'Login ou senha incorretos. Tente novamente.');
  }

  function exportAdminBackup() {
    const backup = JSON.stringify({
      adminContent,
      storedOrders,
      siteCatalog,
      database: {
        engine: 'IndexedDB',
        records: [adminContentStorageKey, orderStorageKey, siteCatalogStorageKey],
      },
    }, null, 2);
    setImportContent(backup);
  }

  function importAdminBackup() {
    try {
      const parsedBackup = JSON.parse(importContent) as Partial<{ adminContent: AdminContent; storedOrders: TrackedOrder[] }>;

      if (parsedBackup.adminContent) {
        updateAdminContent({ ...defaultAdminContent, ...parsedBackup.adminContent });
      }

      if (parsedBackup.storedOrders) {
        setStoredOrders(parsedBackup.storedOrders);
        writeStoredOrders(parsedBackup.storedOrders);
      }
    } catch {
      setImportContent('JSON invalido. Revise o backup e tente novamente.');
    }
  }

  function resetAdminContent() {
    updateAdminContent(defaultAdminContent);
  }

  function handleServiceRequestSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const now = new Date();
    const order: TrackedOrder = {
      ...serviceRequest,
      protocol: createOrderProtocol(now),
      status: 'Pedido recebido',
      submittedAt: formatDisplayDate(now),
      lastUpdate: formatDisplayDate(now),
      estimatedDelivery: 'A combinar pelo WhatsApp',
      nextStep: 'Aguardando confirmacao do servico, valor final e prazo de entrega.',
    };

    const updatedOrders = [order, ...storedOrders].slice(0, 12);
    setStoredOrders(updatedOrders);
    setTrackingQuery(order.protocol);
    writeStoredOrders(updatedOrders);

    const message = [
      'Ola, Luiz Otavio! Quero pedir um servico pelo seu portfolio.',
      '',
      `Protocolo do pedido: ${order.protocol}`,
      `Nome do cliente: ${serviceRequest.clientName}`,
      `Contato do cliente: ${serviceRequest.clientContact}`,
      `Servico desejado: ${serviceRequest.serviceType}`,
      `Valor/orcamento informado: ${serviceRequest.budget}`,
      `Status inicial: ${order.status}`,
      `Previsao de entrega: ${order.estimatedDelivery}`,
      '',
      'Descricao do que precisa ser feito:',
      serviceRequest.details,
    ].join('\n');

    window.open(
      `https://wa.me/5535999215995?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer',
    );
  }

  const orderStatusIndex = trackedOrder ? orderStatusSteps.indexOf(trackedOrder.status) : -1;

  return (
    <main className="site-shell">
      <a className="skip-link" href="#conteudo">Pular para o conteudo</a>
      <nav className="topbar" aria-label="Navegacao principal">
        <a className="brand" href="#inicio"><img src="/icone.png" alt="" className="brand-icon" aria-hidden="true" /> Luiz Otavio Valenzi Sousa</a>
        <div className="nav-links">
          <a href="#sobre"><BriefcaseBusiness aria-hidden="true" className="inline-icon" />Sobre</a>
          <a href="#habilidades"><Code2 aria-hidden="true" className="inline-icon" />Habilidades</a>
          <a href="#projetos"><FolderGit2 aria-hidden="true" className="inline-icon" />Projetos</a>
          <a href="#certificados"><Award aria-hidden="true" className="inline-icon" />Certificados</a>
          <a href="#contato"><Globe aria-hidden="true" className="inline-icon" />Contato</a>
          <a href="#admin"><LockKeyhole aria-hidden="true" className="inline-icon" />Admin</a>
        </div>
      </nav>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">Desenvolvedor Full Stack</p>
          <h1>{adminContent.heroTitle}</h1>
          <p className="hero-text">
            {adminContent.heroSubtitle}
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#certificados"><Award aria-hidden="true" className="inline-icon" />Ver certificados</a>
            <a className="ghost-button" href="https://github.com/lzvsrx" target="_blank" rel="noopener noreferrer">
              <FolderGit2 aria-hidden="true" className="inline-icon" /> GitHub <ExternalIcon />
            </a>
            <a className="ghost-button" href="https://wa.me/5535999215995" target="_blank" rel="noopener noreferrer">
              <MessageCircle aria-hidden="true" className="inline-icon" /> WhatsApp <ExternalIcon />
            </a>
          </div>
          <div className="hero-metrics" aria-label="Resumo do portfolio">
            {portfolioStats.map((stat) => (
              <article className="metric-card" key={stat.label}>
                <stat.Icon aria-hidden="true" className="inline-icon" />
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
          <div className="social-chip-row" aria-label="Links sociais">
            {editableHeroLinks.map((link) => {
              const { Icon } = link;

              return (
              <a href={link.href} target="_blank" rel="noopener noreferrer" key={link.href}>
                <Icon aria-hidden="true" className="inline-icon" />
                {link.label}
              </a>
              );
            })}
          </div>
        </div>

        <div className="hero-media" aria-label="Foto de perfil e resumo">
          <img src="/profile.jpg" alt="Luiz Otavio Valenzi Sousa" className="profile-photo" />
          <div className="hero-stats">
            <Award aria-hidden="true" className="stat-icon" />
            <strong>{certificates.length}</strong>
            <span>certificados e diplomas publicados</span>
          </div>
        </div>
      </section>

      <section className="section about-section" id="sobre">
        <div id="conteudo" className="anchor-target" aria-hidden="true" />
        <div className="section-heading">
          <p className="eyebrow">Sobre Mim</p>
          <h2>{adminContent.aboutTitle}</h2>
        </div>
        <p className="about-text">
          {adminContent.aboutText}
        </p>
        <div className="proof-strip" aria-label="Pontos fortes do portfolio">
          <span><Sparkles aria-hidden="true" className="inline-icon" />Projetos reais e publicados</span>
          <span><ShieldCheck aria-hidden="true" className="inline-icon" />Boas praticas de seguranca</span>
          <span><Award aria-hidden="true" className="inline-icon" />Certificados verificaveis</span>
          <span><TrendingUp aria-hidden="true" className="inline-icon" />Evolucao constante no GitHub</span>
        </div>
      </section>

      <section className="section languages-section" id="habilidades">
        <div className="section-heading">
          <p className="eyebrow">Linguagens de Programacao</p>
          <h2>Tecnologias e niveis do repositorio base</h2>
        </div>
        <div className="skills-grid">
          {editableSkills.map((skill) => (
            <article className="skill-item" key={skill.name}>
              <div className="skill-info">
                <span className="skill-name"><skill.Icon aria-hidden="true" className="inline-icon" />{skill.name}</span>
                <span className="skill-percentage">{skill.percentage}%</span>
              </div>
              <div className="skill-bar" aria-hidden="true">
                <div className="skill-progress" style={{ width: `${skill.percentage}%` }} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section databases-section">
        <div className="section-heading">
          <p className="eyebrow">Bancos de Dados</p>
          <h2>Persistencia e organizacao de dados</h2>
        </div>
        <div className="databases-grid">
          {adminContent.databases.map((database) => (
            <article className="database-item" key={database}>
              <IconBadge Icon={Database} />
              <h3>{database}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="section services-section">
        <div className="section-heading">
          <p className="eyebrow">Servicos de Informatica</p>
          <h2>Do codigo ao computador pronto para uso</h2>
        </div>
        <div className="services-grid">
          {editableServices.map((service) => (
            <article className="service-card" key={service.title}>
              <IconBadge Icon={service.Icon} />
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section projects-section" id="projetos">
        <div className="section-heading">
          <p className="eyebrow">Projetos GitHub</p>
          <h2>Todos os repositorios do perfil</h2>
          <p className="section-support">
            {githubRepositories.length} repositorios carregados do GitHub de Luiz Otavio,
            incluindo publicos e privados.
            {' '}Dados conferidos em {new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo' }).format(new Date(repositoriesSyncedAt))}.
            {' '}Ordenados pela atividade mais recente no GitHub.
          </p>
        </div>
        <div className="featured-projects" aria-label="Projetos em destaque">
          {featuredProjects.map((project) => (
            <article className="featured-project-card" key={project.name}>
              <IconBadge Icon={project.private ? LockKeyhole : Trophy} />
              <div>
                <p className="mini-label">Destaque</p>
                <h3>{project.name}</h3>
                <p>{project.summary ?? project.description ?? `Projeto em ${project.language ?? 'desenvolvimento'} com foco pratico no portfolio.`}</p>
              </div>
              <div className="repo-actions">
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  <FolderGit2 aria-hidden="true" className="inline-icon" /> Codigo <ExternalIcon />
                </a>
                {project.homepage ? (
                  <a href={project.homepage} target="_blank" rel="noopener noreferrer">
                    <Globe aria-hidden="true" className="inline-icon" /> Demo <ExternalIcon />
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
        <div className="project-toolbar" aria-label="Filtros de repositorios">
          <label htmlFor="project-search"><Search aria-hidden="true" className="inline-icon" />Buscar projeto</label>
          <input
            id="project-search"
            type="search"
            value={projectQuery}
            onChange={(event) => setProjectQuery(event.target.value)}
            placeholder="Nome, tecnologia, status ou link"
          />
          <div className="segmented-control" aria-label="Visibilidade dos repositorios">
            {visibilityOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={visibilityFilter === option.value ? 'active' : ''}
                onClick={() => setVisibilityFilter(option.value)}
                aria-pressed={visibilityFilter === option.value}
              >
                {option.label}
              </button>
            ))}
          </div>
          <span>{filteredProjects.length} de {githubRepositories.length}</span>
        </div>
        <div className="projects-grid project-summary-grid">
          {filteredProjects.map((project) => {
            const updatedAt = new Intl.DateTimeFormat('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            }).format(new Date(project.updatedAt));
            const projectProgress = adminContent.projectProgresses.find((progress) => progress.projectName === project.name);

            return (
            <article className="project-summary-card" key={project.name}>
              <IconBadge Icon={project.private ? LockKeyhole : FolderGit2} />
              <h3>{project.name}</h3>
              <p>
                {project.summary ?? project.description ?? `Repositorio ${project.private ? 'privado' : 'publico'} em ${project.language ?? 'desenvolvimento'}.`}
              </p>
              <div className="repo-meta" aria-label={`Metadados do repositorio ${project.name}`}>
                <span><Code2 aria-hidden="true" className="inline-icon" />{project.language ?? 'Sem linguagem'}</span>
                <span><CalendarClock aria-hidden="true" className="inline-icon" />Atualizado em {updatedAt}</span>
                <span><GitFork aria-hidden="true" className="inline-icon" />Ultimo envio em {new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo' }).format(new Date(project.pushedAt))}</span>
                <span><Star aria-hidden="true" className="inline-icon" />{project.stars} estrelas</span>
                <span><GitFork aria-hidden="true" className="inline-icon" />{project.forks} forks</span>
                <span>{project.private ? <Lock aria-hidden="true" className="inline-icon" /> : <Globe aria-hidden="true" className="inline-icon" />}{project.private ? 'Privado' : 'Publico'}</span>
                {project.archived ? <span><Package aria-hidden="true" className="inline-icon" />Arquivado</span> : null}
              </div>
              {project.latestRelease ? (
                <p>
                  <strong>{project.latestRelease.prerelease ? 'Pre-release' : 'Release'}:</strong>{' '}
                  {project.latestRelease.name}{' — '}
                  {new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo' }).format(new Date(project.latestRelease.publishedAt))}
                </p>
              ) : null}
              {projectProgress ? (
                <div className="project-progress-box" aria-label={`Andamento do projeto ${project.name}`}>
                  <div className="project-progress-header">
                    <span><TrendingUp aria-hidden="true" className="inline-icon" />{projectProgress.status}</span>
                    <strong>{projectProgress.progress}%</strong>
                  </div>
                  <div className="project-progress-track" aria-hidden="true">
                    <div style={{ width: `${Math.min(100, Math.max(0, projectProgress.progress))}%` }} />
                  </div>
                  <p><strong>Entrega:</strong> {projectProgress.estimatedDelivery}</p>
                  <p>{projectProgress.currentStep}</p>
                </div>
              ) : null}
              <div className="repo-actions">
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                <FolderGit2 aria-hidden="true" className="inline-icon" /> Ver projeto <ExternalIcon />
                </a>
                {project.latestRelease ? (
                  <a href={project.latestRelease.url} target="_blank" rel="noopener noreferrer">
                    <Package aria-hidden="true" className="inline-icon" /> Ver release {project.latestRelease.tag}{project.private ? ' (acesso restrito)' : ''} <ExternalIcon />
                  </a>
                ) : null}
                {project.homepage ? (
                  <a href={project.homepage} target="_blank" rel="noopener noreferrer">
                    <Globe aria-hidden="true" className="inline-icon" /> Abrir site <ExternalIcon />
                  </a>
                ) : null}
              </div>
            </article>
            );
          })}
        </div>
        {filteredProjects.length === 0 ? (
          <p className="empty-state">Nenhum projeto encontrado com esse filtro.</p>
        ) : null}
        <div className="github-profile-link">
          <a href="https://github.com/lzvsrx" target="_blank" rel="noopener noreferrer" className="profile-link-btn">
            <FolderGit2 aria-hidden="true" className="inline-icon" /> Ver todos os repositorios no GitHub <ExternalIcon />
          </a>
        </div>
      </section>

      <section className="section case-study-section">
        <div className="section-heading">
          <p className="eyebrow">Estudos de Caso</p>
          <h2>Projetos explicados pelo problema, solucao e impacto</h2>
        </div>
        <div className="case-study-grid">
          {projectCaseStudies.map((study) => {
            const project = githubRepositories.find((item) => item.name === study.repoName);

            return (
              <article className="case-study-card" key={study.title}>
                <IconBadge Icon={study.Icon} />
                <h3>{study.title}</h3>
                <dl>
                  <div>
                    <dt>Problema</dt>
                    <dd>{study.problem}</dd>
                  </div>
                  <div>
                    <dt>Solucao</dt>
                    <dd>{study.solution}</dd>
                  </div>
                  <div>
                    <dt>Impacto</dt>
                    <dd>{study.impact}</dd>
                  </div>
                </dl>
                {project ? (
                  <div className="repo-actions">
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      <FolderGit2 aria-hidden="true" className="inline-icon" /> Repositorio <ExternalIcon />
                    </a>
                    {project.homepage ? (
                      <a href={project.homepage} target="_blank" rel="noopener noreferrer">
                        <Globe aria-hidden="true" className="inline-icon" /> Demo <ExternalIcon />
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>

      <section className="section showcase-section">
        <div className="section-heading">
          <p className="eyebrow">Projeto em Destaque</p>
          <h2>Cores & Fragrancias by Berenice</h2>
        </div>
        <div className="showcase-header">
          <img src="/cores-login.png" alt="Tela de login do Cores & Fragrancias" className="showcase-image" />
          <div className="showcase-info">
            <p className="showcase-subtitle">
              Sistema de Gerenciamento de Estoque para Loja de Cosmeticos
            </p>
            <p className="showcase-description">
              Sistema completo desenvolvido para controle de produtos, vendas, usuarios e relatorios
              financeiros, permitindo uma gestao eficiente e profissional do negocio.
            </p>
            <div className="tag-row">
              {showcaseFeatures.map((feature) => (
                <span key={feature.label}><feature.Icon aria-hidden="true" className="inline-icon" />{feature.label}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="showcase-gallery">
          {showcaseGallery.map((item) => (
            <article className="gallery-item" key={item.title}>
              <img src={item.image} alt={item.title} />
              <div>
                <h3><item.Icon aria-hidden="true" className="inline-icon" />{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="showcase-details">
          {showcaseDetails.map((detail) => (
            <article className="detail-card" key={detail.title}>
              <IconBadge Icon={detail.Icon} />
              <h3>{detail.title}</h3>
              <p>{detail.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section workflow-section">
        <div className="section-heading">
          <p className="eyebrow">Como Trabalho</p>
          <h2>Processo claro para entregar projetos funcionais</h2>
        </div>
        <div className="workflow-grid">
          {workflowSteps.map((step, index) => (
            <article className="workflow-card" key={step.title}>
              <span className="workflow-number">{String(index + 1).padStart(2, '0')}</span>
              <IconBadge Icon={step.Icon} />
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section certificates-section" id="certificados">
        <div className="section-heading">
          <p className="eyebrow">Certificados</p>
          <h2>Formacao, cursos e documentos</h2>
        </div>
        <div className="certificate-toolbar">
          <label htmlFor="certificate-search"><Search aria-hidden="true" className="inline-icon" />Buscar certificado</label>
          <input
            id="certificate-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Digite curso, codigo ou arquivo"
          />
          <span>{filteredCertificates.length} de {certificates.length}</span>
        </div>
        <div className="certificates-grid">
          {filteredCertificates.map((certificate) => (
            <article className="certificate-card" key={certificate.fileName}>
              <div>
                <span className="certificate-type"><BadgeCheck aria-hidden="true" className="inline-icon" />{certificate.type}</span>
                <h3>{certificate.title}</h3>
                <p>{certificate.originalName}</p>
              </div>
              <a href={certificate.href} target="_blank" rel="noopener noreferrer">
                <FileText aria-hidden="true" className="inline-icon" /> Abrir certificado <ExternalIcon />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section links-section" id="contato">
        <div className="section-heading">
          <p className="eyebrow">Pedido de Servico</p>
          <h2>Solicite um orcamento direto pelo WhatsApp</h2>
          <p className="section-support">
            Preencha os dados do servico, descreva tudo que precisa ser feito e envie a mensagem pronta para meu WhatsApp.
          </p>
        </div>
        <form className="service-request-form" onSubmit={handleServiceRequestSubmit}>
          <div className="form-grid">
            <label htmlFor="client-name">
              Nome do cliente
              <input
                id="client-name"
                name="clientName"
                type="text"
                value={serviceRequest.clientName}
                onChange={(event) => updateServiceRequest('clientName', event.target.value)}
                placeholder="Digite seu nome"
                required
              />
            </label>
            <label htmlFor="client-contact">
              Contato para retorno
              <input
                id="client-contact"
                name="clientContact"
                type="text"
                value={serviceRequest.clientContact}
                onChange={(event) => updateServiceRequest('clientContact', event.target.value)}
                placeholder="WhatsApp, telefone ou e-mail"
                required
              />
            </label>
            <label htmlFor="service-type">
              Servico desejado
              <select
                id="service-type"
                name="serviceType"
                value={serviceRequest.serviceType}
                onChange={(event) => updateServiceRequest('serviceType', event.target.value)}
                required
              >
                <option value="">Selecione um servico</option>
                {editableServices.map((service) => (
                  <option key={service.title} value={service.title}>{service.title}</option>
                ))}
                <option value="Outro servico">Outro servico</option>
              </select>
            </label>
            <label htmlFor="service-budget">
              Valor ou orcamento disponivel
              <input
                id="service-budget"
                name="budget"
                type="text"
                value={serviceRequest.budget}
                onChange={(event) => updateServiceRequest('budget', event.target.value)}
                placeholder="Ex: R$ 250,00 ou a combinar"
                required
              />
            </label>
          </div>
          <label htmlFor="service-details" className="full-field">
            Descreva tudo que precisa que eu faca
            <textarea
              id="service-details"
              name="details"
              value={serviceRequest.details}
              onChange={(event) => updateServiceRequest('details', event.target.value)}
              placeholder="Explique o problema, objetivo, prazo, tipo de equipamento/site/app e qualquer detalhe importante."
              rows={6}
              required
            />
          </label>
          <button className="order-submit" type="submit">
            <Send aria-hidden="true" className="inline-icon" /> Enviar pedido pelo WhatsApp <ExternalIcon />
          </button>
        </form>
        <div className="order-control-panel" aria-label="Acompanhamento do pedido">
          <div className="section-heading compact-heading">
            <p className="eyebrow">Controle do Cliente</p>
            <h2>Acompanhe seu pedido</h2>
            <p className="section-support">
              Use o protocolo gerado no envio para consultar se o pedido foi recebido, esta em andamento e qual a previsao de entrega.
            </p>
          </div>
          <label htmlFor="tracking-code" className="tracking-search">
            Protocolo do pedido
            <div>
              <input
                id="tracking-code"
                type="search"
                value={trackingQuery}
                onChange={(event) => setTrackingQuery(event.target.value)}
                placeholder="Ex: LZ-20260819-ABCD"
              />
              <button type="button" onClick={() => setTrackingQuery(trackingQuery.trim())}>
                <Search aria-hidden="true" className="inline-icon" /> Consultar
              </button>
            </div>
          </label>
          {trackedOrder ? (
            <article className="order-status-card">
              <div className="order-status-header">
                <span className="certificate-type"><CheckCircle2 aria-hidden="true" className="inline-icon" />{trackedOrder.status}</span>
                <strong>{trackedOrder.protocol}</strong>
              </div>
              <div className="order-summary-grid">
                <span><strong>Cliente</strong>{trackedOrder.clientName}</span>
                <span><strong>Servico</strong>{trackedOrder.serviceType}</span>
                <span><strong>Valor</strong>{trackedOrder.budget}</span>
                <span><strong>Entrega</strong>{trackedOrder.estimatedDelivery}</span>
                <span><strong>Atualizado</strong>{trackedOrder.lastUpdate}</span>
                <span><strong>Contato</strong>{trackedOrder.clientContact}</span>
              </div>
              <p className="order-next-step">{trackedOrder.nextStep}</p>
              <div className="order-timeline" aria-label={`Status atual: ${trackedOrder.status}`}>
                {orderStatusSteps.map((status, index) => (
                  <span
                    key={status}
                    className={index <= orderStatusIndex ? 'complete' : ''}
                    aria-current={status === trackedOrder.status ? 'step' : undefined}
                  >
                    {status}
                  </span>
                ))}
              </div>
            </article>
          ) : (
            <p className="empty-state">
              {trackingQuery.trim()
                ? 'Nenhum pedido encontrado com esse protocolo.'
                : 'Depois de enviar um pedido, o protocolo aparece aqui para acompanhamento.'}
            </p>
          )}
        </div>
      </section>

      <section className="section links-section">
        <div className="section-heading">
          <p className="eyebrow">Links</p>
          <h2>Contato e presenca online</h2>
        </div>
        <div className="links-grid">
          {editableAllLinks.map((link) => {
            const { Icon } = link;

            return (
            <a href={link.href} target="_blank" rel="noopener noreferrer" key={link.href}>
              <Icon aria-hidden="true" className="inline-icon" />
              {link.label}
              <ExternalIcon />
            </a>
            );
          })}
        </div>
      </section>

      <section className="section admin-section" id="admin">
        <div className="section-heading">
          <p className="eyebrow">Administracao</p>
          <h2>Painel de controle do site</h2>
          <p className="section-support">
            Edite conteudos, links, servicos, tecnologias, bancos de dados e pedidos salvos neste navegador.
          </p>
        </div>

        {!isAdminUnlocked ? (
          <form className="admin-login" onSubmit={unlockAdmin}>
            <label htmlFor="admin-username">
              Login administrativo
              <input
                id="admin-username"
                type="text"
                value={adminLogin.username}
                onChange={(event) => setAdminLogin({ ...adminLogin, username: event.target.value })}
                placeholder="Digite seu login"
                autoComplete="username"
              />
            </label>
            <label htmlFor="admin-password">
              Senha administrativa
              <input
                id="admin-password"
                type="password"
                value={adminLogin.password}
                onChange={(event) => setAdminLogin({ ...adminLogin, password: event.target.value })}
                placeholder="Digite sua senha"
                autoComplete="current-password"
              />
            </label>
            <button type="submit"><LockKeyhole aria-hidden="true" className="inline-icon" /> Entrar no painel</button>
            {adminLoginError ? <p className="admin-warning">{adminLoginError}</p> : null}
          </form>
        ) : (
          <div className="admin-dashboard">
            <div className="admin-summary-grid">
              <article><strong>{adminContent.links.length}</strong><span>links administraveis</span></article>
              <article><strong>{adminContent.skills.length}</strong><span>tecnologias</span></article>
              <article><strong>{adminContent.services.length}</strong><span>servicos</span></article>
              <article><strong>{adminContent.projectProgresses.length}</strong><span>andamentos de projetos</span></article>
              <article><strong>{storedOrders.length}</strong><span>pedidos locais</span></article>
              <article><strong>{certificates.length}</strong><span>certificados publicados</span></article>
              <article><strong>{githubRepositories.length}</strong><span>repositorios no site</span></article>
            </div>

            <article className="admin-panel database-panel">
              <h3><Database aria-hidden="true" className="inline-icon" /> Banco de dados do site</h3>
              <p>{databaseStatus}</p>
              <div className="database-record-grid">
                <span><strong>{adminContentStorageKey}</strong>Conteudos editaveis, links, tecnologias, bancos, servicos e andamento dos projetos.</span>
                <span><strong>{orderStorageKey}</strong>Pedidos, protocolos, status, previsoes e proximas etapas.</span>
                <span><strong>{siteCatalogStorageKey}</strong>Catalogo do site com certificados, repositorios, showcase e processos.</span>
              </div>
            </article>

            <article className="admin-panel github-sync-panel">
              <h3><FolderGit2 aria-hidden="true" className="inline-icon" /> Sincronizacao GitHub</h3>
              <p className="admin-panel-note">
                Salva automaticamente os dados do painel em arquivos JSON dentro do repositorio usando uma API protegida. O token do GitHub fica somente no servidor.
              </p>
              <div className="form-grid">
                <label htmlFor="github-owner">
                  Dono do repositorio
                  <input
                    id="github-owner"
                    value={githubSync.owner}
                    onChange={(event) => updateGitHubSyncField('owner', event.target.value)}
                  />
                </label>
                <label htmlFor="github-repo">
                  Repositorio
                  <input
                    id="github-repo"
                    value={githubSync.repo}
                    onChange={(event) => updateGitHubSyncField('repo', event.target.value)}
                  />
                </label>
                <label htmlFor="github-branch">
                  Branch
                  <input
                    id="github-branch"
                    value={githubSync.branch}
                    onChange={(event) => updateGitHubSyncField('branch', event.target.value)}
                  />
                </label>
                <label htmlFor="github-sync-secret">
                  Senha de sincronizacao
                  <input
                    id="github-sync-secret"
                    type="password"
                    value={githubSync.syncSecret}
                    onChange={(event) => updateGitHubSyncField('syncSecret', event.target.value)}
                    placeholder="Mesma senha configurada em GITHUB_SYNC_SECRET"
                    autoComplete="off"
                  />
                </label>
              </div>
              <label htmlFor="github-auto-sync" className="github-auto-sync">
                <input
                  id="github-auto-sync"
                  type="checkbox"
                  checked={githubSync.autoSync}
                  onChange={(event) => updateGitHubSyncField('autoSync', event.target.checked)}
                />
                Sincronizar automaticamente depois de cada alteracao salva
              </label>
              <div className="sync-file-list" aria-label="Arquivos enviados para o GitHub">
                {githubSyncFiles.map((file) => (
                  <span key={file.path}><strong>{file.path}</strong>{file.label}</span>
                ))}
              </div>
              <div className="admin-actions">
                <button type="button" onClick={() => void syncDataToGitHub('manual')}>
                  <Upload aria-hidden="true" className="inline-icon" /> Sincronizar agora
                </button>
              </div>
              <p className="github-sync-status">{githubSyncStatus}</p>
            </article>

            <article className="admin-panel">
              <h3><FileText aria-hidden="true" className="inline-icon" /> Textos principais</h3>
              <div className="form-grid">
                <label htmlFor="admin-hero-title">
                  Nome/titulo da tela inicial
                  <input
                    id="admin-hero-title"
                    value={adminContent.heroTitle}
                    onChange={(event) => updateAdminField('heroTitle', event.target.value)}
                  />
                </label>
                <label htmlFor="admin-about-title">
                  Titulo da secao Sobre
                  <input
                    id="admin-about-title"
                    value={adminContent.aboutTitle}
                    onChange={(event) => updateAdminField('aboutTitle', event.target.value)}
                  />
                </label>
              </div>
              <label htmlFor="admin-hero-subtitle" className="full-field">
                Texto da tela inicial
                <textarea
                  id="admin-hero-subtitle"
                  rows={4}
                  value={adminContent.heroSubtitle}
                  onChange={(event) => updateAdminField('heroSubtitle', event.target.value)}
                />
              </label>
              <label htmlFor="admin-about-text" className="full-field">
                Texto da secao Sobre
                <textarea
                  id="admin-about-text"
                  rows={4}
                  value={adminContent.aboutText}
                  onChange={(event) => updateAdminField('aboutText', event.target.value)}
                />
              </label>
            </article>

            <article className="admin-panel">
              <div className="admin-panel-header">
                <h3><Globe aria-hidden="true" className="inline-icon" /> Links</h3>
                <button type="button" onClick={addAdminLink}><Plus aria-hidden="true" className="inline-icon" /> Adicionar link</button>
              </div>
              <div className="admin-list">
                {adminContent.links.map((link, index) => (
                  <div className="admin-row" key={`${link.label}-${index}`}>
                    <input
                      aria-label={`Nome do link ${index + 1}`}
                      value={link.label}
                      onChange={(event) => updateAdminLink(index, 'label', event.target.value)}
                    />
                    <input
                      aria-label={`URL do link ${index + 1}`}
                      value={link.href}
                      onChange={(event) => updateAdminLink(index, 'href', event.target.value)}
                    />
                    <button type="button" onClick={() => removeAdminLink(index)}><Trash2 aria-hidden="true" className="inline-icon" /> Remover</button>
                  </div>
                ))}
              </div>
            </article>

            <article className="admin-panel">
              <div className="admin-panel-header">
                <h3><Code2 aria-hidden="true" className="inline-icon" /> Tecnologias</h3>
                <button type="button" onClick={addAdminSkill}><Plus aria-hidden="true" className="inline-icon" /> Adicionar tecnologia</button>
              </div>
              <div className="admin-list">
                {adminContent.skills.map((skill, index) => (
                  <div className="admin-row compact-admin-row" key={`${skill.name}-${index}`}>
                    <input
                      aria-label={`Nome da tecnologia ${index + 1}`}
                      value={skill.name}
                      onChange={(event) => updateAdminSkill(index, 'name', event.target.value)}
                    />
                    <input
                      aria-label={`Nivel da tecnologia ${index + 1}`}
                      type="number"
                      min="0"
                      max="100"
                      value={skill.percentage}
                      onChange={(event) => updateAdminSkill(index, 'percentage', event.target.value)}
                    />
                    <button type="button" onClick={() => removeAdminSkill(index)}><Trash2 aria-hidden="true" className="inline-icon" /> Remover</button>
                  </div>
                ))}
              </div>
            </article>

            <article className="admin-panel">
              <div className="admin-panel-header">
                <h3><Database aria-hidden="true" className="inline-icon" /> Bancos de dados</h3>
                <button type="button" onClick={addAdminDatabase}><Plus aria-hidden="true" className="inline-icon" /> Adicionar banco</button>
              </div>
              <div className="admin-list">
                {adminContent.databases.map((database, index) => (
                  <div className="admin-row compact-admin-row" key={`${database}-${index}`}>
                    <input
                      aria-label={`Banco de dados ${index + 1}`}
                      value={database}
                      onChange={(event) => updateAdminDatabase(index, event.target.value)}
                    />
                    <button type="button" onClick={() => removeAdminDatabase(index)}><Trash2 aria-hidden="true" className="inline-icon" /> Remover</button>
                  </div>
                ))}
              </div>
            </article>

            <article className="admin-panel">
              <div className="admin-panel-header">
                <h3><Wrench aria-hidden="true" className="inline-icon" /> Servicos</h3>
                <button type="button" onClick={addAdminService}><Plus aria-hidden="true" className="inline-icon" /> Adicionar servico</button>
              </div>
              <div className="admin-list">
                {adminContent.services.map((service, index) => (
                  <div className="admin-row service-admin-row" key={`${service.title}-${index}`}>
                    <input
                      aria-label={`Titulo do servico ${index + 1}`}
                      value={service.title}
                      onChange={(event) => updateAdminService(index, 'title', event.target.value)}
                    />
                    <textarea
                      aria-label={`Descricao do servico ${index + 1}`}
                      value={service.text}
                      rows={3}
                      onChange={(event) => updateAdminService(index, 'text', event.target.value)}
                    />
                    <button type="button" onClick={() => removeAdminService(index)}><Trash2 aria-hidden="true" className="inline-icon" /> Remover</button>
                  </div>
                ))}
              </div>
            </article>

            <article className="admin-panel">
              <div className="admin-panel-header">
                <h3><TrendingUp aria-hidden="true" className="inline-icon" /> Andamento dos projetos</h3>
                <button type="button" onClick={addProjectProgress}><Plus aria-hidden="true" className="inline-icon" /> Adicionar andamento</button>
              </div>
              <div className="admin-list">
                {adminContent.projectProgresses.map((projectProgress, index) => (
                  <div className="admin-project-progress-row" key={`${projectProgress.projectName}-${index}`}>
                    <label>
                      Projeto
                      <select
                        aria-label={`Projeto do andamento ${index + 1}`}
                        value={projectProgress.projectName}
                        onChange={(event) => updateProjectProgress(index, 'projectName', event.target.value)}
                      >
                        <option value={projectProgress.projectName}>{projectProgress.projectName}</option>
                        {githubRepositories.map((project) => (
                          <option key={project.name} value={project.name}>{project.name}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Status
                      <input
                        aria-label={`Status do projeto ${projectProgress.projectName}`}
                        value={projectProgress.status}
                        onChange={(event) => updateProjectProgress(index, 'status', event.target.value)}
                        placeholder="Ex: Em andamento"
                      />
                    </label>
                    <label>
                      Progresso
                      <input
                        aria-label={`Progresso do projeto ${projectProgress.projectName}`}
                        type="number"
                        min="0"
                        max="100"
                        value={projectProgress.progress}
                        onChange={(event) => updateProjectProgress(index, 'progress', event.target.value)}
                      />
                    </label>
                    <label>
                      Previsao de entrega
                      <input
                        aria-label={`Previsao do projeto ${projectProgress.projectName}`}
                        value={projectProgress.estimatedDelivery}
                        onChange={(event) => updateProjectProgress(index, 'estimatedDelivery', event.target.value)}
                        placeholder="Ex: 25/08/2026"
                      />
                    </label>
                    <label className="admin-project-step">
                      Etapa atual
                      <textarea
                        aria-label={`Etapa atual do projeto ${projectProgress.projectName}`}
                        rows={3}
                        value={projectProgress.currentStep}
                        onChange={(event) => updateProjectProgress(index, 'currentStep', event.target.value)}
                        placeholder="Explique o que esta sendo feito agora."
                      />
                    </label>
                    <button type="button" onClick={() => removeProjectProgress(index)}><Trash2 aria-hidden="true" className="inline-icon" /> Remover andamento</button>
                  </div>
                ))}
              </div>
            </article>

            <article className="admin-panel">
              <h3><CalendarClock aria-hidden="true" className="inline-icon" /> Pedidos e entregas</h3>
              <div className="admin-list">
                {storedOrders.length ? storedOrders.map((order, index) => (
                  <div className="admin-order-row" key={order.protocol}>
                    <strong>{order.protocol}</strong>
                    <input
                      aria-label={`Cliente do pedido ${order.protocol}`}
                      value={order.clientName}
                      onChange={(event) => updateStoredOrder(index, 'clientName', event.target.value)}
                    />
                    <select
                      aria-label={`Status do pedido ${order.protocol}`}
                      value={order.status}
                      onChange={(event) => updateStoredOrder(index, 'status', event.target.value)}
                    >
                      {orderStatusSteps.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                    <input
                      aria-label={`Previsao do pedido ${order.protocol}`}
                      value={order.estimatedDelivery}
                      onChange={(event) => updateStoredOrder(index, 'estimatedDelivery', event.target.value)}
                    />
                    <textarea
                      aria-label={`Proxima etapa do pedido ${order.protocol}`}
                      rows={3}
                      value={order.nextStep}
                      onChange={(event) => updateStoredOrder(index, 'nextStep', event.target.value)}
                    />
                    <button type="button" onClick={() => removeStoredOrder(index)}><Trash2 aria-hidden="true" className="inline-icon" /> Remover pedido</button>
                  </div>
                )) : (
                  <p className="empty-state">Ainda nao ha pedidos salvos neste navegador.</p>
                )}
              </div>
            </article>

            <article className="admin-panel">
              <h3><Save aria-hidden="true" className="inline-icon" /> Backup e restauracao</h3>
              <div className="admin-actions">
                <button type="button" onClick={exportAdminBackup}><FileText aria-hidden="true" className="inline-icon" /> Gerar backup JSON</button>
                <button type="button" onClick={importAdminBackup}><Upload aria-hidden="true" className="inline-icon" /> Importar JSON</button>
                <button type="button" onClick={resetAdminContent}><RotateCcw aria-hidden="true" className="inline-icon" /> Restaurar padrao</button>
              </div>
              <label htmlFor="admin-backup" className="full-field">
                Backup JSON
                <textarea
                  id="admin-backup"
                  rows={8}
                  value={importContent}
                  onChange={(event) => setImportContent(event.target.value)}
                  placeholder="Gere um backup ou cole aqui um JSON para importar."
                />
              </label>
            </article>
          </div>
        )}
      </section>

      <footer className="footer">
        <p>2026 Luiz Otavio Valenzi Sousa. Todos os direitos reservados.</p>
        <p>Desenvolvedor Full Stack</p>
      </footer>
    </main>
  );
}

export default App;
