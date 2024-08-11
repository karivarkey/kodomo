import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import menu from "../assets/Home/menu.svg";
import search from "../assets/Home/search.svg";
import line from "../assets/Home/line.svg";

import profile from "./../assets/Home/Buttons/profile.svg";
import pfp from "./../assets/Profile/profile.svg";
import home from "./../assets/Home/Buttons/home.svg";
import chat from "./../assets/Home/Buttons/chat.svg";
import app from "../Api/Firebase";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Handle successful logout, e.g., redirect to login page
      toast("Logged out successfully!");
      navigate("/");
    } catch (error) {
      // Handle logout error
      toast.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        console.log(user.displayName); // Access displayName from the user object
        setLoading(false);
      } else {
        toast.error("Please login Again");
        navigate("/signin");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-dvh bg-primary ">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-white animate-spin dark:text-white fill-secondary"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-start bg-primary min-h-dvh flex-grow">
        {/* Header */}
        <div className="bg-[#FEF2E8] min-h-16 flex justify-between items-center border-b-2 border-black">
          <img src={menu} className="max-w-10 pl-3" />
          <div className="font-bold font-mont">KODOMO</div>
          <div></div>
        </div>
        {/* Profile Image Section */}
        <div className="flex-col flex flex-grow">
          <div className="min-h-28"></div>
          <div className="flex flex-col flex-1 bg-[#FFFFFF4D] rounded-2xl items-center justify-center relative">
            <img
              src={pfp}
              alt=""
              className="absolute -top-20 w-40 h-40 object-cover" // Adjusted size and positioning for better aesthetics
            />
            <div className="flex flex-col flex-1 py-28  text-center gap-28">
              <div className="font-syne text-2xl font-bold">
                {currentUser?.displayName}{" "}
                {/* Optional chaining to prevent errors */}
              </div>
              <div className="flex flex-col gap-2">
                <button
                  className="font-inter text-xl text-[#676262] font-semibold"
                  onClick={() => {
                    navigate("/interests");
                  }}
                >
                  Edit Interests
                </button>
                <div className="h-0.5 bg-[#E4D7B5]"></div>
                <button
                  className="font-inter text-xl text-[#676262] font-semibold"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Navigation Bar */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 inline-flex mx-auto bg-primary border-2 border-black w-11/12 rounded-full h-16 shadow-[3px_5px_0px_0px_#000000] justify-around">
          {/* Profile Icon */}
          <div className="flex flex-col justify-center items-center">
            <img src={profile} className="w-6 h-6" />
            <div className="w-1/2 h-1 mt-2 bg-black"></div>
          </div>

          {/* Home Icon with Underline */}
          <div className="flex flex-col justify-center items-center relative">
            <button
              onClick={() => {
                navigate("/home");
              }}
            >
              <img src={home} className="w-6 h-6 relative z-10" />
            </button>
          </div>

          {/* Chat Icon */}
          <div className="flex flex-col justify-center items-center">
            <button
              onClick={() => {
                navigate("/home/chat", { state: { context: "General Chat" } });
              }}
            >
              <img src={chat} className="w-6 h-6" />
            </button>
          </div>
        </div>
        <Toaster
          position="bottom-center"
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            className: "",
            duration: 5000,
            style: {
              background: "#E582BE",
              color: "#FAEDCD",
            },
            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
      </div>
    );
  }
};

export default Profile;
