import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ExerciseForm from './components/ExerciseForm.jsx'
import ExerciseList from './components/ExerciseList.jsx'
import WorkoutFilters from './components/WorkoutFilters.jsx'
import WorkoutSummary from './components/WorkoutSummary.jsx'
import { initialExercises } from './data/exercises.js'
import './App.css'

export default function App() {
  const [exercises, setExercises] = useState(initialExercises)
  const [group, setGroup] = useState('All groups')
  const [status, setStatus] = useState('All statuses')
  const [reversed, setReversed] = useState(false)
  const [formOpen, setFormOpen] = useState(false)

  console.log('[render] Workout dashboard', { group, status, reversed, count: exercises.length })

  const visibleCount = exercises.filter(exercise => (
    (group === 'All groups' || exercise.group === group)
    && (status === 'All statuses' || exercise.status === status)
  )).length

  function changeStatus(id, nextStatus) {
    setExercises(current => current.map(exercise => (
      exercise.id === id ? { ...exercise, status: nextStatus } : exercise
    )))
  }

  function resetExercise(id) {
    // A new key remounts only this card, resetting all of its local state.
    setExercises(current => current.map(exercise => (
      exercise.id === id
        ? { ...exercise, resetVersion: exercise.resetVersion + 1, status: 'Planned' }
        : exercise
    )))
  }

  function addExercise(values) {
    setExercises(current => [
      ...current,
      { ...values, id: crypto.randomUUID(), status: 'Planned', resetVersion: 0 },
    ])
    setGroup('All groups')
    setStatus('All statuses')
    setFormOpen(false)
  }

  function removeExercise(id) {
    setExercises(current => current.filter(exercise => exercise.id !== id))
  }

  function clearFilters() {
    setGroup('All groups')
    setStatus('All statuses')
    if (!exercises.length) setFormOpen(true)
  }

  return (
    <div className="app-shell">
      <Header />
      <main id="main">
        <section className="page-heading">
          <div>
            <p className="eyebrow">BUILD CONSISTENCY. ONE SET AT A TIME.</p>
            <h1>Your workout.<br /><span>Your pace.</span></h1>
            <p className="intro">Plan your exercises, track your sets, and make every rep count.</p>
          </div>
          <button
            className="primary-button add-button"
            aria-expanded={formOpen}
            onClick={() => setFormOpen(!formOpen)}
          >
            {formOpen ? 'Close form' : '+ Add exercise'}
          </button>
        </section>

        <WorkoutSummary exercises={exercises} />
        {formOpen && <ExerciseForm onAdd={addExercise} onClose={() => setFormOpen(false)} />}

        <section aria-labelledby="exercises-heading">
          <div className="section-heading">
            <div className="list-heading">
              <h2 id="exercises-heading">Exercise plan</h2>
              <span className="count-pill" aria-live="polite">{visibleCount} exercises</span>
            </div>
            <button
              className="secondary-button"
              aria-pressed={reversed}
              onClick={() => setReversed(!reversed)}
            >
              ↕ {reversed ? 'Restore order' : 'Reverse order'}
            </button>
          </div>
          <WorkoutFilters
            group={group}
            status={status}
            onGroupChange={setGroup}
            onStatusChange={setStatus}
          />
          <ExerciseList
            exercises={exercises}
            group={group}
            status={status}
            reversed={reversed}
            onStatus={changeStatus}
            onReset={resetExercise}
            onRemove={removeExercise}
            onEmptyAction={clearFilters}
          />
        </section>
        <Footer />
      </main>
    </div>
  )
}
