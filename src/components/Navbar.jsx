import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logoBeMySample from '../assets/images/BeMySampleLogo_Transparent.png'
import { FaBars, FaHome, FaSignInAlt } from 'react-icons/fa'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const NavBar = () => {
	const dropdownRef = useRef(null)
	const location = useLocation()
	const navigate = useNavigate()
	const [isDropdownOpen, setDropdownOpen] = useState(false)
	const storedLanguage = localStorage.getItem('language') || 'id'
	const [language, setLanguage] = useState(storedLanguage)
	const [navBarMobile, setNavBarMobile] = useState(false)
	const [showTitle, setShowTitle] = useState(false)

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
			caseStudy: 'Case Study',
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
			if (window.innerWidth >= 400 && window.innerWidth < 1024) {
				setNavBarMobile(true)
			} else {
				setNavBarMobile(false)
			}

			if (window.innerWidth < 500) {
				setShowTitle(false)
			} else {
				setShowTitle(true)
			}
		}

		handleResize()

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<>
			<nav
				className={`bg-opacity-70 backdrop-blur-sm p-2 py-3 justify-between flex items-center fixed w-full z-50 shadow-lg bg-white`}
			>
				<div className="cursor-pointer z-50 lg:flex absolute lg:visible invisible inset-0 flex items-center justify-center">
					<ul className="flex lg:space-x-2 md:space-x-0 items-center justify-center">
						<li
							className={`px-4 py-1 rounded-full ${
								location.pathname === '/'
									? 'bg-[#0081fb] text-white font-semibold py-2'
									: `text-black hover:bg-gray-300 transition-all duration-300 py-2`
							}`}
						>
							<span className="flex gap-2 items-center">
								{location.pathname === '/feature' ? (
									translations[language].feature
								) : (
									<Link to="/feature">{translations[language].feature}</Link>
								)}
							</span>
						</li>
						<li
							className={`px-4 py-1 rounded-full ${
								location.pathname === '/caseStudy'
									? 'bg-[#0081fb] text-white font-semibold py-2'
									: `text-black hover:bg-gray-300 transition-all duration-300 py-2`
							}`}
						>
							<span className="flex gap-2 items-center">
								{location.pathname === '/caseStudy' ? (
									translations[language].caseStudy
								) : (
									<Link to="/caseStudy">
										{translations[language].caseStudy}
									</Link>
								)}
							</span>
						</li>
						<li
							className={`px-4 py-1 rounded-full ${
								location.pathname.startsWith('/vr-games')
									? 'bg-[#0081fb] text-white font-semibold py-2'
									: `text-black hover:bg-gray-300 transition-all duration-300 py-2`
							}`}
						>
							<span className="flex gap-2 items-center">
								{location.pathname === '/price' ? (
									translations[language].price
								) : (
									<Link to="/price">{translations[language].price}</Link>
								)}
							</span>
						</li>
						<li
							className={`px-4 py-1 rounded-full ${
								location.pathname === '/account'
									? 'bg-[#0081fb] text-white font-semibold py-2'
									: `text-black hover:bg-gray-300 transition-all duration-300 py-2`
							}`}
						>
							<span className="flex gap-2 items-center">
								{location.pathname === '/account' ? (
									translations[language].account
								) : (
									<Link to="/account">{translations[language].account}</Link>
								)}
							</span>
						</li>
					</ul>
				</div>

				<div className="ml-5 flex flex-row items-center justify-center gap-0">
					<Link to="/">
						<LazyLoadImage
							src={logoBeMySample}
							alt="logo-hypertopia"
							className="h-10 cursor-pointer"
						/>
					</Link>
				</div>
				<div className="mr-5 z-50 flex flex-row items-center justify-end gap-2">
					<div className="flex items-center gap-6">
						<div className="relative inline-block text-left">
							<button type="button" className="cursor-pointer outline-none">
								{/* {user ? (
									<img
										src={user.photoURL}
										alt=""
										className={`size-11 rounded-full border-2 ${
											isDarkMode
												? 'border-white'
												: isDropdownOpen
												? 'border-[#0081FB]'
												: 'border-zinc-300'
										} hover:border-[#0081FB] transition-all duration-300 outline-none`}
									/>
								) : ( */}
								<div className='flex flex-row gap-2 items-center'>
									<button className="flex flex-row gap-2 items-center hover:bg-zinc-400 transition-all text-blue-700 px-4 py-2 rounded-xl">
										<p className="font-semibold">
											{translations[language].signIn}
										</p>
									</button>
									<button className="flex flex-row gap-2 items-center bg-[#0081FB] hover:bg-blue-700 transition-all text-white px-4 py-2 rounded-xl">
										<p className="font-semibold">
											{translations[language].register}
										</p>
									</button>
								</div>
								{/* )} */}
							</button>
						</div>
					</div>
				</div>
			</nav>

			<style>
				{`
          @import url('https:
          .focus {
            width: 250px;
          }

          .font-bebas-neue {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 30px;
            letter-spacing: 0.1rem;
          }

          .badge {
            position: absolute;
            top: 0;
            right: 0;
            color: white;
          }
        `}
			</style>
		</>
	)
}

export default NavBar
