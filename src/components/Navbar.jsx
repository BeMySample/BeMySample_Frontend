import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'

const NavBar = ({ childrenLeft, childrenCenter, childrenRight, toggleMenu, menuOpen }) => {
	const storedLanguage = localStorage.getItem('language') || 'id'
	const [language, setLanguage] = useState(storedLanguage)
	const [scrolled, setScrolled] = useState(false)

	useEffect(() => {
		localStorage.setItem('language', language)
	}, [language])

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setScrolled(true)
			} else {
				setScrolled(false)
			}
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return (
		<motion.nav
			className={`backdrop-blur-md p-2 py-3 justify-between flex items-center fixed w-full z-[9999] bg-white font-inter ${
				scrolled ? 'shadow-lg' : ''
			}`}
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			transition={{ duration: 0.3 }}
		>
			{/* Left Section */}
			<div className="ml-5 flex items-center">{childrenLeft}</div>

			{/* Center Section - Desktop Only */}
			<div className="hidden lg:flex items-center justify-center flex-grow">
				{childrenCenter}
			</div>

			{/* Right Section */}
			<div className="mr-5 hidden lg:flex items-center gap-2">
				{childrenRight}
			</div>

			{/* Mobile Menu Toggle */}
			<div className="lg:hidden mr-5 flex items-center">
				<motion.button onClick={toggleMenu}>
					{menuOpen ? (
						<FaTimes className="text-2xl" />
					) : (
						<FaBars className="text-2xl" />
					)}
				</motion.button>
			</div>

			{/* Mobile Menu */}
			{menuOpen && (
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.3 }}
					className="absolute top-[60px] right-0 w-full bg-white shadow-lg z-50 flex flex-col items-center py-4 gap-4"
				>
					{childrenCenter}
					<div className="flex flex-col items-center gap-4">
						{childrenRight}
					</div>
				</motion.div>
			)}
		</motion.nav>
	)
}

export default NavBar
