const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export const apiEnvironment = codespaceName ? 'Codespaces' : 'localhost'

export function normalizeApiResponse(payload) {
  if (Array.isArray(payload)) {
    return { items: payload, pagination: null }
  }

  const items = payload?.data ?? payload?.results ?? payload?.items ?? payload?.docs ?? []
  const pagination = payload?.pagination ?? payload?.meta ?? {
    page: payload?.page,
    limit: payload?.limit,
    total: payload?.total,
    totalPages: payload?.totalPages,
  }

  return {
    items: Array.isArray(items) ? items : [],
    pagination,
  }
}

export async function fetchCollection(collection) {
  const response = await fetch(`${apiBaseUrl}/${collection}/`)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return normalizeApiResponse(await response.json())
}