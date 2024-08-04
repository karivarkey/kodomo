import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import phone from "./../assets/splash/phone.svg";
import DesktopWarningPopup from "./DesktopWarningPopup";

const Splash = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const [showPopup, setShowPopup] = useState(isDesktop);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setShowPopup(isDesktop);
  }, [isDesktop]);

  return (
    <div className="bg-splash bg-cover bg-center min-h-screen w-screen overflow-hidden bg-primary flex flex-col justify-center items-center gap-8">
      {showPopup && <DesktopWarningPopup onClose={() => setShowPopup(false)} />}
      <div>
        <img src={phone} alt="Phone" />
      </div>
      <div className="flex text-center px-3 flex-col justify-center items-center gap-8">
        <div className="bg-secondary font-revalia text-xs p-2.5 rounded-md text-center border-2 border-black leading-4">
          Kodomo's AI-powered learning is the way, To unlock your potential and
          seize the day!
        </div>
        <div className="flex items-center justify-center">
          <button
            className="px-6 py-2 font-medium border-2 border-black bg-secondary text-black font-syne w-fit transition-all shadow-lg rounded-md text-lg hover:shadow-xl hover:border-black hover:transition-all"
            onClick={() => {
              navigate("/welcome");
            }}
          >
            Start your adventure!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Splash;
