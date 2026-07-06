import ResourceState from './ResourceState.jsx'
import useCollection from './useCollection.js'

/**
 * Workouts Component
 *
 * Displays cards for personalized workout suggestions from the API.
 * Fetches from: ${apiBaseUrl}/workouts/
 *
 * Handles:
 * - Loading state with spinner message
 * - Error state with error message
 * - Empty array responses
 * - Workout metadata: focus area, difficulty, duration
 */
function Workouts() {
  const { items, loading, error } = useCollection('workouts')

  return (
    <section className="content-panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Suggestions</span>
          <h1>Workouts</h1>
        </div>
        <span className="count-badge">{items.length} plans</span>
      </div>
      <ResourceState loading={loading} error={error}>
        <div className="resource-grid">
          {items.map((workout) => (
            <article className="resource-card" key={workout._id ?? workout.title}>
              <h2>{workout.title}</h2>
              <p>{workout.recommendedForGoal}</p>
              <dl>
                <dt>Focus</dt>
                <dd>{workout.focusArea}</dd>
                <dt>Difficulty</dt>
                <dd>{workout.difficulty}</dd>
                <dt>Duration</dt>
                <dd>{workout.durationMinutes} min</dd>
              </dl>
            </article>
          ))}
        </div>
      </ResourceState>
    </section>
  )
}

export default Workouts