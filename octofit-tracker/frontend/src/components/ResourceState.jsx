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