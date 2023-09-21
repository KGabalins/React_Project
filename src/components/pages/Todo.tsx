import { TodoList } from "../lists/TodoList";
import { TodoForm } from "../forms/TodoForm";
import "../styles/Todo.css";

export const Todo = () => {
  return (
    <div className="page">
      <TodoForm />
      <TodoList />
    </div>
  );
};
