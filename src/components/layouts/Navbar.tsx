import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import "../styles/Navbar.css";

export const Navbar = () => {
  const { currentUser, logoutUser } = useContext(UserContext);

  return (
    <>
      {currentUser ? (
        <nav className="navbar">
          <div className="navStart">
            <Link to="/" className="navbar-item">
              Home
            </Link>
            <Link to="/todo" className="navbar-item">
              Todo
            </Link>
            <Link to="/shop" className="navbar-item">
              Shop
            </Link>
            <Link to="/nasa" className="navbar-item">
              Nasa
            </Link>
          </div>
          <div className="navEnd">
            <span className="userInfo">{currentUser!.name}</span>
            <Link to="/profile" className="navbar-item">
              Profile
            </Link>
            <button className="logout-button" onClick={() => logoutUser()}>
              Logout
            </button>
          </div>
        </nav>
      ) : (
        <nav className="navbar">
          <div className="navStart">
            <Link to="/" className="navbar-item">
              Home
            </Link>
          </div>
          <div className="navEnd">
            <Link to="/login" className="navbar-item">
              Login
            </Link>
            <Link to="/register" className="navbar-item">
              Register
            </Link>
          </div>
        </nav>
      )}
      <Outlet />
    </>
  );
};
