import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import Page404 from './pages/Page404'
import LogIn from './pages/SignIn/LogIn'
import Dashboard from './pages/Dashboard/Dashboard'
import { Link, useLocation } from 'react-router-dom'
import ProfilePict from './assets/images/profilepict.png'
import logoBeMySample from './assets/images/BeMySampleLogo_Transparent.png'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import React, { useState } from 'react'
import NavBar from './components/Navbar'
import { motion } from 'framer-motion'
import { FaAngleDown } from 'react-icons/fa'
import { Icon } from '@iconify/react/dist/iconify.js'
import Edit from './pages/Dashboard/Survey/Edit'
import Breadcrumbs from './components/Breadcrumbs'
import Preview from './pages/Dashboard/Survey/Preview'

const App = () => {
	return (
		<Router>
			<Content />
		</Router>
	)
}

const Content = () => {
	const location = useLocation()
	const [language, setLanguage] = useState(
		localStorage.getItem('language') || 'id'
	)
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const [activeMenu, setActiveMenu] = useState('Sunting')

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

	const handleMenuClick = (menu) => {
		setActiveMenu(menu)
		// Add your navigation logic here if needed (e.g., routing)
	}

	return (
		<div>
			{/* Navbar hanya ditampilkan jika bukan di halaman login */}
			{(location.pathname === '/' || location.pathname === '/dashboard') && (
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
						location.pathname === '/' && (
							<div className="flex-grow flex items-center justify-center">
								<ul className="flex space-x-2 items-center">
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
						)
					}
					childrenRight={
						location.pathname === '/' ? (
							<div className="flex items-center gap-2">
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

								<div className="flex gap-2">
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
							</div>
						) : (
							<div className="flex flex-row gap-2 items-center font-inter">
								<div className="hover:bg-zinc-100 px-4 py-2 rounded-lg flex flex-row gap-2 items-center justify-center text-base h-full">
									<Icon icon="akar-icons:coin" />
									<p>200.000</p>
								</div>
								<div className="hover:bg-zinc-100 px-4 py-2 rounded-lg flex flex-row gap-2 items-center justify-center text-base h-full">
									<img
										src={ProfilePict}
										alt="profile"
										className="w-10 h-10 rounded-full"
									/>
									<p>
										Halo, <b className="text-[#1F38DB]">Santika</b>!
									</p>
									<Icon icon="ep:arrow-down-bold" />
								</div>
							</div>
						)
					}
				/>
			)}

			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/login" element={<LogIn />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/survey/edit/:id" element={<Edit />} />
				<Route path="/survey/preview/:id" element={<Preview />} />
				<Route path="*" element={<Page404 />} />
			</Routes>
			<style>
				{`
        /* Style untuk scrollbar */
        ::-webkit-scrollbar {
          width: 8px; /* Lebar scrollbar */
        }

        /* Track scrollbar */
        ::-webkit-scrollbar-track {
          border-radius: 10px; /* Border radius untuk track */
        }

        /* Handle scrollbar */
        ::-webkit-scrollbar-thumb {
          background-color: #888; /* Warna handle */
          border-radius: 10px; /* Border radius untuk handle */
        }

        /* Ketika hover pada handle */
        ::-webkit-scrollbar-thumb:hover {
          background-color: #555; /* Warna handle saat hover */
        }
        `}
			</style>
		</div>
	)
}

export default App
