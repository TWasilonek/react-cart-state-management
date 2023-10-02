import { Outlet } from "react-router-dom";
import { Nav } from "./Nav";

export const Root = () => (
  <>
    <Nav />
    <Outlet />
  </>
);
