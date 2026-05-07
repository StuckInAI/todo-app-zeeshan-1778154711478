import { useTodos } from '@/hooks/useTodos';
import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';
import TodoFooter from '@/components/TodoFooter';
import styles from './TodoPage.module.css';

export default function TodoPage() {
  const {
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
  } = useTodos();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>My Todos</h1>
          <p className={styles.subtitle}>Stay organized, get things done.</p>
        </header>

        <div className={styles.card}>
          <TodoInput onAdd={addTodo} />

          {todos.length > 0 && (
            <>
              <div className={styles.toggleAllRow}>
                <button
                  className={styles.toggleAllBtn}
                  onClick={toggleAll}
                  title="Toggle all"
                >
                  {todos.every(t => t.completed) ? '✓ All done!' : `Toggle all (${todos.length})`}
                </button>
              </div>

              <TodoList
                todos={filteredTodos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />

              <TodoFooter
                activeCount={activeCount}
                completedCount={completedCount}
                filter={filter}
                onFilterChange={setFilter}
                onClearCompleted={clearCompleted}
              />
            </>
          )}

          {todos.length === 0 && (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>📝</span>
              <p className={styles.emptyText}>No todos yet. Add one above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
