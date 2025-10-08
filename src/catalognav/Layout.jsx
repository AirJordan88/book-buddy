import { Outlet } from "react-router";
import Navbar from "./RouterNavbar";

/** The shared layout for all pages of the app */
export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
