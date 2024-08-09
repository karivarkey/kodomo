import React from "react";

const DesktopWarningPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 ">
      <div className="bg-primary p-6 rounded-lg shadow-lg text-center">
        <p className="mb-4 text-gray-800 font-syne font-bold">
          This website is designed for mobile devices. Please switch to a mobile
          device for the best experience.
        </p>
        <button
          className="px-6 py-2 font-medium border-2 border-black bg-secondary text-black font-syne w-fit transition-all shadow-lg rounded-md text-lg hover:shadow-xl hover:border-black hover:transition-all"
          onClick={onClose}
        >
          Ok!
        </button>
      </div>
    </div>
  );
};

export default DesktopWarningPopup;
