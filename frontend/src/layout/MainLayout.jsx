import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout({ children }) {

  const [sidebarAberta, setSidebarAberta] = useState(true);

  return (
    <div className="flex">

      <Sidebar 
        aberta={sidebarAberta} 
        setAberta={setSidebarAberta} 
      />

      <div className="flex-1 min-h-screen bg-gray-100">

        <Navbar />

        <div className="p-6">
          {children}
        </div>

      </div>

    </div>
  );
}

export default MainLayout;