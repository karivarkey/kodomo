import React from "react";
import image from "./assets/error.png";
const Error = () => {
  return (
    <div className="flex items-center justify-center flex-col bg-primary min-h-dvh">
      <img src={image} />
      <div className="flex flex-col">
        <p className="font-syne font-semibold text-md text-center px-8 flex flex-col">
          We're sorry but that's an unknown place Kodomo couldn't find it!
          <div>
            <a href="/" className="text-blue-900">
              Click here
            </a>{" "}
            to to go to splash
          </div>
        </p>
      </div>
    </div>
  );
};

export default Error;
