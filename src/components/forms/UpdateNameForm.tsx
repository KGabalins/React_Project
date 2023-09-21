import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

export const UpdateNameForm = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [name, setName] = useState("");
  const { updateUserName } = useContext(UserContext);

  const handleEditName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      updateUserName(name);
      setErrorMsg(" - Name updated successfully!");
      setName("");
    } catch (error: any) {
      setErrorMsg(` - ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleEditName}>
      <div className="editDetails">
        <label htmlFor="newName">
          New name<span>{errorMsg}</span>
        </label>
        <input
          type="text"
          id="newName"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="buttonDiv">
          <button type="submit">Ok</button>
        </div>
      </div>
    </form>
  );
};
