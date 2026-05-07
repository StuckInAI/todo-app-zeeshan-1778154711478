import { useState, useCallback } from 'react';
import { Todo, FilterType } from '@/types';

const STORAGE_KEY = 'todo-app-items';

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Todo[];
  } catch {
    // ignore
  }
  return [];
}

function saveTodos(todos: Todo[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const [filter, setFilter] = useState<FilterType>('all');

  const updateAndSave = useCallback((updater: (prev: Todo[]) => Todo[]) => {
    setTodos(prev => {
      const next = updater(prev);
      saveTodos(next);
      return next;
    });
  }, []);

  const addTodo = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newTodo: Todo = {
      id: generateId(),
      text: trimmed,
      completed: false,
      createdAt: Date.now(),
    };
    updateAndSave(prev => [newTodo, ...prev]);
  }, [updateAndSave]);

  const toggleTodo = useCallback((id: string) => {
    updateAndSave(prev =>
      prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  }, [updateAndSave]);

  const deleteTodo = useCallback((id: string) => {
    updateAndSave(prev => prev.filter(t => t.id !== id));
  }, [updateAndSave]);

  const editTodo = useCallback((id: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    updateAndSave(prev =>
      prev.map(t => t.id === id ? { ...t, text: trimmed } : t)
    );
  }, [updateAndSave]);

  const clearCompleted = useCallback(() => {
    updateAndSave(prev => prev.filter(t => !t.completed));
  }, [updateAndSave]);

  const toggleAll = useCallback(() => {
    updateAndSave(prev => {
      const allDone = prev.every(t => t.completed);
      return prev.map(t => ({ ...t, completed: !allDone }));
    });
  }, [updateAndSave]);

  const filteredTodos = todos.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.filter(t => t.completed).length;

  return {
    todos,
    filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    toggleAll,
    activeCount,
    completedCount,
  };
}
