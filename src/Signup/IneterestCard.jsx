import React from "react";

//make the card accept props from the parent component
//use the props to render the title of the card
const IneterestCard = ({ title, interetsts, setInterests, values }) => {
  const array = Object.values(values);

  return (
    <div className="bg-[#FFDADA] rounded-xl min-h-32 border-2 border-black flex flex-col  pb-5">
      <p className="font-mont font-black text-base p-3"> {title}</p>
      <div className="flex flex-wrap gap-5 px-1 justify-center py-1 items-center">
        {array.map((item, key) => (
          <button
            className={`text-xs rounded-xl p-2 min-w-20 text-center font-black font-mont border-2 border-black ${
              interetsts.includes(item)
                ? "bg-secondary shadow-[0px_5px_0px_0px_#FFFFFF]"
                : "bg-secondary shadow-[0px_5px_0px_0px_#000000]"
            }`}
            key={key}
            onClick={() => {
              if (interetsts.includes(item)) {
                setInterests(interetsts.filter((i) => i !== item));
              } else {
                setInterests([...interetsts, item]);
              }
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default IneterestCard;
