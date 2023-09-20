import { useState, useContext, useEffect } from "react";
import { TodoList } from "../lists/TodoList";
import { TodoForm } from "../forms/TodoForm";
import { UserContext } from "../context/UserContext";
import { TodoType } from "../items/TodoItem";
import "../styles/Todo.css"

export const Todo = () => {
  const { currentUser, updateTodos } = useContext(UserContext);
  const [todos, setTodos] = useState<TodoType[]>(currentUser!.todoList);

  useEffect(() => {
    updateTodos(todos);
  }, [todos]);

  const addTodo = (title: string) => {
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        { id: crypto.randomUUID(), title, completed: false, editing: false },
      ];
    });
  };

  const completeTodo = (id: string, completed: boolean) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) todo.completed = completed;

        return todo;
      });
    });
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  const editTodo = (id: string, title: string) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          todo.editing = !todo.editing
          todo.title = title
        };

        return todo;
      });
    });
  };

  return (
    <div className="page">
      <TodoForm addTodo={addTodo} />
      <TodoList
        todoList={todos}
        completeTodo={completeTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />
    </div>
  );
};
