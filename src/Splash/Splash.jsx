import React from "react";
import { useNavigate } from "react-router-dom";
import phone from "./../assets/splash/phone.svg";

const Splash = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-splash bg-cover bg-center min-h-dvh max-h-dvh w-screen overflow-hidden bg-primary flex flex-col justify-center items-center gap-8">
      <div>
        <img src={phone} />
      </div>
      <div className="flex text-center px-3 flex-col justify-center items-center gap-8">
        <div className="bg-secondary font-revalia text-xs p-2.5 rounded-md text-center border-2 border-black leading-4">
          Kodomo's AI-powered learning is the way, To unlock your potential
          and seize the day!
        </div>
        <div className="flex items-center justify-center">
          <button
            className="px-6 py-2 font-medium border-2 border-black bg-secondary text-black font-syne w-fit transition-all shadow-[5px_5px_0px_black]   rounded-md text-lg  hover:shadow-white hover:border-black hover:transition-all east in out"
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
