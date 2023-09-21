import { UserContext } from "../context/UserContext";
import { UpdateEmailForm } from "../forms/UpdateEmailForm";
import { UpdateNameForm } from "../forms/UpdateNameForm";
import Popup from "../html/Popup";
import "../styles/Profile.css";
import { useContext } from "react";

export const Profile = () => {
  const { currentUser } = useContext(UserContext);

  console.log("I rendered");

  return (
    <div className="page">
      <h2 className="pageTitle">Profile page</h2>
      <div className="profileDiv">
        <h3>Profile details</h3>
        <div className="detailDiv">
          <p className="detailInfo">Name: </p>
          <span>{currentUser?.name}</span>
          <Popup id="editName" title="Update Name" btnText="Edit">
            <UpdateNameForm />
          </Popup>
        </div>
        <div className="detailDiv">
          <p className="detailInfo">Email: </p>
          <span>{currentUser?.email}</span>
          <Popup id="editEmail" title="Update Email" btnText="Edit">
            <UpdateEmailForm />
          </Popup>
        </div>
        <div className="detailDiv">
          <p className="detailInfo">Total Todos: </p>
          <span>{currentUser?.todoList.length}</span>
        </div>
      </div>
    </div>
  );
};
