import { Icon } from '@iconify/react'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import NavBar from '../../components/Navbar'
import logoBeMySample from '../../assets/images/BeMySampleLogo_Transparent.png'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import ProfileMenu from '../../components/ProfileMenu'
import { fetchUser } from '../../api/auth'

const Dashboard = () => {
	const location = useLocation()
	const navigate = useNavigate()

	const navItems = [
		{ path: '/dashboard/home', label: 'Dasbor' },
		{ path: '/dashboard/survey', label: 'Survei Saya' },
		{ path: '/dashboard/contribution', label: 'Berkontribusi' },
	]

	return (
		<>
			<NavBar
				position={'justify-start'}
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
									location.pathname.startsWith(path)
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
				childrenRight={<ProfileMenu />}
			/>

			<Outlet />
		</>
	)
}

export default Dashboard
