import { useState, useRef, useEffect } from 'react';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import clsx from 'clsx';
import { Todo } from '@/types';
import styles from './TodoItem.module.css';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const handleEdit = () => {
    setEditValue(todo.text);
    setEditing(true);
  };

  const handleSave = () => {
    if (editValue.trim()) {
      onEdit(todo.id, editValue);
    }
    setEditing(false);
  };

  const handleCancel = () => {
    setEditValue(todo.text);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  };

  return (
    <li className={clsx(styles.item, todo.completed && styles.completed)}>
      <button
        className={clsx(styles.checkbox, todo.completed && styles.checkboxChecked)}
        onClick={() => onToggle(todo.id)}
        title={todo.completed ? 'Mark incomplete' : 'Mark complete'}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {todo.completed && <Check size={13} strokeWidth={3} />}
      </button>

      {editing ? (
        <div className={styles.editArea}>
          <input
            ref={inputRef}
            className={styles.editInput}
            value={editValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={200}
          />
          <button className={styles.saveBtn} onClick={handleSave} title="Save">
            <Check size={15} strokeWidth={2.5} />
          </button>
          <button className={styles.cancelBtn} onClick={handleCancel} title="Cancel">
            <X size={15} strokeWidth={2.5} />
          </button>
        </div>
      ) : (
        <span
          className={styles.text}
          onDoubleClick={handleEdit}
          title="Double-click to edit"
        >
          {todo.text}
        </span>
      )}

      {!editing && (
        <div className={styles.actions}>
          <button
            className={styles.editBtn}
            onClick={handleEdit}
            title="Edit"
            aria-label="Edit todo"
          >
            <Pencil size={15} strokeWidth={2} />
          </button>
          <button
            className={styles.deleteBtn}
            onClick={() => onDelete(todo.id)}
            title="Delete"
            aria-label="Delete todo"
          >
            <Trash2 size={15} strokeWidth={2} />
          </button>
        </div>
      )}
    </li>
  );
}
