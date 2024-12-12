import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import Hero from '../components/LandingPage/Hero'
import WhyBeMySample from '../components/LandingPage/WhyBeMySample'
import Packages from '../components/LandingPage/Packages'
import Footer from '../components/LandingPage/Footer'
import CaseStudy from '../components/LandingPage/CaseStudy'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { motion } from 'framer-motion'
import { FaAngleDown } from 'react-icons/fa'
import NavBar from '../components/Navbar'
import logoBeMySample from '../assets/images/BeMySampleLogo_Transparent.png'
import { fetchUser } from '../api/auth'
import ProfileMenu from '../components/ProfileMenu'
import { Icon } from '@iconify/react/dist/iconify.js'

const LandingPage = () => {
	const [user, setUser] = useState(null)
	const location = useLocation()
	const [isLoading, setIsLoading] = useState(true)
	const [language, setLanguage] = useState(
		localStorage.getItem('langBMS') || 'id'
	)

	useEffect(() => {
		localStorage.setItem('langBMS', language)
	}, [language])

	const [dropdownOpen, setDropdownOpen] = useState(false)

	const translations = {
		en: {
			feature: 'Feature',
			caseStudy: 'Case Study',
			price: 'Price',
			register: 'Register',
			signIn: 'Sign In',
		},
		id: {
			feature: 'Fitur',
			caseStudy: 'Studi Kasus',
			price: 'Harga',
			register: 'Daftar',
			signIn: 'Masuk',
		},
	}

	const navItems = [
		{ path: '/feature', label: translations[language].feature },
		{ path: '/case-study', label: translations[language].caseStudy },
		{ path: '/price', label: translations[language].price },
	]

	const toggleDropdown = () => setDropdownOpen(!dropdownOpen)

	const changeLanguage = (lang) => {
		setLanguage(lang)
		localStorage.setItem('language', lang)
		setDropdownOpen(false)
	}

	const [menuOpen, setMenuOpen] = useState(false)
	const toggleMenu = () => setMenuOpen(!menuOpen)

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

	return (
		<div>
			<NavBar
				childrenLeft={
					<Link to="/">
						<LazyLoadImage
							src={logoBeMySample}
							alt="BeMySample Logo"
							className="h-[56px] cursor-pointer"
						/>
					</Link>
				}
				childrenCenter={
					<ul className="flex flex-col lg:flex-row lg:space-x-2 items-center text-center">
						{navItems.map(({ path, label }) => (
							<motion.li
								key={path}
								className={`px-4 py-1 rounded-full ${
									location.pathname === path
										? 'bg-[#0081fb] text-white font-semibold py-1.5'
										: 'text-black hover:bg-gray-300 transition-all duration-300 py-1.5'
								}`}
								whileHover={{ scale: 1.05 }}
							>
								<Link to={path}>
									<span className="flex gap-2 items-center font-inter">
										{label}
									</span>
								</Link>
							</motion.li>
						))}
					</ul>
				}
				childrenRight={
					<div className="flex flex-col lg:flex-row items-center gap-2">
						<div className="relative">
							<motion.button
								onClick={toggleDropdown}
								className="flex items-center gap-2 border-2 px-4 py-2 rounded-xl bg-white border-gray-300"
								whileHover={{ scale: 1.05 }}
							>
								<span>{language.toUpperCase()}</span>
								<div
									className={`${
										dropdownOpen ? '-rotate-180' : ''
									} transition-transform`}
								>
									<Icon icon="ep:arrow-down-bold" />
								</div>
							</motion.button>
							{dropdownOpen && (
								<motion.div
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									transition={{ duration: 0.2 }}
									className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg z-30"
								>
									<ul className="py-2">
										<motion.li
											onClick={() => {
												changeLanguage('en')
												window.location.reload()
											}}
											className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
											whileHover={{ scale: 1.05 }}
										>
											EN
										</motion.li>
										<motion.li
											onClick={() => {
												changeLanguage('id')
												window.location.reload()
											}}
											className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
											whileHover={{ scale: 1.05 }}
										>
											ID
										</motion.li>
									</ul>
								</motion.div>
							)}
						</div>

						{user === null ? (
							<div className="flex items-center gap-2">
								<Link to="/login">
									<motion.button
										className="hover:bg-blue-200 transition-all text-blue-700 px-4 py-2 rounded-xl"
										whileHover={{ scale: 1.05 }}
									>
										{translations[language].signIn}
									</motion.button>
								</Link>
								<Link to="/register">
									<motion.button
										className="bg-[#0081FB] hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
										whileHover={{ scale: 1.05 }}
									>
										{translations[language].register}
									</motion.button>
								</Link>
							</div>
						) : (
							<ProfileMenu />
						)}
					</div>
				}
				toggleDropdown={toggleDropdown}
				dropdownOpen={dropdownOpen}
				changeLanguage={changeLanguage}
				translations={translations}
				location={location}
				navItems={navItems}
				toggleMenu={toggleMenu}
				menuOpen={menuOpen}
			/>
			<Hero language={language} />
			<WhyBeMySample language={language} />
			<CaseStudy language={language} />
			<Packages language={language} />
			<Footer language={language} />

			<Helmet>
				<title>BeMySample: Reliability at Reach</title>
			</Helmet>
		</div>
	)
}

export default LandingPage
