import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import bgPage from '../../assets/images/bgLogin.png'
import logoBeMySample from '../../assets/images/BeMySampleLogo_Transparent.png'
import { FcGoogle } from 'react-icons/fc'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { motion } from 'framer-motion'
import axios from 'axios'
import { initializeCsrf, login, fetchUser } from '../../api/auth'
import toast, { Toaster } from 'react-hot-toast'
import Cookies from 'js-cookie'
import ReactLoading from 'react-loading'

const Login = () => {
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [formSubmitted, setFormSubmitted] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [isRedirecting, setIsRedirecting] = useState(false)

	const isEmailValid = email.trim() !== ''
	const isPasswordValid = password.trim() !== ''
	const isFormValid = isEmailValid && isPasswordValid

	useEffect(() => {
		const checkLoginStatus = async () => {
			try {
				const response = await fetchUser()
				if (response.data) {
					setIsRedirecting(true)
					setTimeout(() => {
						navigate('/dashboard/home')
					}, 1500)
				}
			} catch (err) {
				setIsLoading(false)
			}
		}

		checkLoginStatus()
	}, [navigate])

	const handleGoogleLogin = async () => {
		try {
			window.location.href = 'http://localhost:8000/auth/google'
		} catch (error) {
			console.error('Google Login Error:', error)
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		setFormSubmitted(true)
	}

	const handleEmailLogin = async () => {
		try {
			await toast.promise(
				(async () => {
					await initializeCsrf()
					const response = await login(email, password)
					console.log('Login successful:', response.data)

					const token = response.data.access_token

					Cookies.set('auth_token', token, { expires: 7, secure: true })

					const userResponse = await fetchUser()
					const encodedId = btoa(userResponse.data.data.id.toString())
					navigate(`/login/${encodedId}/verify-account`)
				})(),
				{
					loading: 'Sedang memproses login...',
					success: 'Login berhasil!',
					error: 'Login gagal. Periksa kembali informasi Anda.',
				}
			)
		} catch (err) {
			console.error('Login error:', err.response?.data || err.message)
		}
	}

	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		const token = params.get('token')
		const isRegistered = params.get('isRegistered') === 'true'
		const isAuth = params.get('isAuth') === 'true'
		const userId = params.get('id')

		if (token) {
			Cookies.set('auth_token', token, { expires: 7, secure: true })

			console.log('isRegistered:', isRegistered)
			console.log('isAuth:', isAuth)
			console.log('userId:', userId)

			if (isAuth) {
				if (isRegistered) {
					navigate('/dashboard/home')
				} else {
					const encodedId = encodeURIComponent(userId)
					navigate(`/register/${encodedId}/fill-data`)
				}
			} else {
				navigate('/login?error=unauthorized')
			}
		} else {
			console.error('No token found in URL')
			navigate('/login')
		}
	}, [navigate])

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-gray-100">
				<ReactLoading type="spin" color="#1F38DB" height={80} width={80} />
			</div>
		)
	}

	return (
		<div className="min-h-screen flex items-center justify-center relative font-inter">
			<Toaster position="top-center" reverseOrder={false} />

			{/* Animasi overlay saat redirect */}
			{isRedirecting && (
				<div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50">
					<ReactLoading type="spin" color="#ffffff" height={80} width={80} />
				</div>
			)}

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
				<form
					onSubmit={handleSubmit}
					className="flex flex-col items-center gap-6 md:gap-8"
				>
					<motion.div
						initial={{ y: -100, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.7 }}
						className="flex flex-col items-center gap-6 md:gap-4"
					>
						<Link to="/">
							<img
								src={logoBeMySample}
								alt="logo-hypertopia"
								className="h-12 sm:h-14 md:h-16 cursor-pointer"
							/>
						</Link>
						<div className="flex flex-col items-center">
							<p className="text-xl sm:text-2xl md:text-3xl font-gili text-center">
								Selamat datang kembali!
							</p>
							<p className="text-sm sm:text-base md:text-lg font-poppins text-center">
								Belum punya akun?{' '}
								<Link to="/register" className="text-blue-500">
									Daftar gratis sekarang!
								</Link>
							</p>
						</div>
					</motion.div>

					<motion.button
						type="button"
						whileHover={{ scale: 1.0 }}
						whileTap={{ scale: 0.95 }}
						onClick={handleGoogleLogin}
						className="flex items-center justify-center gap-4 px-6 py-3 w-full rounded-2xl border-2 border-gray-300 hover:bg-gray-200 transition-all duration-300"
					>
						<FcGoogle className="text-lg md:text-xl" />
						<span className="font-inter text-sm sm:text-base md:text-lg">
							Masuk dengan Google
						</span>
					</motion.button>

					<div className="flex items-center gap-4 w-full">
						<div className="flex-grow h-px bg-gray-300"></div>
						<p className="text-xs sm:text-sm md:text-base text-gray-500">
							ATAU
						</p>
						<div className="flex-grow h-px bg-gray-300"></div>
					</div>

					<div className="flex flex-col gap-4 w-full">
						<label htmlFor="email" className="flex flex-col w-full items-start">
							<span className="mb-2 text-xs sm:text-sm md:text-base text-gray-500">
								E-mail
							</span>
							<motion.input
								type="email"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full h-10 sm:h-12 md:h-14 border border-gray-400 rounded-md px-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
								placeholder="Masukkan E-mail Anda"
								whileFocus={{ scale: 1.0 }}
							/>
							{!isEmailValid && formSubmitted && (
								<p className="text-xs sm:text-sm text-red-500 mt-1">
									Email tidak boleh kosong.
								</p>
							)}
						</label>

						<label
							htmlFor="password"
							className="flex flex-col w-full items-start"
						>
							<span className="mb-2 text-xs sm:text-sm md:text-base text-gray-500">
								Kata Sandi
							</span>
							<div className="relative w-full">
								<motion.input
									type={showPassword ? 'text' : 'password'}
									id="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="w-full h-10 sm:h-12 md:h-14 border border-gray-400 rounded-md px-4 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500"
									placeholder="Masukkan Kata Sandi Anda"
									whileFocus={{ scale: 1.0 }}
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
								>
									{showPassword ? <FaEyeSlash /> : <FaEye />}
								</button>
							</div>
							{!isPasswordValid && formSubmitted && (
								<p className="text-xs sm:text-sm text-red-500 mt-1">
									Kata sandi tidak boleh kosong.
								</p>
							)}
							<Link
								to="/forgot-password"
								className="flex w-full justify-end mt-1 text-xs sm:text-sm md:text-base"
							>
								<button className="hover:text-blue-600">
									Lupa Kata Sandi?
								</button>
							</Link>
						</label>
					</div>

					<motion.button
						onClick={handleEmailLogin}
						whileHover={{ scale: isFormValid ? 1.05 : 1 }}
						whileTap={{ scale: 0.95 }}
						className={`w-full px-6 py-3 rounded-2xl text-white font-medium transition ${'bg-blue-500'} hover:bg-blue-600`}
					>
						Masuk
					</motion.button>
				</form>
			</motion.div>

			<Helmet>
				<title>Log In - BeMySample</title>
			</Helmet>
		</div>
	)
}

export default Login
