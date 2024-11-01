// components/SurveyEdit/templates/Quote.js
import React from "react";
import { Icon } from "@iconify/react";

const Quote = () => {
  return (
    <div
      className="flex flex-col items-center text-gray-700 p-6 font-inter relative bg-cover bg-center rounded-lg"
      style={{
        backgroundImage: 'url("/path/to/your/background-image.jpg")',
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Quote Text */}
      <div className="text-center mb-6">
        <Icon
          icon="mdi:format-quote-open"
          className="text-4xl text-gray-600 inline-block mb-2"
        />
        <h1 className="text-2xl font-bold text-black mb-2">
          Selanjutnya, Anda akan menceritakan pengalaman Anda!
        </h1>
      </div>

      {/* Next Button */}
      <button
        className="w-full py-2 bg-red-600 text-white text-lg font-semibold rounded-lg flex justify-center items-center"
        onClick={() => alert("Lanjut ke bagian berikutnya")}
      >
        Lanjut
      </button>
      <p className="text-sm text-gray-500 mt-2">atau tekan Enter ↵</p>
    </div>
  );
};

export default Quote;
