import React from "react";
import { motion } from "framer-motion";
import Charts from '../../assets/images/Charts.png';
import { FaCheck } from "react-icons/fa";

const PopupWhyDataNeeded = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="relative rounded-xl shadow-lg overflow-hidden w-11/12 md:w-3/4 lg:w-1/2 bg-gradient-to-b from-blue-50 to-blue-100"
      >
        <div
          className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <button className="text-white px-4 py-1 border rounded-lg bg-red-500 hover:bg-red-600">
            ✕ Tutup
          </button>
        </div>
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Content */}
          <div className="w-full md:w-2/3 px-10 py-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Mengapa Data ini Dibutuhkan?
            </h2>
            <p className="text-gray-600 mb-4">
              Data diri seperti tanggal lahir dan pekerjaan digunakan untuk:
            </p>
            <ul className="space-y-4">
              <li className="flex items-center">
                <span className="text-blue-500 text-xl font-bold mr-3">
                  <FaCheck />
                </span>
                <p>
                  Memastikan <strong>hasil survei akurat</strong> karena
                  menyasar responden dengan latar belakang yang sesuai.
                </p>
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 text-xl font-bold mr-3">
                  <FaCheck />
                </span>
                <p>
                  Mencari <strong>survei yang lebih cocok</strong> dengan minat
                  Anda ketika ingin berkontribusi mengisi survei dan mendapatkan
                  MyPoin.
                </p>
              </li>
            </ul>
          </div>
          {/* Right Image */}
          <div className="hidden md:block w-full md:w-1/3">
            <img
              src={Charts}
              alt="Chart"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PopupWhyDataNeeded;
