type SyncFile = {
  label?: string;
  path: string;
  content: unknown;
};

type SyncRequest = {
  owner?: string;
  repo?: string;
  branch?: string;
  files?: SyncFile[];
};

const allowedPaths = new Set([
  'data/admin-content.json',
  'data/service-orders.json',
  'data/site-catalog.json',
  'data/database-backup.json',
]);

function sendJson(response: any, status: number, data: unknown) {
  response.status(status).setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(data));
}

function encodeBase64(value: string) {
  return Buffer.from(value, 'utf8').toString('base64');
}

async function getGitHubFileSha(owner: string, repo: string, branch: string, path: string, token: string) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${encodeURIComponent(branch)}`;
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  if (response.status === 404) {
    return undefined;
  }

  if (!response.ok) {
    throw new Error(`Nao foi possivel ler ${path} no GitHub.`);
  }

  const file = await response.json() as { sha?: string };
  return file.sha;
}

async function publishGitHubFile(owner: string, repo: string, branch: string, token: string, file: SyncFile) {
  const sha = await getGitHubFileSha(owner, repo, branch, file.path, token);
  const content = `${JSON.stringify(file.content, null, 2)}\n`;
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${file.path}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: JSON.stringify({
      branch,
      message: `Sync site data: ${file.path}`,
      content: encodeBase64(content),
      sha,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Falha ao salvar ${file.path}: ${errorBody}`);
  }
}

export default async function handler(request: any, response: any) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    sendJson(response, 405, { error: 'Metodo nao permitido.' });
    return;
  }

  const expectedSecret = process.env.GITHUB_SYNC_SECRET;
  const githubToken = process.env.GITHUB_TOKEN;

  if (!expectedSecret || !githubToken) {
    sendJson(response, 500, { error: 'Sincronizacao GitHub nao configurada no servidor.' });
    return;
  }

  if (request.headers['x-sync-secret'] !== expectedSecret) {
    sendJson(response, 401, { error: 'Senha de sincronizacao invalida.' });
    return;
  }

  const body = typeof request.body === 'string' ? JSON.parse(request.body) as SyncRequest : request.body as SyncRequest;
  const owner = process.env.GITHUB_SYNC_OWNER || body.owner || 'lzvsrx';
  const repo = process.env.GITHUB_SYNC_REPO || body.repo || 'lzdev';
  const branch = process.env.GITHUB_SYNC_BRANCH || body.branch || 'main';
  const files = body.files ?? [];

  if (!Array.isArray(files) || files.length === 0) {
    sendJson(response, 400, { error: 'Nenhum arquivo recebido para sincronizar.' });
    return;
  }

  const invalidFile = files.find((file) => !allowedPaths.has(file.path));

  if (invalidFile) {
    sendJson(response, 400, { error: `Caminho nao permitido: ${invalidFile.path}` });
    return;
  }

  try {
    for (const file of files) {
      await publishGitHubFile(owner, repo, branch, githubToken, file);
    }

    sendJson(response, 200, {
      ok: true,
      repository: `${owner}/${repo}`,
      branch,
      files: files.map((file) => file.path),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido ao sincronizar com o GitHub.';
    sendJson(response, 500, { error: message });
  }
}
