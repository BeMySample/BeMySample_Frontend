import React, { useState } from 'react'
import bgPage from '../../assets/images/bgLogin.png'
import logoBeMySample from '../../assets/images/BeMySampleLogo_Transparent.png'
import { FcGoogle } from 'react-icons/fc'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom' // Import useNavigate
import { Helmet } from 'react-helmet'
import { motion } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast'
import { initializeCsrf, login } from '../../api/auth'
import Cookies from 'js-cookie'

const Register = () => {
	const navigate = useNavigate() // Inisialisasi navigate

	const [formData, setFormData] = useState({
		nama: '',
		email: '',
		password: '',
		confirmPassword: '',
	})

	const [showPassword, setShowPassword] = useState(false)
	const [errorMessage, setErrorMessage] = useState(null)
	const [isPasswordFocused, setIsPasswordFocused] = useState(false)
	const [isConfirmTouched, setIsConfirmTouched] = useState(false)

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const calculatePasswordStrength = (password) => {
		const criteria = [
			password.length >= 8,
			/[A-Z]/.test(password),
			/[a-z]/.test(password),
			/[0-9]/.test(password),
			/[!@#$%^&*(),.?":{}|<>]/.test(password),
		]
		const strength = criteria.filter(Boolean).length
		return strength
	}

	const passwordStrength = calculatePasswordStrength(formData.password)

	const getStrengthLabel = (strength) => {
		if (strength <= 2) return { label: 'Weak', color: 'bg-red-500' }
		if (strength === 3 || strength === 4)
			return { label: 'Moderate', color: 'bg-yellow-500' }
		if (strength === 5) return { label: 'Strong', color: 'bg-green-500' }
		return { label: '', color: 'bg-gray-300' }
	}

	const strengthLabel = getStrengthLabel(passwordStrength)

	const isPasswordMatch = formData.password === formData.confirmPassword
	const isFormValid =
		formData.nama && formData.email && passwordStrength >= 3 && isPasswordMatch

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!isFormValid) {
			setErrorMessage('Harap isi semua kolom dengan benar.')
			return
		}

		try {
			const response = await fetch('http://localhost:8000/api/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: formData.nama.replace(/\s+/g, '').toLowerCase(),
					status: 'empty',
					nama_lengkap: formData.nama,
					email: formData.email,
					password: formData.password,
					google_id: 'unknown',
					avatar: '',
					tanggal_lahir: '',
					jenis_kelamin: 'laki-laki',
					umur: 25,
					lokasi: '',
					minat: '',
					institusi: '',
					poin_saya: 0,
					pekerjaan: '',
				}),
			})

			if (!response.ok) {
				const errorData = await response.json()
				setErrorMessage(JSON.stringify(errorData))
				return
			}

			const data = await response.json()
			const userId = data.id

			// Encode ID menggunakan Base64
			const encodedId = btoa(userId.toString())
			toast.success('Registrasi berhasil!')

			await initializeCsrf()
			const responseLogin = await login(formData.email, formData.password)
			const token = responseLogin.data.access_token

			Cookies.set('auth_token', token, { expires: 7, secure: true })

			// Redirect ke halaman VerifyAccount dengan encoded ID di URL
			navigate(`/register/${encodedId}/verify-account`)
		} catch (error) {
			toast.error('Registrasi gagal!')
			setErrorMessage(error.toString())
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
				<form onSubmit={handleSubmit} className="flex flex-col gap-6">
					<motion.div
						initial={{ y: -100, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						className="flex flex-col items-center gap-6"
					>
						<Link to="/">
							<img
								src={logoBeMySample}
								alt="logo-hypertopia"
								className="h-12 sm:h-14 md:h-16 cursor-pointer"
							/>
						</Link>
						<div className="flex flex-col items-center">
							<p className="text-xl sm:text-2xl md:text-3xl font-gili">
								Selamat Datang!
							</p>
							<p className="text-sm sm:text-base md:text-lg font-poppins">
								Sudah punya akun?{' '}
								<Link to="/login" className="text-blue-500">
									Masuk di sini!
								</Link>
							</p>
						</div>
					</motion.div>

					<div className="flex flex-col gap-4 w-full">
						<input
							type="text"
							name="nama"
							placeholder="Nama Lengkap"
							value={formData.nama}
							onChange={handleChange}
							className="w-full h-10 sm:h-12 md:h-14 border border-gray-400 rounded-md px-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
						/>
						<input
							type="email"
							name="email"
							placeholder="Email"
							value={formData.email}
							onChange={handleChange}
							className="w-full h-10 sm:h-12 md:h-14 border border-gray-400 rounded-md px-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
						/>
						<div className="relative">
							<input
								type={showPassword ? 'text' : 'password'}
								name="password"
								placeholder="Password"
								value={formData.password}
								onChange={handleChange}
								onFocus={() => setIsPasswordFocused(true)}
								onBlur={() => setIsPasswordFocused(false)}
								className="w-full h-10 sm:h-12 md:h-14 border border-gray-400 rounded-md px-4 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
							>
								{showPassword ? <FaEyeSlash /> : <FaEye />}
							</button>
						</div>

						{/* Bar Progress */}
						{isPasswordFocused && (
							<div className="w-full h-2 rounded-full bg-gray-300 mt-2">
								<div
									className={`h-2 rounded-full ${strengthLabel.color}`}
									style={{ width: `${(passwordStrength / 5) * 100}%` }}
								></div>
							</div>
						)}
						{isPasswordFocused && (
							<p className="text-sm text-gray-600">{strengthLabel.label}</p>
						)}

						{/* Confirm Password */}
						<div className="relative">
							<input
								type="password"
								name="confirmPassword"
								placeholder="Konfirmasi Password"
								value={formData.confirmPassword}
								onChange={handleChange}
								onFocus={() => setIsConfirmTouched(true)}
								className={`w-full h-10 sm:h-12 md:h-14 border ${
									!isConfirmTouched || isPasswordMatch
										? 'border-gray-400'
										: 'border-red-500'
								} rounded-md px-4 focus:outline-none focus:ring-1 ${
									!isConfirmTouched || isPasswordMatch
										? 'focus:ring-blue-500'
										: 'focus:ring-red-500'
								}`}
							/>
							{isConfirmTouched && !isPasswordMatch && (
								<p className="text-sm text-red-500 mt-1">
									Password tidak cocok.
								</p>
							)}
						</div>
					</div>

					<motion.button
						type="submit"
						disabled={!isFormValid}
						whileHover={{ scale: isFormValid ? 1.05 : 1 }}
						whileTap={{ scale: 0.95 }}
						className={`w-full px-6 py-3 rounded-full text-white font-medium transition ${
							isFormValid ? 'bg-blue-500' : 'bg-gray-400'
						}`}
					>
						Daftar
					</motion.button>
				</form>
			</motion.div>

			<Helmet>
				<title>Sign Up - BeMySample</title>
			</Helmet>
		</div>
	)
}

export default Register
