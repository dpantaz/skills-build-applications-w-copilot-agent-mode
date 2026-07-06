import ResourceState from './ResourceState.jsx'
import useCollection from './useCollection.js'

/**
 * Leaderboard Component
 *
 * Displays ranked entries from the leaderboard API.
 * Fetches from: ${apiBaseUrl}/leaderboard/
 *
 * Handles:
 * - Loading state with spinner message
 * - Error state with error message
 * - Empty array responses
 * - Ranking display with points
 */
function Leaderboard() {
  const { items, loading, error } = useCollection('leaderboard')

  return (
    <section className="content-panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Competition</span>
          <h1>Leaderboard</h1>
        </div>
        <span className="count-badge">Top {items.length}</span>
      </div>
      <ResourceState loading={loading} error={error}>
        <div className="leaderboard-list">
          {items.map((entry) => (
            <article className="leaderboard-row" key={entry._id ?? entry.rank}>
              <span className="rank">#{entry.rank}</span>
              <div>
                <h2>{entry.userEmail}</h2>
                <p>{entry.teamName}</p>
              </div>
              <strong>{entry.points} pts</strong>
            </article>
          ))}
        </div>
      </ResourceState>
    </section>
  )
}

export default Leaderboard