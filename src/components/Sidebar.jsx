import { CheckCheck, Circle, LayoutGrid } from 'lucide-react'

const filters = [
  { id: 'all', label: 'All tasks', icon: LayoutGrid, countKey: 'total' },
  { id: 'active', label: 'In progress', icon: Circle, countKey: 'active' },
  { id: 'completed', label: 'Completed', icon: CheckCheck, countKey: 'completed' },
]

export default function Sidebar({ activeFilter, counts, onFilterChange }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-label">WORKSPACE</div>
      <nav className="filter-nav" aria-label="Task filters">
        {filters.map(({ id, label, icon: Icon, countKey }) => (
          <button
            className={`filter-link ${activeFilter === id ? 'is-active' : ''}`}
            key={id}
            type="button"
            aria-current={activeFilter === id ? 'page' : undefined}
            onClick={() => onFilterChange(id)}
          >
            <Icon size={18} strokeWidth={1.9} aria-hidden="true" />
            <span>{label}</span>
            <span className="filter-count">{counts[countKey]}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-note">
        <span className="note-sparkle" aria-hidden="true">✦</span>
        <p>Small steps every day add up to big things.</p>
        <span className="note-caption">Keep your momentum going</span>
      </div>
      <div className="sidebar-footer">
        <span className="status-dot" aria-hidden="true" />
        Your tasks are saved on this device
      </div>
    </aside>
  )
}
