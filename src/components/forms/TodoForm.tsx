import { useState } from "react";

type TodoFormProps = {
  addTodo: (title: string) => void;
};

export const TodoForm = ({ addTodo }: TodoFormProps) => {
  const [newTodo, setNewTodo] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTodo) return;

    addTodo(newTodo);

    setNewTodo("");
  };

  return (
    <>
      <form className="todoForm" onSubmit={onSubmit}>
        <label htmlFor="todoInput">New Todo</label>
        <input
          type="text"
          id="todoInput"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
};
