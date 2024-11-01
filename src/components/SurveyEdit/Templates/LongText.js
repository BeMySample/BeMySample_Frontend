// components/SurveyEdit/templates/LongText.js
import React from "react";
import { Icon } from "@iconify/react";

const LongText = () => {
  return (
    <div
      className="flex flex-col items-center text-gray-700 p-6 font-inter relative bg-cover bg-center rounded-lg"
      style={{
        backgroundImage: 'url("/path/to/your/background-image.jpg")',
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Prompt Text */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold text-black">
          Certikan mengapa Anda menyukai opsi{" "}
          <span className="text-red-600">@Mana yang paling tepat...</span>
        </h1>
        <p className="text-gray-600 mb-2">
          Tak kenal, maka tak sayang{" "}
          <span role="img" aria-label="smile">
            🥰
          </span>
        </p>
      </div>

      {/* Long Text Input Field */}
      <textarea
        placeholder="Kolom isian teks panjang"
        className="w-full p-4 border-b border-gray-400 text-lg text-gray-800 bg-transparent focus:outline-none"
        rows="4"
      />

      {/* Next Button */}
      <button
        className="w-full mt-4 py-2 bg-red-600 text-white text-lg font-semibold rounded-lg flex justify-center items-center"
        onClick={() => alert("Lanjut ke bagian berikutnya")}
      >
        Lanjut
      </button>
      <p className="text-sm text-gray-500 mt-2">atau tekan Enter ↵</p>
    </div>
  );
};

export default LongText;
