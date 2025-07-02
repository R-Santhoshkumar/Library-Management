import React from "react";
import TopBar from "../components/TopBar.jsx";
//import BookInfoBar from "../components/BookInfoBar.jsx"; className="m-0 p-0 box-border font-sans max-h-screen bg-blue1"

import { Outlet } from "react-router-dom";


function Layout() {
  return (
    <div className="m-0 p-0 box-border font-sans  bg-blue1 w-full min-h-screen h-full flex flex-1 flex-col fixed ">
      <div className="w-full h-auto sticky top-0 left-0 ">
        <TopBar />
      </div>
      <div className="w-full h-full flex flex-1  flex-row gap-3 p-5 overflow-auto ">
        <div className="w-full  flex-1 flex-col  ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
