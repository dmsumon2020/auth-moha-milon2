import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <main className="w-10/12 mx-auto">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Root;
