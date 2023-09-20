import {
  UpdateEmailAttributes,
  UserContext,
  UserCreationType,
  UserType,
} from "./UserContext";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { TodoType } from "../items/TodoItem";

export const UserContextProvider = () => {
  const [currentUser, setCurrentUser] = useState<UserType | null>(() => {
    const localUser = localStorage.getItem("USER");

    if (!localUser) return null;

    return JSON.parse(localUser);
  });

  const [userDatabase, setUserDatabase] = useState<UserType[]>(() => {
    const localDatabase = localStorage.getItem("USER_DB");

    if (!localDatabase) return [];

    return JSON.parse(localDatabase);
  });
  const navigate = useNavigate();

  const loginUser = (email: string, password: string) => {
    if (!email || !password)
      throw new Error("All input fields must be filled out!");

    userDatabase.map((user) => {
      if (user.email === email && user.password === password) {
        setCurrentUser(user);
        localStorage.setItem("USER", JSON.stringify(user));
        navigate("/");
      }

      return user;
    });

    throw new Error("Invalid user credentials!");
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem("USER");
    navigate("/login");
  };

  const registerUser = ({
    name,
    email,
    confirmEmail,
    password,
    confirmPassword,
  }: UserCreationType) => {
    if (!name || !email || !confirmEmail || !password || !confirmPassword)
      throw new Error("All inputs must be filled out!");

    if (email !== confirmEmail) throw new Error("Both emails must match!");

    if (password.length < 8)
      throw new Error("Password must be at least 8 characters!");

    if (password !== confirmPassword)
      throw new Error("Both passwords must match!");

    userDatabase.map((user) => {
      if (user.email === email)
        throw new Error("User with this email already exists!");

      return user;
    });

    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
      todoList: [],
    };

    setUserDatabase((prevState) => {
      const newDatabase = [...prevState, newUser];
      localStorage.setItem("USER_DB", JSON.stringify(newDatabase));

      return newDatabase;
    });

    setCurrentUser(newUser);
    localStorage.setItem("USER", JSON.stringify(newUser));
  };

  const updateTodos = (todoList: TodoType[]) => {
    setCurrentUser((prevUser) => {
      if (prevUser) {
        const updatedUser = { ...prevUser, todoList };
        localStorage.setItem("USER", JSON.stringify(updatedUser));

        setUserDatabase((prevDatabase) => {
          const newDatabase = prevDatabase.map((user) => {
            if (user.id === prevUser.id) return updatedUser;

            return user;
          });

          localStorage.setItem("USER_DB", JSON.stringify(newDatabase));

          return newDatabase;
        });

        return updatedUser;
      }

      return prevUser;
    });
  };

  const updateUserEmail = ({
    newEmail,
    confirmNewEmail,
    password,
  }: UpdateEmailAttributes) => {
    if (!newEmail || !confirmNewEmail || !password)
      throw new Error("All input fields must be filled out!");

    if (password !== currentUser?.password)
      throw new Error("Wrong password!");

    if (newEmail !== confirmNewEmail)
      throw new Error("Emails do not match!");

    if (newEmail === currentUser?.email)
      throw new Error("You already have this email!");

    userDatabase.map((user) => {
      if (user.email === newEmail)
        throw new Error("User with this email already exists!");

      return user;
    });

    setCurrentUser((prevUser) => {
      if (prevUser) {
        const updatedUser = { ...prevUser, email: newEmail };

        setUserDatabase((prevDatabase) => {
          const newDatabase = prevDatabase.map((user) => {
            if (user.id === updatedUser.id) return updatedUser;

            return user;
          });

          localStorage.setItem("USER_DB", JSON.stringify(newDatabase));

          return newDatabase;
        });

        localStorage.setItem("USER", JSON.stringify(updatedUser));

        return updatedUser;
      }

      return prevUser;
    });
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        userDatabase,
        loginUser,
        logoutUser,
        registerUser,
        updateTodos,
        updateUserEmail,
      }}
    >
      <Outlet />
    </UserContext.Provider>
  );
};
