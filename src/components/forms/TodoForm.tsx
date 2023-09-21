import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { TodoType } from "../items/TodoItem";

export const TodoForm = () => {
  const { addTodo } = useContext(UserContext);
  const [newTodo, setNewTodo] = useState("");

  console.log("form rendered");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTodo) return;

    handleAddTodo(newTodo);

    setNewTodo("");
  };

  const handleAddTodo = (title: string) => {
    const newTodo: TodoType = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      editing: false,
    };

    addTodo(newTodo);
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
