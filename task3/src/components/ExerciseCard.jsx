import { useState } from 'react'
import { statuses } from '../data/exercises.js'

export default function ExerciseCard({ exercise, hidden, onStatus, onReset, onRemove }) {
  const [completedSets, setCompletedSets] = useState([])
  const [notesOpen, setNotesOpen] = useState(false)
  const [note, setNote] = useState('')
  const [confirmRemove, setConfirmRemove] = useState(false)
  console.log(`[render] ExerciseCard: ${exercise.name}`, { id: exercise.id, resetVersion: exercise.resetVersion, completedSets })
  function toggleSet(index) {
    const next = completedSets.includes(index) ? completedSets.filter(set => set !== index) : [...completedSets, index]
    setCompletedSets(next)
    onStatus(exercise.id, next.length === exercise.sets ? 'Completed' : next.length ? 'In progress' : 'Planned')
  }
  return <article className="exercise-card" hidden={hidden} aria-label={exercise.name}>
    <div className="card-top"><span className="group-tag">{exercise.group}</span><span className="equipment">{exercise.equipment}</span></div>
    <h3>{exercise.name}</h3>
    <p className="prescription"><strong>{exercise.sets}</strong> sets <span>×</span> <strong>{exercise.target}</strong></p>
    <div className="set-heading"><span>SET PROGRESS</span><span>{completedSets.length} / {exercise.sets}</span></div>
    <div className="sets">{Array.from({ length: exercise.sets }, (_, index) => <button key={index} className={completedSets.includes(index) ? 'set done' : 'set'} aria-label={`Set ${index + 1} for ${exercise.name}`} aria-pressed={completedSets.includes(index)} onClick={() => toggleSet(index)}>{completedSets.includes(index) ? '✓' : String(index + 1).padStart(2, '0')}</button>)}</div>
    <label className="status-label">Status<select className="status" value={exercise.status} onChange={e => onStatus(exercise.id, e.target.value)}>{statuses.map(item => <option key={item}>{item}</option>)}</select></label>
    <div className="card-actions"><button className="text-button" aria-expanded={notesOpen} onClick={() => setNotesOpen(!notesOpen)}>{notesOpen ? 'Hide note' : note ? 'Edit note' : '+ Add note'}</button><button className="text-button" onClick={() => onReset(exercise.id)}>Reset</button><button className="text-button remove" aria-expanded={confirmRemove} onClick={() => setConfirmRemove(!confirmRemove)}>Remove</button></div>
    {notesOpen && <label className="note-label">Exercise note<textarea maxLength={300} value={note} onChange={e => setNote(e.target.value)} placeholder="Weight, technique, or next time…" /></label>}
    {confirmRemove && <div className="remove-confirm"><p>Remove this exercise and its progress?</p><button className="danger-button" onClick={() => onRemove(exercise.id)}>Yes, remove</button><button className="text-button" onClick={() => setConfirmRemove(false)}>Keep exercise</button></div>}
  </article>
}
