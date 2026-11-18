import { CheckCircle2, CircleDashed, ListChecks, Sparkles, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import ProgressBar from './components/ProgressBar.jsx'
import Sidebar from './components/Sidebar.jsx'
import StatsCard from './components/StatsCard.jsx'
import TodoForm from './components/TodoForm.jsx'
import TodoList from './components/TodoList.jsx'
import useTodos from './hooks/useTodos.js'

const filterTitles = {
  all: 'All tasks',
  active: 'In progress',
  completed: 'Completed',
}

function getFormattedDate() {
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date())
}

export default function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodos()
  const [activeFilter, setActiveFilter] = useState('all')
  const completedCount = todos.filter((todo) => todo.completed).length
  const activeCount = todos.length - completedCount

  const visibleTodos = useMemo(() => {
    if (activeFilter === 'active') return todos.filter((todo) => !todo.completed)
    if (activeFilter === 'completed') return todos.filter((todo) => todo.completed)
    return todos
  }, [activeFilter, todos])

  function handleDelete(id) {
    const todo = todos.find((item) => item.id === id)
    if (!todo) return
    if (window.confirm(`Delete “${todo.title}”? This can’t be undone.`)) {
      deleteTodo(id)
    }
  }

  function handleClearCompleted() {
    if (completedCount === 0) return
    if (window.confirm(`Clear all ${completedCount} completed ${completedCount === 1 ? 'task' : 'tasks'}?`)) {
      clearCompleted()
    }
  }

  return (
    <div className="app-shell">
      <Header date={getFormattedDate()} completedCount={completedCount} totalCount={todos.length} />
      <div className="dashboard-layout">
        <Sidebar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          counts={{ total: todos.length, active: activeCount, completed: completedCount }}
        />
        <main className="main-content">
          <section className="welcome-row">
            <div>
              <p className="welcome-kicker"><Sparkles size={14} aria-hidden="true" /> MAKE TODAY COUNT</p>
              <h1>Your day, in flow<span>.</span></h1>
              <p className="welcome-subtitle">A little focus goes a long way. What’s on your mind?</p>
            </div>
            <div className="today-badge">
              <span className="today-badge-icon"><CheckCircle2 size={18} aria-hidden="true" /></span>
              <span>
                <strong>{activeCount === 0 ? 'Fresh start' : `${activeCount} to do`}</strong>
                <small>{activeCount === 1 ? 'one task at a time' : 'you’ve got this'}</small>
              </span>
            </div>
          </section>

          <section className="stats-grid" aria-label="Task statistics">
            <StatsCard
              label="Total tasks"
              value={todos.length}
              caption="on your list"
              icon={ListChecks}
              tone="purple"
            />
            <StatsCard
              label="In progress"
              value={activeCount}
              caption={activeCount === 1 ? 'task to go' : 'tasks to go'}
              icon={CircleDashed}
              tone="blue"
            />
            <StatsCard
              label="Completed"
              value={completedCount}
              caption="and counting"
              icon={CheckCircle2}
              tone="green"
            />
          </section>

          <ProgressBar completed={completedCount} total={todos.length} />

          <section className="tasks-panel">
            <div className="tasks-heading">
              <div>
                <p className="eyebrow">YOUR WORKSPACE</p>
                <h2>{filterTitles[activeFilter]}</h2>
              </div>
              {completedCount > 0 && (
                <button className="clear-button" type="button" onClick={handleClearCompleted}>
                  <Trash2 size={15} aria-hidden="true" />
                  <span>Clear completed</span>
                </button>
              )}
            </div>
            <TodoForm onAdd={addTodo} />
            <TodoList
              todos={visibleTodos}
              filter={activeFilter}
              onToggle={toggleTodo}
              onDelete={handleDelete}
            />
            {todos.length > 0 && (
              <div className="list-footer">
                <span><span className="footer-check"><CheckCircle2 size={14} /></span>Every small win matters.</span>
                <span>{activeCount} {activeCount === 1 ? 'task' : 'tasks'} remaining</span>
              </div>
            )}
          </section>
          <footer className="page-footer">Made for a more mindful day <span>✦</span></footer>
        </main>
      </div>
    </div>
  )
}
