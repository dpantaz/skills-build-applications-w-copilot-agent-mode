/**
 * VITE_CODESPACE_NAME is REQUIRED for GitHub Codespaces deployment.
 * Set this in .env.local (or define it in your environment) as:
 *   VITE_CODESPACE_NAME=<your-codespace-name>
 *
 * For local development without Codespaces, leave it unset to use localhost.
 * The app will fall back to http://localhost:8000/api
 */
const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

/**
 * API base URL computed from environment.
 * - In Codespaces: https://<codespace-name>-8000.app.github.dev/api
 * - Locally: http://localhost:8000/api
 */
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

/**
 * Current environment label for UI display
 */
export const apiEnvironment = codespaceName ? 'Codespaces' : 'localhost'

/**
 * Normalizes API responses to a consistent format.
 * Handles:
 * - Direct array responses: [item1, item2, ...]
 * - Paginated responses: { data: [...], pagination: {...} }
 * - Alternative formats: { results: [...] }, { items: [...] }, { docs: [...] }
 * - Meta pagination formats
 *
 * Returns: { items: Array, pagination: Object|null }
 */
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

/**
 * Fetches a collection from the API.
 *
 * Constructs URL: ${apiBaseUrl}/${collection}/
 * Example: https://my-codespace-8000.app.github.dev/api/users/
 *
 * @param {string} collection - The collection name (e.g., 'users', 'teams', 'activities')
 * @returns {Promise<{items: Array, pagination: Object|null}>} Normalized response
 */
export async function fetchCollection(collection) {
  const url = `${apiBaseUrl}/${collection}/`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    return normalizeApiResponse(await response.json())
  } catch (error) {
    console.error(`Failed to fetch ${collection} from ${url}:`, error)
    throw error
  }
}