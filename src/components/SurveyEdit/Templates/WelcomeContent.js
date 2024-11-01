import React from "react";

const WelcomeContent = ({ textColor, buttonColor, buttonText }) => (
  <div className="text-center font-inter">
    <h1 className="text-[32px] font-bold mb-2" style={{ color: textColor }}>
      Selamat datang
    </h1>
    <p className="mb-4 font-normal text-[18px]" style={{ color: textColor }}>
      Mari mengisi survei ini!
    </p>
    <button
      className="py-2 px-6 rounded-lg text-lg"
      style={{ backgroundColor: buttonColor, color: "#FFFFFF" }}
    >
      {buttonText}
    </button>
  </div>
);

export default WelcomeContent;
