import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logoBeMySample from '../assets/images/BeMySampleLogo_Transparent.png'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { motion } from 'framer-motion'
import { FaAngleDown } from 'react-icons/fa'

const NavBar = ({ childrenCenter, childrenRight }) => {
	const storedLanguage = localStorage.getItem('language') || 'id'
	const [language, setLanguage] = useState(storedLanguage)

	useEffect(() => {
		localStorage.setItem('language', language)
	}, [language])

	return (
		<motion.nav
			className="bg-opacity-70 backdrop-blur-md p-2 py-3 justify-between flex items-center fixed w-full z-50 shadow-lg bg-white"
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			transition={{ duration: 0.3 }}
		>
			{/* Section kiri - Logo */}
			<div className="ml-5 flex items-center">
				<Link to="/">
					<LazyLoadImage
						src={logoBeMySample}
						alt="BeMySample Logo"
						className="h-[56px] cursor-pointer"
					/>
				</Link>
			</div>

			{/* Section tengah - menerima children untuk fleksibilitas */}
			<div className="flex-grow flex items-center justify-center">
				{childrenCenter}
			</div>

			{/* Section kanan - menerima children untuk fleksibilitas */}
			<div className="mr-5 flex items-center gap-2">
				{childrenRight}
			</div>
		</motion.nav>
	)
}

export default NavBar