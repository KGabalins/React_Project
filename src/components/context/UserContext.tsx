import { createContext } from "react";
import { TodoType } from "../items/TodoItem";

export type UserType = {
  id: string;
  name: string;
  email: string;
  password: string;
  todoList: TodoType[];
};

export type UserCreationType = Omit<UserType, "id" | "todoList"> & {
  confirmEmail: string;
  confirmPassword: string;
};

export type UpdateEmailAttributes = {
  newEmail: string;
  confirmNewEmail: string;
  password: string;
};

type UserContextType = {
  currentUser: UserType | null;
  userDatabase: UserType[];
  loginUser: (email: string, password: string) => void;
  logoutUser: () => void;
  registerUser: (user: UserCreationType) => void;
  updateTodos: (todoList: TodoType[]) => void;
  updateUserEmail: (userData: UpdateEmailAttributes) => void;
};

export const UserContext = createContext({} as UserContextType);
