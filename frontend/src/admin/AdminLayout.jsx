import React from "react";
import Sidebar from "./components/Sidebar";

function AdminLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-gray-100 overflow-x-hidden">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <Sidebar />


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main
        className="
          min-h-screen
          min-w-0

          w-full

          ml-0
          pb-[82px]

          lg:ml-64
          lg:w-[calc(100%-16rem)]
          lg:pb-0
        "
      >
        <div
          className="
            w-full
            min-w-0
            max-w-full

            px-3
            py-4

            sm:px-4
            sm:py-5

            md:px-5
            md:py-6

            lg:px-6
            lg:py-6
          "
        >
          {children}
        </div>
      </main>

    </div>
  );
}

export default AdminLayout;