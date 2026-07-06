import ResourceState from './ResourceState.jsx'
import useCollection from './useCollection.js'

/**
 * Teams Component
 *
 * Displays cards for all teams from the API.
 * Fetches from: ${apiBaseUrl}/teams/
 *
 * Handles:
 * - Loading state with spinner message
 * - Error state with error message
 * - Empty array responses
 * - Team metadata: captain email, member count
 */
function Teams() {
  const { items, loading, error } = useCollection('teams')

  return (
    <section className="content-panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Groups</span>
          <h1>Teams</h1>
        </div>
        <span className="count-badge">{items.length} squads</span>
      </div>
      <ResourceState loading={loading} error={error}>
        <div className="resource-grid">
          {items.map((team) => (
            <article className="resource-card" key={team._id ?? team.name}>
              <h2>{team.name}</h2>
              <p>{team.description}</p>
              <dl>
                <dt>Captain</dt>
                <dd>{team.captainEmail}</dd>
                <dt>Members</dt>
                <dd>{team.memberEmails?.length ?? 0}</dd>
              </dl>
            </article>
          ))}
        </div>
      </ResourceState>
    </section>
  )
}

export default Teams