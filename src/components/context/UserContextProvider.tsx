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
        updateLocalUser(user);
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
      const updatedDatabase = [...prevState, newUser];
      updateLocalUserDatabase(updatedDatabase);

      return updatedDatabase;
    });

    setCurrentUser(newUser);
    updateLocalUser(newUser);
  };

  const updateTodos = (todoList: TodoType[]) => {
    setCurrentUser((prevUser) => {
      if (prevUser) {
        const updatedUser: UserType = { ...prevUser, todoList };
        updateLocalUser(updatedUser);

        setUserDatabase((prevDatabase) => {
          const updatedDatabase = prevDatabase.map((user) => {
            if (user.id === prevUser.id) return updatedUser;

            return user;
          });

          updateLocalUserDatabase(updatedDatabase);

          return updatedDatabase;
        });

        return updatedUser;
      }

      return prevUser;
    });
  };

  const addTodo = (todo: TodoType) => {
    setCurrentUser((prevUser) => {
      if (prevUser) {
        const updatedUser: UserType = {
          ...prevUser,
          todoList: [...prevUser.todoList, todo],
        };
        updateLocalUser(updatedUser);

        setUserDatabase((prevDatabase) => {
          const updatedDatabase = prevDatabase.map((user) => {
            if (user.id === prevUser.id) return updatedUser;

            return user;
          });

          updateLocalUserDatabase(updatedDatabase);

          return updatedDatabase;
        });

        return updatedUser;
      }

      return prevUser;
    });
  };

  const updateUserName = (name: string) => {
    if (!name) throw new Error("All input fields must be filled out!");

    setCurrentUser((prevUser) => {
      if (prevUser) {
        const updatedUser = { ...prevUser, name };

        updateLocalUser(updatedUser);

        setUserDatabase((prevDatabase) => {
          const updatedDatabase = prevDatabase.map((user) => {
            if (user.id === updatedUser.id) return updatedUser;

            return user;
          });

          updateLocalUserDatabase(updatedDatabase);

          return updatedDatabase;
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

    if (password !== currentUser?.password) throw new Error("Wrong password!");

    if (newEmail !== confirmNewEmail) throw new Error("Emails do not match!");

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
          const updatedDatabase = prevDatabase.map((user) => {
            if (user.id === updatedUser.id) return updatedUser;

            return user;
          });

          updateLocalUserDatabase(updatedDatabase);

          return updatedDatabase;
        });

        updateLocalUser(updatedUser);

        return updatedUser;
      }

      return prevUser;
    });
  };

  const updateLocalUser = (updatedUser: UserType) => {
    localStorage.setItem("USER", JSON.stringify(updatedUser));
  };

  const updateLocalUserDatabase = (updatedDatabase: UserType[]) => {
    localStorage.setItem("USER_DB", JSON.stringify(updatedDatabase));
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
        updateUserName,
        addTodo,
      }}
    >
      <Outlet />
    </UserContext.Provider>
  );
};
