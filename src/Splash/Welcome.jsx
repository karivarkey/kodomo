import React from "react";
import { useNavigate } from "react-router-dom";
import welcome from "./../assets/splash/welcome.svg";
import signin from "./../assets/splash/signin.svg";
import heading from "./../assets/splash/heading.svg";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div className="max-h-dvh bg-[#F9ECCC] flex justify-center flex-col min-h-dvh">
      <div className="h-2/3 flex justify-center">
        <img src={welcome} className="p-8" />
      </div>
      <div className="bg-[#3F3F3F]  flex-grow rounded-t-xl flex flex-col justify-around ">
        <div className="text-[#FEF2E8] font-syne  text-2xl font-bold px-2">
          Let’s Get Started!
        </div>
        <div className="font-syne font-bold text-xs text-white px-3">
          AI-powered learning for teens, personalized and engaging. Unlock your
          potential with interactive lessons and discover a smarter way to
          learn!
        </div>
        <div className="flex flex-col justify-center items-center">
          <button
            className="shadow-[2px_3px_0px_0px_#FEF2E8] bg-secondary w-1/2 py-2 rounded-md border-2 border-black hover:shadow-black hover:transition-all east in out"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign up!
          </button>
        </div>
        <div className="flex justify-center items-center gap-2">
          <p className="font-syne font-bold text-xs text-white">
            Already have an account?
          </p>
          <button
            onClick={() => {
              navigate("/signin");
            }}
          >
            <p className="font-syne font-bold text-xs text-secondary hover:underline hover:transition-all east in out">
              Sign in
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
