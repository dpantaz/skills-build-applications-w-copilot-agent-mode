import ResourceState from './ResourceState'
import useCollection from './useCollection'

function Activities() {
  const { items, loading, error } = useCollection('activities')

  return (
    <section className="content-panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Tracking</span>
          <h1>Activities</h1>
        </div>
        <span className="count-badge">{items.length} logs</span>
      </div>
      <ResourceState loading={loading} error={error}>
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Type</th>
                <th>User</th>
                <th>Team</th>
                <th>Duration</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {items.map((activity) => (
                <tr key={activity._id}>
                  <td>{activity.type}</td>
                  <td>{activity.userEmail}</td>
                  <td>{activity.teamName}</td>
                  <td>{activity.durationMinutes} min</td>
                  <td>{activity.caloriesBurned}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ResourceState>
    </section>
  )
}

export default Activities