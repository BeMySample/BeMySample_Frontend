import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import NavBar from '../../components/Navbar'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logoBeMySample from '../../assets/images/BeMySampleLogo_Transparent.png'
import ProfileMenu from '../../components/ProfileMenu'
import About from './About'
import SecurityAccount from './SecurityAccount'
import Communication from './Communication'
import { fetchUser } from '../../api/auth'
import { Toaster } from 'react-hot-toast'
import Loading from 'react-loading'

const Profile = () => {
	const [user, setUser] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		const getUser = async () => {
			try {
				const response = await fetchUser()
				console.log('User data:', response.data.data)
				setUser(response.data.data)
			} catch (err) {
				console.error('Error fetching user:', err.response?.data || err.message)
			} finally {
				setIsLoading(false)
			}
		}

		getUser()
	}, [])

	const profileData = {
		nama_lengkap: '',
		email: '',
		avatar: '', // Ganti dengan URL avatar
		jenis_kelamin: '',
		tanggal_lahir: '',
		lokasi: '',
		pekerjaan: '',
		institusi: '',
		minat: '',
	}

	const navItemsSidebar = [
		{
			path: '#about',
			label: 'Tentang Saya',
			icon: 'ic:baseline-account-circle',
		},
		{ path: '#security', label: 'Keamanan Akun', icon: 'mdi:key' },
		{ path: '#communication', label: 'Komunikasi', icon: 'ic:outline-email' },
	]

	const [activeSection, setActiveSection] = useState('')

	useEffect(() => {
		// Set the active section based on the current URL hash
		const hash = location.hash.replace('#', '')
		setActiveSection(hash)
	}, [location.hash]) // Make sure to trigger the effect when hash changes

	return (
		<>
			<div className="min-h-screen flex bg-gray-100 font-inter pt-[90px]">
				{isLoading && (
					<div className="absolute left-0 bottom-0 right-0 flex flex-col justify-center items-center w-full bg-white bg-opacity-90 backdrop-blur-md z-20 h-screen">
						<Loading type="spin" color="#1F38DB" height={50} width={50} />
						<p className="mt-4 text-gray-700 font-semibold">
							Memuat data pengguna...
						</p>
					</div>
				)}
				<Toaster position="top-center" reverseOrder={false} />
				<div className="w-1/4 bg-white rounded-r-2xl p-6">
					<ul className="space-y-4">
						{navItemsSidebar.map(({ path, label, icon }) => (
							<li
								key={path}
								className={`flex items-center gap-2 p-4 rounded-md cursor-pointer ${
									activeSection === path.replace('#', '')
										? 'bg-blue-200'
										: 'hover:bg-blue-100'
								}`}
							>
								<Icon
									icon={icon}
									className={`
										${
											activeSection === path.replace('#', '')
												? 'text-blue-600'
												: 'text-gray-500'
										} text-2xl
									`}
								/>
								<Link to={path}>
									<p
										className={`${
											activeSection === path.replace('#', '')
												? 'text-blue-600 font-semibold'
												: 'text-gray-500'
										}`}
									>
										{label}
									</p>
								</Link>
							</li>
						))}
					</ul>
				</div>

				<div className="flex-grow p-8">
					{activeSection === 'about' && (
						<About profileData={user || profileData} />
					)}
					{activeSection === 'security' && (
						<SecurityAccount profileData={user || profileData} />
					)}
					{activeSection === 'communication' && <Communication />}
				</div>
			</div>
		</>
	)
}

export default Profile
