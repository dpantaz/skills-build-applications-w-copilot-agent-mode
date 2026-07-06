/**
 * ResourceState Component
 *
 * Conditionally renders loading, error, or content states.
 * Used by collection components to handle async data fetching.
 *
 * @param {boolean} loading - Whether data is being loaded
 * @param {string} error - Error message, if any
 * @param {ReactNode} children - Content to render when loaded successfully
 */
function ResourceState({ loading, error, children }) {
  if (loading) {
    return <div className="alert alert-info mb-0">Loading data...</div>
  }

  if (error) {
    return <div className="alert alert-danger mb-0">{error}</div>
  }

  return children
}

export default ResourceState