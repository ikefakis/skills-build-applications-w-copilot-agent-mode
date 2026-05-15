export function buildApiUrl(resource) {
  const codespaceName =
    process.env.REACT_APP_CODESPACE_NAME ||
    window.location.hostname.replace(/-3000\.app\.github\.dev$/, '');

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/${resource}/`;
  }

  return `http://localhost:8000/api/${resource}/`;
}

export function normalizeApiResponse(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  return [];
}