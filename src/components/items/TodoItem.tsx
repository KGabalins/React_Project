import { useState } from "react";

export type TodoType = {
  id: string;
  title: string;
  completed: boolean;
  editing: boolean;
};

type TodoItemProps = {
  todo: TodoType;
  completeTodo: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, title: string) => void;
};

export const TodoItem = ({
  todo,
  completeTodo,
  deleteTodo,
  editTodo,
}: TodoItemProps) => {
  const [updatedTodo, setUpdatedTodo] = useState(todo.title);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") document.getElementById(`ok-${todo.id}`)?.click();
  };

  return (
    <>
      <div key={todo.id} className="todoItem">
        {!todo.editing ? (
          <>
            <label style={todo.completed ? {textDecoration:"line-through"} : {textDecoration:"none"} }>
              <input
                type="checkbox"
                className="todoCheckbox"
                checked={todo.completed}
                onChange={(e) => completeTodo(todo.id, e.target.checked)}
              />
              {todo.title}
            </label>
            <button type="button" onClick={() => editTodo(todo.id, todo.title)}>
              Edit
            </button>
            <button type="button" onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              value={updatedTodo}
              autoFocus
              onKeyDown={handleKeyDown}
              onChange={(e) => setUpdatedTodo(e.target.value)}
            ></input>
            <button
              id={`ok-${todo.id}`}
              onClick={() => editTodo(todo.id, updatedTodo)}
            >
              Ok
            </button>
            <button onClick={() => editTodo(todo.id, todo.title)}>
              Cancel
            </button>
          </>
        )}
      </div>
    </>
  );
};
