import { useContext, useState } from "react";
import "../styles/AuthorizationForms.css";
import { UserContext } from "../context/UserContext";

type LoginFormAttributes = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const [loginFormAttributes, setLoginFormAttributes] =
    useState<LoginFormAttributes>({email: "", password: ""});
  const { loginUser } = useContext(UserContext);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = loginFormAttributes;

    try {
      loginUser(email, password);
    } catch (error: any) {
      document.getElementById("errorSpan")!.innerText = ` - ${error.message}`;
    }
  };

  return (
    <div className="authorizationDiv">
      <form onSubmit={onSubmit} className={`form-primary`}>
        <span>Login Form</span>
        <label htmlFor="emailInput">
          Email<span id="errorSpan"></span>
        </label>
        <input
          id="emailInput"
          type="email"
          value={loginFormAttributes?.email}
          onChange={(e) =>
            setLoginFormAttributes((prevState) => {
              return { ...prevState, email: e.target.value };
            })
          }
        ></input>
        <label htmlFor="passwordInput">Password</label>
        <input
          id="passwordInput"
          type="password"
          value={loginFormAttributes?.password}
          onChange={(e) =>
            setLoginFormAttributes((prevState) => {
              return { ...prevState, password: e.target.value };
            })
          }
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
