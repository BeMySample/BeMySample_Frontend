import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'

const NavBar = ({
	childrenLeft,
	childrenCenter,
	childrenRight,
	toggleMenu,
	menuOpen,
	position,
}) => {
	const storedLanguage = localStorage.getItem('langBMS') || 'id'
	const navPosition = position || 'justify-center'
	const [language, setLanguage] = useState(storedLanguage)
	const [scrolled, setScrolled] = useState(false)

	useEffect(() => {
		localStorage.setItem('langBMS', language)
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
			<div className="ml-5 flex items-center">{childrenLeft}</div>

			<div
				className={`${
					window.location.pathname === '/' && 'absolute left-0 right-0 top-6'
				} hidden lg:flex items-center ${navPosition} flex-grow`}
			>
				{childrenCenter}
			</div>

			<div className="mr-5 hidden lg:flex items-center gap-2">
				{childrenRight}
			</div>

			<div className="lg:hidden mr-5 flex items-center">
				<motion.button onClick={toggleMenu}>
					{menuOpen ? (
						<FaTimes className="text-2xl" />
					) : (
						<FaBars className="text-2xl" />
					)}
				</motion.button>
			</div>

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
