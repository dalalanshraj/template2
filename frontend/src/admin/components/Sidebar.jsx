import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  MdDashboard,
  MdPeople,
  MdListAlt,
  MdAddBox,
  MdLogout,
} from "react-icons/md";

import api from "../../api/axios";

const Sidebar = () => {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:4015";

  useEffect(() => {
    fetchProfile();
    fetchUnreadCount();

    // Refresh count every 15 seconds
    const interval = setInterval(fetchUnreadCount, 15000);

    return () => clearInterval(interval);
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const res = await api.get("/inquiries/unread-count", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUnreadCount(res.data.count || 0);
    } catch (err) {
      console.error("Unread inquiry count error:", err);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await api.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  // Desktop sidebar links
  const desktopLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${isActive
      ? "bg-[#EBE8FF] text-black font-medium"
      : "text-black hover:bg-gray-200"
    }`;

  // Mobile bottom navigation links
  const mobileLinkClass = ({ isActive }) =>
    `flex flex-col items-center justify-center gap-1 min-w-[64px] flex-1 h-full px-1 transition-all duration-200 ${isActive
      ? "text-indigo-600"
      : "text-gray-600 hover:text-indigo-600"
    }`;

  return (
    <>
      {/* =====================================================
          DESKTOP SIDEBAR
          Visible from md and above
      ====================================================== */}
      <aside
        className="
          hidden
          md:flex
          fixed
          top-0
          left-0
          z-40
          w-64
          h-screen
          bg-[#F8F9FA]
          shadow-xl
          text-black
          p-4
          flex-col
        "
      >
        {/* Title */}
        <h2 className="text-2xl font-bold mb-6">
          Admin Panel
        </h2>

        {/* User Profile */}
        <div className="mb-6 border-b border-gray-400 pb-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500 bg-gray-700 shrink-0">
            {user?.photo ? (
              <img
                src={`${API_URL}${user.photo}`}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white font-bold">
                {user?.name?.charAt(0)?.toUpperCase() || "A"}
              </div>
            )}
          </div>

          <div className="min-w-0">
            <p className="text-xs text-gray-400">
              Logged in as
            </p>

            <h3 className="font-semibold text-sm truncate">
              {user?.name || "Admin"}
            </h3>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="space-y-2 flex flex-col flex-grow">

          <NavLink
            to="/admin/dashboard"
            className={desktopLinkClass}
          >
            <MdDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/inquiries"
            end
            className={desktopLinkClass}
          >
            <MdListAlt size={20} />

            <span className="flex-1">All Inquiries</span>

            {unreadCount > 0 && (
              <span className="min-w-6 h-6 px-1.5 flex items-center justify-center rounded-full bg-orange-500 text-white text-xs font-bold">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/admin/listings"
            end
            className={desktopLinkClass}
          >
            <MdListAlt size={20} />
            <span>Listings</span>
          </NavLink>



          {user?.role === "superadmin" && (
            <NavLink
              to="/admin/listings/property_add"
              className={desktopLinkClass}
            >
              <MdAddBox size={20} />
              <span>Add Listing</span>
            </NavLink>
          )}

          <NavLink
            to="/admin/gallery"
            className={desktopLinkClass}
          >
            <MdAddBox size={20} />
            <span>Gallery</span>
          </NavLink>
          <NavLink
            to="/admin/users"
            className={desktopLinkClass}
          >
            <MdPeople size={20} />
            <span>My Profile</span>
          </NavLink>
        </nav>

        {/* Desktop Logout */}
        <button
          onClick={handleLogout}
          className="
            flex
            items-center
            gap-3
            text-black
            hover:text-red-500
            hover:bg-red-50
            px-4
            py-2.5
            rounded-lg
            transition
            mt-6
            w-full
            text-left
          "
        >
          <MdLogout size={20} />
          <span>Logout</span>
        </button>
      </aside>

      {/* =====================================================
          MOBILE BOTTOM NAVIGATION
          Visible below md
      ====================================================== */}
      <nav
        className="
          md:hidden
          fixed
          bottom-0
          left-0
          right-0
          z-50
          h-[68px]
          bg-white
          border-t
          border-gray-200
          shadow-[0_-4px_20px_rgba(0,0,0,0.08)]
          px-1
          pb-[env(safe-area-inset-bottom)]
        "
      >
        <div className="h-full flex items-center overflow-x-auto scrollbar-hide">

          {/* Dashboard */}
          <NavLink
            to="/admin/dashboard"
            className={mobileLinkClass}
          >
            <MdDashboard size={22} />

            <span className="text-[10px] sm:text-[11px] font-medium whitespace-nowrap">
              Dashboard
            </span>
          </NavLink>

          <NavLink
            to="/admin/inquiries"
            end
            className={mobileLinkClass}
          >
            <span className="relative">
              <MdListAlt size={22} />

              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-3 min-w-4 h-4 px-1 flex items-center justify-center rounded-full bg-orange-500 text-white text-[9px] font-bold">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </span>

            <span className="text-[10px] sm:text-[11px] font-medium whitespace-nowrap">
              Inquiries
            </span>
          </NavLink>

          {/* Listings */}
          <NavLink
            to="/admin/listings"
            end
            className={mobileLinkClass}
          >
            <MdListAlt size={22} />

            <span className="text-[10px] sm:text-[11px] font-medium">
              Listings
            </span>
          </NavLink>

          {/* Profile */}
          <NavLink
            to="/admin/users"
            className={mobileLinkClass}
          >
            <MdPeople size={22} />

            <span className="text-[10px] sm:text-[11px] font-medium">
              Profile
            </span>
          </NavLink>

          {/* Add Listing */}
          {user?.role === "superadmin" && (
            <NavLink
              to="/admin/listings/property_add"
              className={mobileLinkClass}
            >
              <MdAddBox size={22} />

              <span className="text-[10px] sm:text-[11px] font-medium whitespace-nowrap">
                Add
              </span>
            </NavLink>
          )}

          {/* Gallery */}
          <NavLink
            to="/admin/gallery"
            className={mobileLinkClass}
          >
            <MdAddBox size={22} />

            <span className="text-[10px] sm:text-[11px] font-medium">
              Gallery
            </span>
          </NavLink>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="
              flex
              flex-col
              items-center
              justify-center
              gap-1
              min-w-[64px]
              flex-1
              h-full
              px-1
              text-gray-600
              hover:text-red-500
              transition
            "
          >
            <MdLogout size={22} />

            <span className="text-[10px] sm:text-[11px] font-medium">
              Logout
            </span>
          </button>

        </div>
      </nav>
    </>
  );
};

export default Sidebar;