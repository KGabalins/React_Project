import { Routes, BrowserRouter, Route } from "react-router-dom";
import { Login } from "./components/pages/Login";
import { Register } from "./components/pages/Register";
import "./components/styles/Main.css";
import { Home } from "./components/pages/Home";
import { Navbar } from "./components/layouts/Navbar";
import { Todo } from "./components/pages/Todo";
import { UserContextProvider } from "./components/context/UserContextProvider";
import { ProtectedRoute } from "./components/routes/ProtectedRoute";
import { GuestRoute } from "./components/routes/GuestRoutes";
import { Shop } from "./components/pages/Shop";
import { Profile } from "./components/pages/Profile";
import { NASA } from "./components/pages/NASA";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<UserContextProvider />}>
            <Route element={<Navbar />}>
              <Route path="/" element={<Home />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/todo" element={<Todo />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/nasa" element={<NASA />} />
              </Route>
              <Route element={<GuestRoute />}>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
