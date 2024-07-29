import React from "react";

const Send = ({ Message }) => {
  return (
    <div className="flex justify-end my-6">
      <div className="bg-[#FEF2E8]  p-2 w-fit mr-3 rounded-md border-2 border-black shadow-[-2px_2px_0px_0px_#000000]">
        {Message}
      </div>
    </div>
  );
};

export default Send;
