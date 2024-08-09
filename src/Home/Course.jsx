import React from "react";
import next from "./../assets/Home/Buttons/next.svg";
import { useNavigate } from "react-router-dom";
const Cards = ({ title, color }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundColor: `${color}`,
        boxShadow: `0px -7px 0px 0px black`,
      }}
      className="flex flex-grow min-h-28  border-2 border-black rounded-md "
    >
      <div className="bg-[#FEF2E8] flex justify-end flex-col w-2/3">
        <div className="font-syne font-bold text-sm p-2 text-wrap break-words">
          {title}
        </div>
      </div>

      <button
        className="flex  items-center flex-col justify-center w-1/4   "
        onClick={() => {
          navigate("/home/chat", { state: { context: title } });
        }}
      >
        <img src={next} />
      </button>
    </div>
  );
};

export default Cards;
