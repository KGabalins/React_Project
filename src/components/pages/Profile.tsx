import { UpdateEmailAttributes, UserContext } from "../context/UserContext";
import { Popup } from "../items/Popup";
import "../styles/Profile.css";
import { useContext, useState } from "react";

export const Profile = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [emailFormAttributes, setEmailFormAttributes] =
    useState<UpdateEmailAttributes>({
      newEmail: "",
      confirmNewEmail: "",
      password: "",
    });
  const { currentUser, updateUserEmail } = useContext(UserContext);

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
    <div className="page">
      <h2 className="pageTitle">Profile page</h2>
      <div className="profileDiv">
        <h3>Profile details</h3>
        <div className="detailDiv">
          <p className="detailInfo">Name: </p>
          <span>{currentUser?.name}</span>
          <Popup id="editName" title="Update Name" btnText="Edit">
            <form>
              <div className="editDetails">
                <label htmlFor="newName">New name</label>
                <input type="text" id="newName" />
                <div className="buttonDiv">
                  <button type="submit">Ok</button>
                </div>
              </div>
            </form>
          </Popup>
        </div>
        <div className="detailDiv">
          <p className="detailInfo">Email: </p>
          <span>{currentUser?.email}</span>
          <Popup id="editEmail" title="Update Email" btnText="Edit">
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
          </Popup>
        </div>
        <div className="detailDiv">
          <p className="detailInfo">Total Todos: </p>
          <span>{currentUser?.todoList.length}</span>
        </div>
      </div>

      {/* <form className="popup" id="emailPopup" onSubmit={handleEditEmail}>
        <span className="title">Update email</span>
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
                return { ...prevState, confirmNewEmail: e.target.value };
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
            <button type="button" onClick={showEmailPopup}>
              Cancel
            </button>
          </div>
        </div>
      </form> */}

      {/* <form className="popup" id="namePopup">
        <span className="title">Edit name</span>
        <div className="editDetails">
          <label htmlFor="newName">New name</label>
          <input type="text" id="newName" />
          <div className="buttonDiv">
            <button type="submit">Ok</button>
            <button onClick={showNamePopup}>Cancel</button>
          </div>
        </div>
      </form> */}
    </div>
  );
};
