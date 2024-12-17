import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import bgPage from '../../assets/images/bgLogin.png'
import logoBeMySample from '../../assets/images/BeMySampleLogo_Transparent.png'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet'
import toast, { Toaster } from 'react-hot-toast'

const ResetPassword = () => {
	const navigate = useNavigate()
	const location = useLocation()

	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [email, setEmail] = useState('')
	const [token, setToken] = useState('')

	// Extract token and email from query params
	useEffect(() => {
		const params = new URLSearchParams(location.search)
		setToken(params.get('token') || '')
		setEmail(params.get('email') || '')
	}, [location.search])

	const handleResetPassword = async () => {
		if (!password || !confirmPassword) {
			toast.error('Semua field harus diisi!')
			return
		}

		if (password !== confirmPassword) {
			toast.error('Password dan Konfirmasi Password tidak cocok!')
			return
		}

		try {
			await toast.promise(
				axios.post('http://localhost:8000/api/reset-password', {
					email,
					token,
					password,
					password_confirmation: confirmPassword,
				}),
				{
					loading: 'Mengatur ulang password...',
					success: 'Password berhasil diatur ulang. Silakan login!',
					error: 'Gagal mengatur ulang password. Coba lagi.',
				}
			)
			navigate('/login') // Redirect to login page after success
		} catch (error) {
			if (error.response && error.response.data.message) {
				toast.error(error.response.data.message)
			} else {
				toast.error('Terjadi kesalahan, coba lagi nanti.')
			}
			console.error('Error resetting password:', error)
		}
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
						Atur Ulang Password
					</h2>
					<p className="text-sm sm:text-base md:text-lg font-poppins text-center text-gray-600">
						Masukkan password baru Anda di bawah ini.
					</p>
				</motion.div>

				<div className="mt-6">
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password Baru"
						className="w-full px-4 py-3 border border-gray-400 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
					/>
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						placeholder="Konfirmasi Password Baru"
						className="w-full px-4 py-3 border border-gray-400 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<motion.button
					type="button"
					onClick={handleResetPassword}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className="w-full px-6 py-3 mt-8 rounded-full text-white bg-blue-500 hover:bg-blue-600 font-medium transition"
				>
					Atur Ulang Password
				</motion.button>
			</motion.div>

			<Helmet>
				<title>Reset Password - BeMySample</title>
			</Helmet>
		</div>
	)
}

export default ResetPassword
