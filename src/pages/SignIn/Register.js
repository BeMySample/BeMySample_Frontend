import React, { useState } from 'react'
import bgPage from '../../assets/images/bgLogin.png'
import logoBeMySample from '../../assets/images/BeMySampleLogo_Transparent.png'
import { FcGoogle } from 'react-icons/fc'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { motion } from 'framer-motion'

const Register = () => {
	const [formData, setFormData] = useState({
		nama: '',
		email: '',
		password: '',
		confirmPassword: '',
	})

	const [showPassword, setShowPassword] = useState(false)
	const [formSubmitted, setFormSubmitted] = useState(false)
	const [errorMessage, setErrorMessage] = useState(null)

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const validatePassword = (password) => {
		const minLength = password.length >= 8
		const hasUppercase = /[A-Z]/.test(password)
		const hasLowercase = /[a-z]/.test(password)
		const hasNumber = /[0-9]/.test(password)
		const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

		return { minLength, hasUppercase, hasLowercase, hasNumber, hasSpecialChar }
	}

	const passwordCriteria = validatePassword(formData.password)
	const isPasswordValid =
		passwordCriteria.minLength &&
		passwordCriteria.hasUppercase &&
		passwordCriteria.hasLowercase &&
		passwordCriteria.hasNumber &&
		passwordCriteria.hasSpecialChar
	const isPasswordMatch = formData.password === formData.confirmPassword

	const isFormValid =
		formData.nama && formData.email && isPasswordValid && isPasswordMatch

	const handleSubmit = async (e) => {
		e.preventDefault()
		setFormSubmitted(true)

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
					nama_lengkap: formData.nama,
					email: formData.email,
					password: formData.password,
					google_id: 'n238dhwidjmw',
					avatar: 'default-avatar',
					tanggal_lahir: '',
					jenis_kelamin: 'laki-laki',
					umur: 25,
					lokasi: 'Indonesia',
					minat: 'Teknologi',
					institusi: 'Default Institution',
					poin_saya: 0,
					pekerjaan: 'Mahasiswa',
					profilepic: 'default-profile-pic-url',
				}),
			})

			console.log('Status Code:', response.status)
			console.log('Headers:', response.headers)

			if (!response.ok) {
				const errorData = await response.json()
				setErrorMessage(JSON.stringify(errorData))
				return
			}

			const data = await response.json()
			alert('Registrasi berhasil: ' + JSON.stringify(data))
			setErrorMessage(null)
		} catch (error) {
			setErrorMessage(error.toString())
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center relative font-inter">
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

					<motion.button
						type="button"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="flex items-center justify-center gap-4 px-6 py-3 w-full rounded-full border-2 border-gray-300"
					>
						<FcGoogle className="text-lg md:text-xl" />
						<span className="font-inter text-sm sm:text-base md:text-lg">
							Daftar dengan Google
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
						<input
							type="password"
							name="confirmPassword"
							placeholder="Konfirmasi Password"
							value={formData.confirmPassword}
							onChange={handleChange}
							className="w-full h-10 sm:h-12 md:h-14 border border-gray-400 rounded-md px-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
						/>

						<div className="text-sm">
							<ul>
								<li
									className={`${
										passwordCriteria.minLength
											? 'text-green-500'
											: 'text-gray-500'
									}`}
								>
									✔ Minimal 8 karakter
								</li>
								<li
									className={`${
										passwordCriteria.hasUppercase
											? 'text-green-500'
											: 'text-gray-500'
									}`}
								>
									✔ Huruf besar
								</li>
								<li
									className={`${
										passwordCriteria.hasLowercase
											? 'text-green-500'
											: 'text-gray-500'
									}`}
								>
									✔ Huruf kecil
								</li>
								<li
									className={`${
										passwordCriteria.hasNumber
											? 'text-green-500'
											: 'text-gray-500'
									}`}
								>
									✔ Angka
								</li>
								<li
									className={`${
										passwordCriteria.hasSpecialChar
											? 'text-green-500'
											: 'text-gray-500'
									}`}
								>
									✔ Karakter khusus
								</li>
							</ul>
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

				{errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
			</motion.div>

			<Helmet>
				<title>Sign Up - BeMySample</title>
			</Helmet>
		</div>
	)
}

export default Register
