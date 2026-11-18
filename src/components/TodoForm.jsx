import { ArrowUp, Plus } from 'lucide-react'
import { useState } from 'react'

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (!title.trim()) return

    onAdd(title)
    setTitle('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <span className="form-plus" aria-hidden="true"><Plus size={19} /></span>
      <label className="visually-hidden" htmlFor="new-task">Add a task</label>
      <input
        id="new-task"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="What needs to get done?"
        maxLength={180}
        autoComplete="off"
      />
      <button className="add-button" type="submit" disabled={!title.trim()}>
        <span>Add task</span>
        <ArrowUp size={16} aria-hidden="true" />
      </button>
    </form>
  )
}
