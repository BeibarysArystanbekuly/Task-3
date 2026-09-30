import { useState } from 'react'
import { groups } from '../data/exercises.js'

export default function ExerciseForm({ onAdd, onClose }) {
  const [name, setName] = useState('')
  const [group, setGroup] = useState('Back')
  const [sets, setSets] = useState(3)
  const [target, setTarget] = useState('10 reps')
  const [equipment, setEquipment] = useState('Bodyweight')
  function submit(event) {
    event.preventDefault()
    if (!name.trim() || !target.trim() || !equipment.trim()) return
    onAdd({ name: name.trim(), group, sets: Number(sets), target: target.trim(), equipment: equipment.trim() })
  }
  return <section className="add-panel" aria-labelledby="add-heading">
    <div className="section-heading"><h2 id="add-heading">Add an exercise</h2><button className="text-button" onClick={onClose}>Cancel</button></div>
    <form onSubmit={submit}>
      <label>Exercise name<input autoFocus required maxLength={60} value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Seated cable row" /></label>
      <label>Muscle group<select value={group} onChange={e => setGroup(e.target.value)}>{groups.map(item => <option key={item}>{item}</option>)}</select></label>
      <label>Sets<input required type="number" min="1" max="10" value={sets} onChange={e => setSets(e.target.value)} /></label>
      <label>Target per set<input required maxLength={30} value={target} onChange={e => setTarget(e.target.value)} /></label>
      <label>Equipment<input required maxLength={30} value={equipment} onChange={e => setEquipment(e.target.value)} /></label>
      <button type="submit" className="primary-button">Add exercise</button>
    </form>
  </section>
}
