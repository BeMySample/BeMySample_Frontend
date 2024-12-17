import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import ProfilePict from '../assets/images/default-profile.png'
import { fetchUser, logout } from '../api/auth'
import Cookies from 'js-cookie'
import toast, { Toaster } from 'react-hot-toast'
import ReactLoading from 'react-loading'
import { motion, AnimatePresence } from 'framer-motion'

const ProfileMenu = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [user, setUser] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		const getUser = async () => {
			try {
				const response = await fetchUser()
				setUser(response.data.data)
			} catch (err) {
				console.error('Error fetching user:', err.response?.data || err.message)
			} finally {
				setIsLoading(false)
			}
		}

		getUser()
	}, [])

	const handleLogout = async () => {
		try {
			await toast.promise(
				(async () => {
					// Update status user sebelum logout
					if (user) {
						const userId = user.id // pastikan 'id' sesuai dengan struktur data user
						const authType = user.status.split(',')[0].trim() // Ambil tipe autentikasi

						// Update status ke "authType, false"
						const url = `http://localhost:8000/api/users/edit/${userId}`
						const payload = {
							...user,
							status: `${authType}, false`,
						}

						// Lakukan fetch untuk update data user
						await fetch(url, {
							method: 'PUT',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify(payload),
						})
					}

					// Proses logout
					await logout()
					setUser(null)
					Cookies.remove('auth_token')

					location.pathname !== '/'
						? navigate('/login')
						: window.location.reload()
				})(),
				{
					loading: 'Sedang memproses logout...',
					success: 'Logout berhasil!',
					error: 'Logout gagal. Silakan coba lagi.',
				}
			)
		} catch (err) {
			console.error('Logout error:', err.response?.data || err.message)
		}
	}

	const toggleMenu = () => setIsMenuOpen((prev) => !prev)

	return (
		<div className="relative">
			{/* Profile Section */}
			{isLoading ? (
				<div className="flex justify-center items-center">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5 }}
					>
						<ReactLoading type="spin" color="#1F38DB" height={32} width={32} />
					</motion.div>
				</div>
			) : (
				<div className="flex flex-col lg:flex-row items-center gap-2 h-full">
					{/* Tampilkan ikon notifikasi */}
					<div className="hover:bg-zinc-100 px-4 py-2 rounded-lg flex items-center gap-2 h-full">
						<Icon icon="iconoir:bell-notification" fontSize={24} />
					</div>

					{/* Tampilkan poin atau MyPoin */}
					{location.pathname === '/dashboard/my-poin' ? (
						<div className="h-[45px] px-4 py-2 bg-gradient-to-b from-[#1f38db] to-[#2073db] rounded-lg justify-end items-center gap-2 inline-flex">
							<div className="text-right text-white text-base font-bold font-['Inter'] leading-none">
								MyPoin Saya
							</div>
						</div>
					) : (
						location.pathname !== '/' && (
							<Link
								to="/dashboard/my-poin"
								className="hover:bg-zinc-100 px-4 py-2 rounded-lg flex items-center gap-2 h-full"
							>
								<Icon icon="akar-icons:coin" />
								<p>{user?.poin_saya.toLocaleString('id-ID') || 0} Poin</p>
							</Link>
						)
					)}

					{/* Tampilkan menu profil */}
					<div
						className="hover:bg-zinc-100 px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer"
						onClick={toggleMenu}
					>
						<img
							src={user?.avatar || ProfilePict}
							alt="profile"
							className="w-10 h-10 rounded-full"
						/>
						{location.pathname !== '/' && (
							<p>
								Halo, <b className="text-[#1F38DB]">{user.nama_lengkap}</b>!
							</p>
						)}
						<div
							className={`${
								isMenuOpen ? '-rotate-180' : ''
							} transition-transform`}
						>
							<Icon icon="ep:arrow-down-bold" />
						</div>
					</div>
				</div>
			)}

			{/* Dropdown Menu */}
			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ duration: 0.2 }}
						className="absolute right-0 mt-2 bg-white shadow-md rounded-2xl w-48 p-2 z-50 flex flex-col gap-1"
						onMouseLeave={() => setIsMenuOpen(false)}
					>
						{location.pathname === '/' && (
							<Link
								className="flex flex-row gap-2 items-center w-full px-4 py-2 text-left hover:text-blue-500 hover:bg-blue-200 rounded-lg transition-all duration-200"
								to="/dashboard/home"
							>
								<Icon icon="ri:dashboard-fill" className="mr-2 text-lg" />
								Dasbor
							</Link>
						)}
						{location.pathname !== '/' && (
							<Link
								className="flex flex-row gap-2 items-center w-full px-4 py-2 text-left hover:text-blue-500 hover:bg-blue-200 rounded-lg transition-all duration-200"
								to="/dashboard/profile#about"
							>
								<Icon icon="mdi:account" className="mr-2 text-lg" />
								Profil
							</Link>
						)}
						<button
							className="flex flex-row gap-2 items-center w-full px-4 py-2 text-left text-red-500 hover:bg-red-100 rounded-lg transition-all duration-200"
							onClick={handleLogout}
						>
							<Icon icon="mdi:logout" className="mr-2 text-lg" />
							Keluar
						</button>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default ProfileMenu
