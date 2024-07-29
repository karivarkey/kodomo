import React from "react";

const Cards = ({ title, color }) => {
  return (
    <div
      style={{
        backgroundColor: `${color}`,
        boxShadow: `7px 7px 0px 0px ${color}`,
      }}
      className="flex flex-grow min-h-28 min-w-52 border-2 border-black rounded-md "
    >
      <div className="bg-[#FEF2E8] flex justify-end flex-col w-2/3">
        <div className="font-syne font-bold text-sm p-2 text-wrap break-words">
          {title}
        </div>
      </div>

      <div className="flex flex-col justify-start pl-2 pt-1"></div>
    </div>
  );
};

export default Cards;
