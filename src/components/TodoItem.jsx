import { Check, Trash2 } from 'lucide-react'

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${todo.completed ? 'is-completed' : ''}`}>
      <button
        className="todo-check"
        type="button"
        role="checkbox"
        aria-checked={todo.completed}
        aria-label={`${todo.completed ? 'Mark as active' : 'Complete'}: ${todo.title}`}
        onClick={() => onToggle(todo.id)}
      >
        {todo.completed && <Check size={14} strokeWidth={3} aria-hidden="true" />}
      </button>
      <span className="todo-title">{todo.title}</span>
      <span className="todo-date">
        {todo.createdAt
          ? new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(
              new Date(todo.createdAt),
            )
          : ''}
      </span>
      <button
        className="delete-button"
        type="button"
        aria-label={`Delete ${todo.title}`}
        onClick={() => onDelete(todo.id)}
      >
        <Trash2 size={16} aria-hidden="true" />
      </button>
    </li>
  )
}
