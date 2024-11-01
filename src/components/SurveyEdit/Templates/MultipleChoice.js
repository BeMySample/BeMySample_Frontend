// components/SurveyEdit/templates/MultipleChoice.js
import React, { useState } from "react";
import { Icon } from "@iconify/react";

const MultipleChoice = () => {
  const [options, setOptions] = useState([
    {
      label: "Pemilihan umum sebaiknya dilakukan dengan kertas dan pencoblos",
      value: "A",
    },
    {
      label:
        "Digitalisasi sebaiknya dilakukan, pemilu mesti menggunakan komputer",
      value: "B",
    },
    { label: "Saya tidak mengikuti Pemilu", value: "C" },
  ]);
  const [newOption, setNewOption] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  // Handle new option addition
  const handleAddOption = () => {
    if (newOption.trim() !== "") {
      const nextValue = String.fromCharCode(65 + options.length); // Generate alphabet letters (A, B, C, ...)
      setOptions([...options, { label: newOption, value: nextValue }]);
      setNewOption("");
    }
  };

  // Handle selecting an option
  const handleSelectOption = (value) => {
    setSelectedOption(value);
  };

  return (
    <div
      className="flex flex-col items-center text-gray-700 p-6 font-inter relative bg-cover bg-center rounded-lg"
      style={{
        backgroundImage: 'url("/path/to/your/background-image.jpg")',
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        backgroundBlendMode: "overlay",
      }}
    >
      <h1 className="text-2xl font-bold text-black mb-2">
        Mana yang paling tepat menurut Anda?
      </h1>
      <p className="text-gray-600 mb-4">Pilih salah satu opsi</p>

      {/* List of Multiple Choice Options */}
      <div className="w-full space-y-2 mb-4">
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <button
              onClick={() => handleSelectOption(option.value)}
              className={`w-8 h-8 flex items-center justify-center font-semibold border rounded-full ${
                selectedOption === option.value
                  ? "bg-blue-500 text-white"
                  : "border-gray-400 text-gray-700"
              }`}
            >
              {option.value}
            </button>
            <p className="flex-grow text-lg text-gray-800">{option.label}</p>
          </div>
        ))}

        {/* 'Other' option with input field */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleSelectOption("D")}
            className={`w-8 h-8 flex items-center justify-center font-semibold border rounded-full ${
              selectedOption === "D"
                ? "bg-blue-500 text-white"
                : "border-gray-400 text-gray-700"
            }`}
          >
            D
          </button>
          <p className="flex-grow text-lg text-gray-800">
            Lainnya:
            <input
              type="text"
              placeholder="Kolom isian “Lainnya”"
              className="ml-2 border-b border-gray-400 focus:outline-none"
            />
          </p>
        </div>
      </div>

      {/* Add New Option Field */}
      <div className="flex items-center w-full mb-4">
        <button
          onClick={handleAddOption}
          className="flex items-center px-2 py-1 border border-gray-400 rounded text-gray-700"
        >
          <Icon icon="mdi:plus" className="mr-2" />
          Tambah Opsi
        </button>
        <input
          type="text"
          placeholder="Sunting opsi"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAddOption()}
          className="flex-grow ml-2 p-2 border-b border-gray-300 text-lg focus:outline-none"
        />
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

export default MultipleChoice;
