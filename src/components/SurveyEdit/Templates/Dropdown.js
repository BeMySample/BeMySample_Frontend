// components/SurveyEdit/templates/Dropdown.js
import React, { useState } from "react";
import { Icon } from "@iconify/react";

const Dropdown = () => {
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  // Handle new option input
  const handleAddOption = () => {
    if (newOption.trim() !== "") {
      setOptions([...options, newOption]);
      setNewOption("");
    }
  };

  // Handle selecting an option
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setShowOptions(false);
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
        Pilih provinsi tempat tinggal
      </h1>
      <p className="text-gray-600 mb-4">
        Klik <span className="italic">dropdown</span> untuk menampilkan{" "}
        <span className="italic">list</span> dan pilih satu opsi
      </p>

      {/* Editable Option Input */}
      <div className="flex items-center w-full mb-4">
        <input
          type="text"
          placeholder="Sunting opsi"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAddOption()}
          className="flex-grow p-2 border-b border-gray-300 text-lg focus:outline-none"
        />
        <button
          onClick={handleAddOption}
          className="text-blue-500 ml-2"
          title="Tambahkan opsi"
        >
          <Icon icon="mdi:plus-circle" className="text-lg" />
        </button>
      </div>

      {/* Dropdown Selector */}
      <div className="relative w-full mb-4">
        <div
          onClick={() => setShowOptions(!showOptions)}
          className="cursor-pointer flex items-center justify-between p-2 border border-gray-300 rounded-lg text-lg bg-white"
        >
          {selectedOption || "Pilih opsi"}
          <Icon icon="mdi:chevron-down" className="text-gray-500" />
        </div>

        {showOptions && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 shadow-lg max-h-40 overflow-y-auto z-10">
            {options.length > 0 ? (
              options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleSelectOption(option)}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  {option}
                </div>
              ))
            ) : (
              <p className="p-2 text-gray-500">Tidak ada opsi</p>
            )}
          </div>
        )}
      </div>

      {/* Option Summary and Action Button */}
      <div className="w-full flex justify-between items-center mb-6 text-gray-500">
        <p>Total {options.length} pilihan tersimpan</p>
        <Icon
          icon="mdi:information-outline"
          className="text-lg"
          title="Jumlah opsi tersimpan"
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

export default Dropdown;
