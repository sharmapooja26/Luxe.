import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyOrdersPage from "./MyOrdersPage";

const Profile = () => {
  const navigate = useNavigate();

  // Protect profile page
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* LEFT SECTION */}

          <div className="w-full md:w-1/3 lg:w-1/4 bg-white border rounded-lg p-6 shadow-sm">
            <h1 className="text-2xl font-semibold mb-2">Pooja Sharma</h1>

            <p className="text-gray-500 mb-6">Pooja@example.com</p>

            <button
              onClick={handleLogout}
              className="w-full border border-black text-black py-2 rounded-md hover:bg-black hover:text-white transition"
            >
              Logout
            </button>
          </div>

          {/* RIGHT SECTION */}

          <div className="w-full md:w-2/3 lg:w-3/4">
            <MyOrdersPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
