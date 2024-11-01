import React, { useState } from "react";
import bgPage from "../../assets/images/bgLogin.png";
import logoBeMySample from "../../assets/images/BeMySampleLogo_Transparent.png";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const LogIn = () => {
  // State untuk mengelola form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Validasi input email dan kata sandi
  const isEmailValid = email.trim() !== "";
  const isPasswordValid = password.trim() !== "";
  const isFormValid = isEmailValid && isPasswordValid;

  // Handler untuk form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (isFormValid) {
      console.log("Form submitted:", { email, password });
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Background overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-0 left-0 w-full h-full z-10 bg-[#1F38DB] bg-opacity-80"
      />

      {/* Background image */}
      <img
        src={bgPage}
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      {/* Form container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="w-fit bg-white p-8 rounded-[24px] shadow-md z-10"
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-[40px]"
        >
          {/* Logo and welcome text */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center gap-[24px]"
          >
            <Link to="/">
              <img
                src={logoBeMySample}
                alt="logo-hypertopia"
                className="h-[56px] cursor-pointer"
              />
            </Link>
            <div className="flex flex-col items-center">
              <p className="text-[32pt] font-gili">Selamat datang kembali!</p>
              <p className="text-[16pt] font-poppins">
                Belum punya akun? Daftar gratis sekarang!
              </p>
            </div>
          </motion.div>

          {/* Google login button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-row gap-[16px] px-6 py-3 items-center justify-center w-full rounded-full border-2 border-[#333333]"
          >
            <FcGoogle className="size-[24px]" />
            <span className="font-inter text-[22px]">Masuk dengan Google</span>
          </motion.button>

          {/* Divider */}
          <div className="flex flex-row gap-[24px] items-center w-full">
            <div className="w-full h-[2px] bg-[#666666] bg-opacity-25" />
            <p className="text-[24px] font-inter text-[#666666]">ATAU</p>
            <div className="w-full h-[2px] bg-[#666666] bg-opacity-25" />
          </div>

          {/* Form fields */}
          <div className="flex flex-col gap-[24px] w-full">
            {/* Email input */}
            <label htmlFor="email" className="flex flex-col w-full items-start">
              <span className="mb-2 text-[16px] font-inter text-[#666666]">
                E-mail
              </span>
              <motion.input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="font-inter w-full h-[56px] border border-gray-400 rounded-[12px] px-4 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Masukkan E-mail Anda"
                whileFocus={{ scale: 1.02 }}
              />
              {!isEmailValid && formSubmitted && (
                <p className="text-red-500 text-sm mt-1">
                  Email tidak boleh kosong.
                </p>
              )}
            </label>

            {/* Password input */}
            <label
              htmlFor="password"
              className="flex flex-col w-full items-start"
            >
              <div className="w-full flex flex-row justify-between items-center">
                <span className="mb-2 text-[16px] font-inter text-[#666666]">
                  Kata Sandi
                </span>
              </div>
              <div className="w-full relative">
                <motion.input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="font-inter w-full h-[56px] border border-gray-400 rounded-[12px] px-4 pr-12 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="Masukkan Kata Sandi Anda"
                  whileFocus={{ scale: 1.02 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 flex flex-row gap-2 items-center"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {!isPasswordValid && formSubmitted && (
                <p className="text-red-500 text-sm mt-1">
                  Kata sandi tidak boleh kosong.
                </p>
              )}
              <div className="flex w-full justify-end mt-1 font-inter">
                <button className="hover:text-[#1F38DB]">
                  Lupa Kata Sandi?
                </button>
              </div>
            </label>
          </div>

          {/* Submit button */}
          <motion.button
            type="submit"
            onClick={() => window.location.replace("/dashboard")}
            disabled={!isFormValid}
            whileHover={{ scale: isFormValid ? 1.05 : 1 }}
            whileTap={{ scale: 0.95 }}
            className={`flex px-6 py-3 w-full rounded-full items-center justify-center 
              ${
                isFormValid ? "bg-blue-500" : "bg-gray-400"
              } text-white text-[22px] font-poppins font-medium transition duration-200`}
          >
            Masuk
          </motion.button>
        </form>
      </motion.div>

      <Helmet>
        <title>Log In - BeMySample</title>
      </Helmet>
    </div>
  );
};

export default LogIn;
