import { useEffect, useState } from 'react'

const STORAGE_KEY = 'taskflow-todos'

function loadTodos() {
  try {
    const storedTodos = window.localStorage.getItem(STORAGE_KEY)
    if (!storedTodos) return []

    const parsedTodos = JSON.parse(storedTodos)
    if (!Array.isArray(parsedTodos)) {
      throw new TypeError('Saved tasks are not in the expected format.')
    }

    return parsedTodos.filter((todo) => {
      if (
        !todo ||
        typeof todo.id !== 'string' ||
        typeof todo.title !== 'string' ||
        typeof todo.completed !== 'boolean'
      ) {
        return false
      }

      return (
        todo.createdAt === undefined ||
        (typeof todo.createdAt === 'string' && Number.isFinite(Date.parse(todo.createdAt)))
      )
    })
  } catch (error) {
    console.error('TaskFlow could not load saved tasks from local storage.', error)
    return []
  }
}

function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export default function useTodos() {
  const [todos, setTodos] = useState(loadTodos)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    } catch (error) {
      console.error('TaskFlow could not save tasks to local storage.', error)
    }
  }, [todos])

  function addTodo(title) {
    const trimmedTitle = title.trim()
    if (!trimmedTitle) return

    setTodos((currentTodos) => [
      {
        id: createId(),
        title: trimmedTitle,
        completed: false,
        createdAt: new Date().toISOString(),
      },
      ...currentTodos,
    ])
  }

  function toggleTodo(id) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id))
  }

  function clearCompleted() {
    setTodos((currentTodos) => currentTodos.filter((todo) => !todo.completed))
  }

  return { todos, addTodo, toggleTodo, deleteTodo, clearCompleted }
}
