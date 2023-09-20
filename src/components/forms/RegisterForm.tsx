import { UserContext } from "../context/UserContext";
import "../styles/AuthorizationForms.css";
import { useContext, useState } from "react";

type RegisterFormAttributes = {
  name: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
};

export const RegisterForm = () => {
  const [registerFormAttributes, setRegisterFormAttributes] =
    useState<RegisterFormAttributes>({} as RegisterFormAttributes);
  const { registerUser } = useContext(UserContext);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      registerUser(registerFormAttributes);
    } catch (error: any) {
      document.getElementById("errorSpan")!.innerText = ` - ${error.message}`;
    }
  };

  return (
    <div className="authorizationDiv">
      <form onSubmit={onSubmit} className={`form-primary`}>
        <span>Register Form</span>
        <label htmlFor="nameInput">
          Name<span id="errorSpan"></span>
        </label>
        <input
          id="nameInput"
          type="text"
          value={registerFormAttributes.name}
          onChange={(e) =>
            setRegisterFormAttributes((prevState) => {
              return { ...prevState, name: e.target.value };
            })
          }
        ></input>
        <label htmlFor="emailInput">Email</label>
        <input
          id="emailInput"
          type="email"
          value={registerFormAttributes.email}
          onChange={(e) =>
            setRegisterFormAttributes((prevState) => {
              return { ...prevState, email: e.target.value };
            })
          }
        ></input>
        <label htmlFor="confirmEmailInput">Confirm Email</label>
        <input
          id="confirmEmailInput"
          type="email"
          value={registerFormAttributes.confirmEmail}
          onChange={(e) =>
            setRegisterFormAttributes((prevState) => {
              return { ...prevState, confirmEmail: e.target.value };
            })
          }
        ></input>
        <label htmlFor="passwordInput">Password</label>
        <input
          id="passwordInput"
          type="password"
          value={registerFormAttributes.password}
          onChange={(e) =>
            setRegisterFormAttributes((prevState) => {
              return { ...prevState, password: e.target.value };
            })
          }
        ></input>
        <label htmlFor="confirmPasswordInput">Confirm Password</label>
        <input
          id="confirmPasswordInput"
          type="password"
          value={registerFormAttributes.confirmPassword}
          onChange={(e) =>
            setRegisterFormAttributes((prevState) => {
              return { ...prevState, confirmPassword: e.target.value };
            })
          }
        ></input>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
