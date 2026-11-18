import { CheckCircle2, ListTodo } from 'lucide-react'
import TodoItem from './TodoItem.jsx'

const emptyContent = {
  all: {
    title: 'A little room to breathe',
    description: 'Your list is clear. Add a task above when you’re ready.',
  },
  active: {
    title: 'You’re all caught up',
    description: 'No tasks in progress right now. Enjoy the breathing room.',
  },
  completed: {
    title: 'Your wins will show up here',
    description: 'Complete a task to start building your list of wins.',
  },
}

export default function TodoList({ todos, filter, onToggle, onDelete }) {
  if (todos.length === 0) {
    const content = emptyContent[filter]
    const EmptyIcon = filter === 'completed' ? CheckCircle2 : ListTodo

    return (
      <div className="empty-state">
        <div className="empty-illustration">
          <span className="empty-orbit orbit-one" />
          <span className="empty-orbit orbit-two" />
          <span className="empty-icon"><EmptyIcon size={31} strokeWidth={1.7} /></span>
          <span className="empty-sparkle sparkle-one">✦</span>
          <span className="empty-sparkle sparkle-two">✧</span>
        </div>
        <h3>{content.title}</h3>
        <p>{content.description}</p>
      </div>
    )
  }

  const activeTodos = todos.filter((todo) => !todo.completed)
  const completedTodos = todos.filter((todo) => todo.completed)

  function renderGroup(group, label) {
    if (group.length === 0) return null

    return (
      <section className="todo-group" aria-label={label}>
        <div className="group-heading">
          <span>{label}</span>
          <span className="group-count">{group.length}</span>
        </div>
        <ul className="todo-list">
          {group.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
          ))}
        </ul>
      </section>
    )
  }

  return (
    <div className="task-groups">
      {renderGroup(activeTodos, 'TO DO')}
      {renderGroup(completedTodos, 'COMPLETED')}
    </div>
  )
}
