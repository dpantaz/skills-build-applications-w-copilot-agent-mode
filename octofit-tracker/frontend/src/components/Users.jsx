import ResourceState from './ResourceState.jsx'
import useCollection from './useCollection.js'

/**
 * Users Component
 *
 * Displays a table of all users from the API.
 * Fetches from: ${apiBaseUrl}/users/
 *
 * Handles:
 * - Loading state with spinner message
 * - Error state with error message
 * - Empty array responses
 */
function Users() {
  const { items, loading, error } = useCollection('users')

  return (
    <section className="content-panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Profiles</span>
          <h1>Users</h1>
        </div>
        <span className="count-badge">{items.length} members</span>
      </div>
      <ResourceState loading={loading} error={error}>
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Fitness Goal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((user) => (
                <tr key={user._id ?? user.email}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.fitnessGoal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ResourceState>
    </section>
  )
}

export default Users