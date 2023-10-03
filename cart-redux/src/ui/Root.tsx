import { Outlet } from "react-router-dom";
import { Nav } from "./Nav";
import "../App.css";

export const Root = () => (
  <>
    <Nav />
    <div className="app-container">
      <Outlet />
    </div>
  </>
);
