
export default function WorkoutSummary({ exercises }) {
  const completed = exercises.filter(item => item.status === 'Completed').length
  return <section className="summary" aria-label="Workout summary">
    <div><span className="stat-label">IN YOUR PLAN</span><p>{exercises.length}<span>exercises</span></p></div>
    <div><span className="stat-label">MUSCLE GROUPS</span><p>{new Set(exercises.map(item => item.group)).size}<span>groups</span></p></div>
    <div><span className="stat-label">IN PROGRESS</span><p>{exercises.filter(item => item.status === 'In progress').length}<span>exercises</span></p></div>
    <div className="completion-stat"><span className="stat-label">COMPLETED</span><p>{completed}<span>/ {exercises.length} exercises</span></p><progress aria-label="Exercises completed" value={completed} max={exercises.length || 1} /></div>
  </section>
}
