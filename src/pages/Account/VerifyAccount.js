import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import bgPage from '../../assets/images/bgLogin.png'
import logoBeMySample from '../../assets/images/BeMySampleLogo_Transparent.png'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet'
import toast, { Toaster } from 'react-hot-toast'

const OTPForm = () => {
	const { encodedId } = useParams()
	const navigate = useNavigate()

	const id = atob(encodedId)

	const [email, setEmail] = useState('')
	const [otp, setOtp] = useState(['', '', '', '', '', ''])
	const [countdown, setCountdown] = useState(0)

	useEffect(() => {
		const fetchEmail = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8000/api/users/${id}`
				)
				setEmail(response.data.email)
				sendOtp(response.data.email)
			} catch (error) {
				console.error('Error fetching email:', error)
				toast.error('Gagal mengambil email.')
			}
		}

		if (id) {
			fetchEmail()
		}
	}, [id])

	useEffect(() => {
		let timer
		if (countdown > 0) {
			timer = setInterval(() => setCountdown((prev) => prev - 1), 1000)
		}
		return () => clearInterval(timer)
	}, [countdown])

	const sendOtp = async (userEmail) => {
		try {
			await toast.promise(
				axios.post('http://localhost:5000/send-otp', { email: userEmail }),
				{
					loading: 'Mengirim kode OTP...',
					success: `OTP berhasil dikirim ke ${userEmail}`,
					error: 'Gagal mengirim OTP. Coba lagi.',
				}
			)
			setCountdown(300)
		} catch (error) {
			console.error('Error sending OTP:', error)
		}
	}

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60)
		const remainingSeconds = seconds % 60
		return `${String(minutes).padStart(2, '0')}:${String(
			remainingSeconds
		).padStart(2, '0')}`
	}

	const handleOtpChange = (value, index) => {
		if (!/^\d*$/.test(value)) return
		const newOtp = [...otp]
		newOtp[index] = value
		setOtp(newOtp)

		if (value && index < otp.length - 1) {
			document.getElementById(`otp-input-${index + 1}`).focus()
		}
	}

	const handleOtpSubmit = async () => {
		const enteredOtp = otp.join('')
		if (enteredOtp.length !== 6) {
			toast.error('Masukkan OTP lengkap (6 digit)')
			return
		}

		try {
			const otpResponse = await axios.post('http://localhost:5000/verify-otp', {
				otp: enteredOtp,
			})

			toast.success(otpResponse.data.message)

			const userResponse = await axios.get(
				`http://localhost:8000/api/users/${id}`
			)
			const userData = userResponse.data

			const updatedUserData = { ...userData, status: '1' }

			const statusUpdateResponse = await axios.post(
				`http://localhost:8000/api/users/edit/${id}`,
				updatedUserData
			)

			if (statusUpdateResponse.status === 200) {
				toast.success('Status akun berhasil diperbarui!')

				navigate(`/register/${encodedId}/fill-data`)
			} else {
				throw new Error('Gagal memperbarui status pengguna.')
			}
		} catch (error) {
			console.error('Error verifying OTP or updating status:', error)
			toast.error(
				'OTP tidak valid atau terjadi kesalahan saat memperbarui status.'
			)
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
						Verifikasi Akun
					</h2>
					<p className="text-sm sm:text-base md:text-lg font-poppins text-center text-gray-600">
						Periksa email Anda di{' '}
						<span className="font-semibold text-gray-800">{email}</span> untuk
						OTP.
					</p>
				</motion.div>

				<div className="flex justify-center gap-2 mt-6">
					{/* Input Per Digit */}
					{otp.map((digit, index) => (
						<input
							key={index}
							id={`otp-input-${index}`}
							type="text"
							value={digit}
							onChange={(e) => handleOtpChange(e.target.value, index)}
							maxLength="1"
							className="w-12 h-12 text-center text-lg font-bold border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					))}
				</div>

				<div className="flex justify-center items-center mt-4">
					{countdown > 0 ? (
						<p className="text-sm text-gray-600">
							Kode berlaku dalam {formatTime(countdown)}
						</p>
					) : (
						<motion.button
							type="button"
							onClick={() => sendOtp(email)}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="text-blue-500 hover:text-blue-600 font-medium transition"
						>
							Kirim ulang OTP
						</motion.button>
					)}
				</div>

				<motion.button
					type="button"
					onClick={handleOtpSubmit}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className="w-full px-6 py-3 mt-8 rounded-full text-white bg-blue-500 hover:bg-blue-600 font-medium transition"
				>
					Verifikasi Akun
				</motion.button>
			</motion.div>

			<Helmet>
				<title>Verifikasi Akun - BeMySample</title>
			</Helmet>
		</div>
	)
}

export default OTPForm
