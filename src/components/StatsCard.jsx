export default function StatsCard({ label, value, caption, icon: Icon, tone }) {
  return (
    <article className={`stats-card stats-${tone}`}>
      <div className="stats-top">
        <span className="stats-label">{label}</span>
        <span className="stats-icon"><Icon size={17} strokeWidth={2} aria-hidden="true" /></span>
      </div>
      <div className="stats-bottom">
        <span className="stats-value">{value}</span>
        <span className="stats-caption">{caption}</span>
      </div>
    </article>
  )
}
