import ResourceState from './ResourceState'
import useCollection from './useCollection'

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