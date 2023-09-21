import { UpdateEmailAttributes, UserContext } from "../context/UserContext";
import { useState, useContext } from "react";

export const UpdateEmailForm = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [emailFormAttributes, setEmailFormAttributes] =
    useState<UpdateEmailAttributes>({
      newEmail: "",
      confirmNewEmail: "",
      password: "",
    });
  const { updateUserEmail } = useContext(UserContext);

  const handleEditEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      updateUserEmail(emailFormAttributes);
      setErrorMsg(" - Email updated successfully!");
      setEmailFormAttributes({
        newEmail: "",
        confirmNewEmail: "",
        password: "",
      });
    } catch (error: any) {
      setErrorMsg(` - ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleEditEmail}>
      <div className="editDetails">
        <label htmlFor="newEmail">
          New email<span>{errorMsg}</span>
        </label>
        <input
          type="email"
          id="newEmail"
          value={emailFormAttributes.newEmail}
          onChange={(e) =>
            setEmailFormAttributes((prevState) => {
              return { ...prevState, newEmail: e.target.value };
            })
          }
        />
        <label htmlFor="confirmNewEmail">Confirm new email</label>
        <input
          type="email"
          id="confirmNewEmail"
          value={emailFormAttributes.confirmNewEmail}
          onChange={(e) =>
            setEmailFormAttributes((prevState) => {
              return {
                ...prevState,
                confirmNewEmail: e.target.value,
              };
            })
          }
        />
        <label htmlFor="currentEmail">Password</label>
        <input
          type="password"
          id="currentPassword"
          value={emailFormAttributes.password}
          onChange={(e) =>
            setEmailFormAttributes((prevState) => {
              return { ...prevState, password: e.target.value };
            })
          }
        />
        <div className="buttonDiv">
          <button type="submit">Update</button>
        </div>
      </div>
    </form>
  );
};
