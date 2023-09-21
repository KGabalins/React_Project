import { UserContext, UserType } from "../context/UserContext";
import { TodoItem } from "../items/TodoItem";
import { useContext } from "react";

export const TodoList = () => {
  const { currentUser, updateTodos } = useContext(UserContext);
  const { todoList } = currentUser as UserType;

  console.log("List rendered")

  const completeTodo = (id: string, completed: boolean) => {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === id) todo.completed = completed;

      return todo;
    });

    updateTodos(updatedTodos);
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todoList.filter((todo) => todo.id !== id);

    updateTodos(updatedTodos);
  };

  const editTodo = (id: string, title: string) => {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === id) {
        todo.editing = !todo.editing;
        todo.title = title;
      }

      return todo;
    });

    updateTodos(updatedTodos);
  };

  return (
    <div className="todoList">
      {todoList.length === 0 ? (
        <span>Your todo list is empty!</span>
      ) : (
        todoList.map((todo) => {
          return (
            <TodoItem
              todo={todo}
              key={todo.id}
              completeTodo={completeTodo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          );
        })
      )}
    </div>
  );
};
