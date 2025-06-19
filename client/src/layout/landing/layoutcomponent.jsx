import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Navbar from "./navbar";
import { useEffect } from "react";

const Layoutcomponent = () => {
  useEffect(() => {
    console.log("Layoutcomponent mounted");
  }, []);
  return (
    <div className="max-w-8xl">

      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layoutcomponent;
