import { groups, statuses } from '../data/exercises.js'

export default function WorkoutFilters({ group, status, onGroupChange, onStatusChange }) {
  return (
    <div className="filters">
      <div className="group-filters" role="group" aria-label="Filter by muscle group">
        {['All groups', ...groups].map(item => (
          <button
            key={item}
            className={group === item ? 'filter active' : 'filter'}
            aria-pressed={group === item}
            onClick={() => onGroupChange(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <label className="status-filter">
        Status
        <select value={status} onChange={event => onStatusChange(event.target.value)}>
          {['All statuses', ...statuses].map(item => <option key={item}>{item}</option>)}
        </select>
      </label>
    </div>
  )
}
