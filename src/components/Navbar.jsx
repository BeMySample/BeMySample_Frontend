import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logoBeMySample from '../assets/images/BeMySampleLogo_Transparent.png'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { motion } from 'framer-motion'
import { FaAngleDown } from 'react-icons/fa'

const NavBar = () => {
	const location = useLocation()
	const storedLanguage = localStorage.getItem('language') || 'id'
	const [language, setLanguage] = useState(storedLanguage)
	const [navBarMobile, setNavBarMobile] = useState(false)
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

	useEffect(() => {
		localStorage.setItem('language', language)
	}, [language])

	useEffect(() => {
		const handleResize = () => {
			setNavBarMobile(window.innerWidth >= 400 && window.innerWidth < 1024)
		}

		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const toggleDropdown = () => setDropdownOpen(!dropdownOpen)

	const changeLanguage = (lang) => {
		setLanguage(lang)
		setDropdownOpen(false)
	}

	const navItems = [
		{ path: '/feature', label: translations[language].feature },
		{ path: '/case-study', label: translations[language].caseStudy },
		{ path: '/price', label: translations[language].price },
	]

	return (
		<motion.nav
			className="bg-opacity-70 backdrop-blur-md p-2 py-3 justify-between flex items-center fixed w-full z-50 shadow-lg bg-white"
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			transition={{ duration: 0.3 }}
		>
			<div className="cursor-pointer z-20 lg:flex absolute lg:visible invisible inset-0 flex items-center justify-center">
				<ul className="flex lg:space-x-2 md:space-x-0 items-center justify-center">
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
			</div>

			<div className="ml-5 flex flex-row items-center justify-center gap-0 z-50">
				<Link to="/">
					<LazyLoadImage
						src={logoBeMySample}
						alt="logo-hypertopia"
						className="h-[56px] cursor-pointer"
					/>
				</Link>
			</div>

			<div className="mr-5 z-50 flex flex-row items-center justify-end gap-2">
				<div className="flex items-center gap-6">
					<div className="relative">
						<motion.button
							onClick={toggleDropdown}
							className="flex items-center gap-2 border-2 px-4 py-2 rounded-xl bg-white border-gray-300"
							whileHover={{ scale: 1.05 }}
						>
							<span>{language.toUpperCase()}</span>
							<FaAngleDown />
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
										onClick={() => changeLanguage('en')}
										className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
										whileHover={{ scale: 1.05 }}
									>
										EN
									</motion.li>
									<motion.li
										onClick={() => changeLanguage('id')}
										className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
										whileHover={{ scale: 1.05 }}
									>
										ID
									</motion.li>
								</ul>
							</motion.div>
						)}
					</div>

					<div className="flex items-center gap-6">
						<div className="relative inline-block text-left">
							<div className="flex flex-row gap-2 items-center font-inter">
								<motion.button
									className="flex flex-row gap-2 items-center hover:bg-blue-200 transition-all text-blue-700 px-4 py-2 rounded-xl"
									whileHover={{ scale: 1.05 }}
								>
									<p className="font-semibold">
										{translations[language].signIn}
									</p>
								</motion.button>
								<motion.button
									className="flex flex-row gap-2 items-center bg-[#0081FB] hover:bg-blue-700 transition-all text-white px-4 py-2 rounded-xl"
									whileHover={{ scale: 1.05 }}
								>
									<p className="font-semibold">
										{translations[language].register}
									</p>
								</motion.button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</motion.nav>
	)
}

export default NavBar
