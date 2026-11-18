import { CalendarDays, CheckCircle2 } from 'lucide-react'

export default function Header({ date, completedCount, totalCount }) {
  const progress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100)

  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-mark" aria-hidden="true">
          <CheckCircle2 size={22} strokeWidth={2.5} />
        </span>
        <span className="brand-name">TaskFlow</span>
      </div>
      <div className="topbar-right">
        <span className="date-chip">
          <CalendarDays size={16} aria-hidden="true" />
          {date}
        </span>
        <span className="day-progress">
          <span className="day-progress-icon"><CheckCircle2 size={16} /></span>
          <span>{progress}% of your day</span>
        </span>
      </div>
    </header>
  )
}
