export default function ProgressBar({ completed, total }) {
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <section className="progress-card" aria-label="Task completion progress">
      <div className="progress-copy">
        <div>
          <p className="eyebrow">YOUR PROGRESS</p>
          <h2>{progress === 100 && total > 0 ? 'Everything, handled.' : 'You’re making progress.'}</h2>
        </div>
        <div className="progress-number">
          <strong>{progress}%</strong>
          <span>complete</span>
        </div>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-label="Tasks completed"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <span className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <p className="progress-footnote">
        {completed} of {total} {total === 1 ? 'task' : 'tasks'} complete
      </p>
    </section>
  )
}
