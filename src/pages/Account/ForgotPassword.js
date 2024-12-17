import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import bgPage from '../../assets/images/bgLogin.png'
import logoBeMySample from '../../assets/images/BeMySampleLogo_Transparent.png'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet'
import toast, { Toaster } from 'react-hot-toast'

const ForgotPassword = () => {
	const navigate = useNavigate()

	const [email, setEmail] = useState('')
	const [countdown, setCountdown] = useState(0)
	const [hasSent, setHasSent] = useState(false)

	useEffect(() => {
		let timer
		if (countdown > 0) {
			timer = setInterval(() => setCountdown((prev) => prev - 1), 1000)
		}
		return () => clearInterval(timer)
	}, [countdown])

	const sendResetLink = async () => {
		if (!email) {
			toast.error('Email tidak boleh kosong!')
			return
		}

		try {
			await toast.promise(
				axios.post('http://localhost:8000/api/send-reset-link', { email }),
				{
					loading: 'Mengirim tautan reset password...!',
					success: `Tautan reset password berhasil dikirim ke ${email}`,
					error: 'Gagal mengirim tautan reset password. Coba lagi.',
				}
			)
			setCountdown(300) // Atur ulang countdown menjadi 5 menit (300 detik)
			setHasSent(true)
		} catch (error) {
			console.error('Error sending reset link:', error)
		}
	}

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60)
		const remainingSeconds = seconds % 60
		return `${String(minutes).padStart(2, '0')}:${String(
			remainingSeconds
		).padStart(2, '0')}`
	}

	return (
		<div className="min-h-screen flex items-center justify-center relative font-inter">
			<Toaster position="top-center" reverseOrder={false} />
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				className="absolute top-0 left-0 w-full h-full z-10 bg-[#1F38DB] bg-opacity-80"
			/>
			<img
				src={bgPage}
				alt="Background"
				className="absolute top-0 left-0 w-full h-full object-cover z-0"
			/>

			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.7, ease: 'easeInOut' }}
				className="w-full sm:max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl bg-white p-8 rounded-[24px] shadow-md z-10 mx-4"
			>
				<motion.div
					initial={{ y: -100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					className="flex flex-col items-center gap-6"
				>
					<img
						src={logoBeMySample}
						alt="logo-bemy"
						className="h-12 sm:h-14 md:h-16 cursor-pointer"
					/>
					<h2 className="text-xl sm:text-2xl md:text-3xl font-gili text-center">
						Lupa Password
					</h2>
					<p className="text-sm sm:text-base md:text-lg font-poppins text-center text-gray-600">
						Masukkan email yang terdaftar untuk mengatur ulang password Anda.
					</p>
				</motion.div>

				<div className="mt-6">
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Masukkan email Anda"
						className="w-full px-4 py-3 border border-gray-400 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div className="flex justify-center items-center mt-4">
					{hasSent && countdown > 0 ? (
						<p className="text-sm text-gray-600">
							Anda dapat mengirim ulang dalam {formatTime(countdown)}
						</p>
					) : (
						<motion.button
							type="button"
							onClick={sendResetLink}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="text-blue-500 hover:text-blue-600 font-medium transition"
						>
							Kirim tautan reset password
						</motion.button>
					)}
				</div>

				{!hasSent && (
					<motion.button
						type="button"
						onClick={sendResetLink}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="w-full px-6 py-3 mt-8 rounded-full text-white bg-blue-500 hover:bg-blue-600 font-medium transition"
						disabled={hasSent && countdown > 0}
					>
						Kirim Tautan Reset Password
					</motion.button>
				)}
			</motion.div>

			<Helmet>
				<title>Lupa Password - BeMySample</title>
			</Helmet>
		</div>
	)
}

export default ForgotPassword
