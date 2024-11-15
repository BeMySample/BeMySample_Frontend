import React from 'react'
import { useNavigate } from 'react-router-dom'
import errorImage from '../assets/images/404.png' // Pastikan path gambar benar

const Page404 = () => {
	const navigate = useNavigate()

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4 md:px-6">
			<img
				src={errorImage}
				alt="404 Not Found"
				className="w-3/4 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mb-6 md:mb-8"
			/>
			<h1 className="text-[30px] md:text-[45px] font-gili text-black mb-2 md:mb-4 text-center">
				Ups! Sepertinya Anda tersesat
			</h1>
			<p className="text-[16px] md:text-[20px] text-gray-600 mb-6 md:mb-8 text-center">
				Kami tidak dapat menemukan halaman yang Anda tuju.
			</p>
			<button
				onClick={() => navigate('/')}
				className="px-5 py-3 bg-blue-600 text-white rounded-lg text-[16px] md:text-[18px] font-semibold hover:bg-blue-700 transition-all duration-300 font-inter"
			>
				Kembali ke Beranda
			</button>
		</div>
	)
}

export default Page404
