import React from 'react'
import { useNavigate } from 'react-router-dom'
import errorImage from '../assets/images/404.png' // Pastikan path gambar benar

const Page404 = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-6">
      <img
        src={errorImage}
        alt="404 Not Found"
        className="w-full max-w-xl mb-8"
      />
      <h1 className="text-[45px] font-header text-black mb-4">
      Ups! Sepertinya Anda tersesat
      </h1>
      <p className="text-[20px] text-gray-600 mb-8">
      Kami tidak dapat menemukan halaman yang Anda tuju.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg text-[18px] font-semibold hover:bg-blue-700 transition-all duration-300 font-inter"
      >
        Kembali ke Beranda
      </button>
    </div>
  )
}

export default Page404
