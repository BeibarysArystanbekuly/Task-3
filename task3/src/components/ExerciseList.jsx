import ExerciseCard from './ExerciseCard.jsx'

export default function ExerciseList({ exercises, group, status, reversed, onStatus, onReset, onRemove, onEmptyAction }) {
  const ordered = reversed ? [...exercises].reverse() : exercises
  const matches = exercise => (
    (group === 'All groups' || exercise.group === group)
    && (status === 'All statuses' || exercise.status === status)
  )
  const hasMatches = exercises.some(matches)

  return (
    <>
      <div className="exercise-grid">
        {/* Hidden cards stay mounted, preserving local state across filtering. */}
        {ordered.map(exercise => (
          <ExerciseCard
            key={`${exercise.id}-${exercise.resetVersion}`}
            exercise={exercise}
            hidden={!matches(exercise)}
            onStatus={onStatus}
            onReset={onReset}
            onRemove={onRemove}
          />
        ))}
      </div>
      {!hasMatches && (
        <div className="empty-state">
          <h3>{exercises.length ? 'No exercises match your filters' : 'A fresh start'}</h3>
          <p>
            {exercises.length
              ? 'Try another muscle group or status to see your exercises.'
              : 'Add your first exercise to start building your plan.'}
          </p>
          <button className="secondary-button" onClick={onEmptyAction}>
            {exercises.length ? 'Clear filters' : 'Add an exercise'}
          </button>
        </div>
      )}
    </>
  )
}
