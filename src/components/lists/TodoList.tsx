import { TodoItem, TodoType } from "../items/TodoItem";

export type TodoListProps = {
  todoList: TodoType[];
  completeTodo: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, titel: string) => void;
};

export const TodoList = ({
  todoList,
  completeTodo,
  deleteTodo,
  editTodo,
}: TodoListProps) => {
  return (
    <div className="todoList">
      {todoList.length === 0 ? <span>Your todo list is empty!</span> : todoList.map((todo) => {
        return (
          <TodoItem
            todo={todo}
            key={todo.id}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        );
      })}
    </div>
  );
};
