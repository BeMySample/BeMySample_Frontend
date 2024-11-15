import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

const translations = {
	en: {
		freePackage: 'Free Package',
		premiumPackage: 'Premium Package',
		plusPackage: 'Plus Package',
		choiceForYou: 'Choice for You',
		variousOptions: 'Various options to suit your needs',
		month: '/month',
		csPlusPackage: 'Phone, E-mail, Live Chat',
		subscribeNow: 'Subscribe Now',
	},
	id: {
		freePackage: 'Paket Gratis',
		premiumPackage: 'Paket Premium',
		plusPackage: 'Paket Plus',
		choiceForYou: 'Pilihan untuk Anda',
		variousOptions: 'Berbagai pilihan untuk disesuaikan dengan kebutuhan',
		month: '/bulan',
		csPlusPackage: 'Telepon, E-mail, Live Chat',
		subscribeNow: 'Berlangganan Sekarang',
	},
}

const featuresList = [
	'Membuat survei',
	'Publikasi survei',
	'Dashboard analisis hasil survei',
	'Anti-spam dan validasi respons',
	'MyPoin diberikan per bulan',
	'Naikkan eksposur',
	'Bantuan AI',
	'Layanan pelanggan',
]

const Packages = ({ language }) => {
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 1024) {
				setIsMobile(true)
			} else {
				setIsMobile(false)
			}
		}

		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const packagesDataDesktop = [
		{
			name: translations[language].freePackage,
			price: language === 'en' ? 'Free' : 'Gratis',
			perMonth: '',
			bgColor: '',
			features: [true, true, true, true, '0', false, false, 'E-mail'],
		},
		{
			name: translations[language].premiumPackage,
			price: language === 'en' ? 'IDR20.000' : 'Rp20.000',
			perMonth: translations[language].month,
			bgColor: 'bg-[#2073DB]',
			altBgColor: 'bg-[#1E63BC]',
			features: [
				true,
				true,
				true,
				true,
				'100',
				true,
				true,
				'E-mail, Live Chat',
			],
		},
		{
			name: translations[language].plusPackage,
			price: language === 'en' ? 'IDR120.000' : 'Rp120.000',
			perMonth: translations[language].month,
			bgColor: '',
			features: [
				true,
				true,
				true,
				true,
				'1000',
				true,
				true,
				translations[language].csPlusPackage,
			],
		},
	]

	const packagesDataMobile = [
		{
			name: translations[language].freePackage,
			price: language === 'en' ? 'Free' : 'Gratis',
			perMonth: '',
			bgColor: 'bg-white',
			borderColor: 'border-2 border-[#2073DB]',
			textColor: 'text-[#2073DB]',
			iconCheckColor: 'text-[#2073DB]',
			buttonSubscribeColor: 'bg-[#2073DB] text-white',
			iconPackage: 'mdi:gift-outline', // Ikon untuk paket gratis
			bgIconPackage: 'bg-[#2073DB]',
			features: [
				{ name: 'Membuat survei', available: true },
				{ name: 'Publikasi survei', available: true },
				{ name: 'Dashboard analisis hasil survei', available: true },
				{ name: 'Anti-spam dan validasi respons', available: true },
				{ name: 'MyPoin diberikan per bulan', available: '0' },
				{ name: 'Naikkan eksposur', available: false },
				{ name: 'Bantuan AI', available: false },
				{ name: 'Layanan pelanggan', available: 'E-mail' },
			],
		},
		{
			name: translations[language].premiumPackage,
			price: language === 'en' ? 'IDR20.000' : 'Rp20.000',
			perMonth: translations[language].month,
			bgColor: 'bg-[#2073DB]',
			borderColor: 'border-none',
			textColor: 'text-white',
			iconCheckColor: 'text-white',
			buttonSubscribeColor: 'bg-white text-[#2073DB]',
			iconPackage: 'mdi:star', // Ikon untuk paket premium
			bgIconPackage: 'bg-white',
			features: [
				{ name: 'Membuat survei', available: true },
				{ name: 'Publikasi survei', available: true },
				{ name: 'Dashboard analisis hasil survei', available: true },
				{ name: 'Anti-spam dan validasi respons', available: true },
				{ name: 'MyPoin diberikan per bulan', available: '100' },
				{ name: 'Naikkan eksposur', available: true },
				{ name: 'Bantuan AI', available: true },
				{ name: 'Layanan pelanggan', available: 'E-mail, Live Chat' },
			],
		},
		{
			name: translations[language].plusPackage,
			price: language === 'en' ? 'IDR120.000' : 'Rp120.000',
			perMonth: translations[language].month,
			bgColor: 'bg-white',
			borderColor: 'border-2 border-[#2073DB]',
			textColor: 'text-[#2073DB]',
			iconCheckColor: 'text-[#2073DB]',
			buttonSubscribeColor: 'bg-[#2073DB] text-white',
			iconPackage: 'mdi:diamond-stone', // Ikon untuk paket plus, sudah sesuai
			bgIconPackage: 'bg-[#2073DB]',
			features: [
				{ name: 'Membuat survei', available: true },
				{ name: 'Publikasi survei', available: true },
				{ name: 'Dashboard analisis hasil survei', available: true },
				{ name: 'Anti-spam dan validasi respons', available: true },
				{ name: 'MyPoin diberikan per bulan', available: '1000' },
				{ name: 'Naikkan eksposur', available: true },
				{ name: 'Bantuan AI', available: true },
				{
					name: 'Layanan pelanggan',
					available: translations[language].csPlusPackage,
				},
			],
		},
	]

	return (
		<div className="w-full py-20 px-4 sm:px-6 lg:px-10 bg-white font-inter">
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="flex flex-col items-center mb-10"
			>
				<p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center">
					{translations[language].choiceForYou}
				</p>
				<p className="text-base sm:text-lg lg:text-xl text-center mt-2">
					{translations[language].variousOptions}
				</p>
			</motion.div>

			{/* Desktop Table Layout */}
			{!isMobile ? (
				<div className="w-full px-4 md:px-20">
					<motion.table
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
						className="min-w-full table-auto"
					>
						<thead>
							<tr>
								<th className="p-2 md:p-4 text-left"></th>
								{packagesDataDesktop.map((pkg, index) => (
									<th
										key={index}
										className={`relative p-2 md:p-4 pt-10 text-center font-semibold text-[16pt] ${
											pkg.bgColor
												? `${pkg.bgColor} text-white rounded-t-[16pt]`
												: ''
										}`}
									>
										{pkg.name}
										{pkg.name === translations[language].premiumPackage && (
											<div className="absolute top-[-10px] right-[-10px] flex items-center justify-center size-14 rounded-full bg-[#00008B] z-10">
												<Icon
													icon="mdi:thumb-up"
													className="text-white"
													width="30"
													height="30"
												/>
											</div>
										)}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{featuresList.map((feature, idx) => (
								<tr
									key={idx}
									className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
								>
									<td className="p-2 md:p-4 text-[16pt]">{feature}</td>
									{packagesDataDesktop.map((pkg, index) => (
										<td
											key={index}
											className={`p-2 md:p-4 text-center ${
												pkg.name === translations[language].premiumPackage
													? idx % 2 === 0
														? pkg.altBgColor
														: pkg.bgColor
													: ''
											}`}
										>
											{typeof pkg.features[idx] === 'boolean' ? (
												<div className="flex justify-center">
													<Icon
														icon={
															pkg.features[idx]
																? 'icon-park-solid:check-one'
																: 'ep:close-bold'
														}
														className={`size-[25pt] ${
															pkg.name === translations[language].premiumPackage
																? 'text-white'
																: pkg.features[idx] ? 'text-[#2073DB]' : 'text-red-500'
														}`}
													/>
												</div>
											) : (
												<span
													className={`${
														pkg.name === translations[language].premiumPackage
															? 'text-white'
															: 'text-black'
													} text-[16pt]`}
												>
													{pkg.features[idx]}
												</span>
											)}
										</td>
									))}
								</tr>
							))}
							<div className="h-6" />
							<tr
								className={`mt-4 ${
									featuresList.length % 2 === 0 ? 'bg-white' : ''
								}`}
							>
								<td className="p-4 font-bold mt-10"></td>
								{packagesDataDesktop.map((pkg, index) => (
									<td
										key={index}
										className={`px-[13px] py-[24px] mt-4 text-center font-bold font-inter text-[29pt] ${
											pkg.bgColor
										} ${pkg.bgColor ? 'rounded-[16pt]' : ''} ${
											pkg.name === translations[language].premiumPackage
												? 'text-white'
												: 'text-[#2073DB]'
										}`}
									>
										{pkg.price} <span className="text-sm">{pkg.perMonth}</span>
									</td>
								))}
							</tr>
						</tbody>
					</motion.table>
				</div>
			) : (
				<div className="flex flex-col gap-6 mt-10 font-poppins">
					{packagesDataMobile.map((pkg, index) => (
						<motion.div
							key={index}
							className={`flex flex-col p-6 rounded-2xl ${pkg.bgColor} ${pkg.borderColor} text-left ${pkg.textColor}`}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.2 }}
						>
							<div className="flex flex-row items-center justify-between">
								<div>
									<h3 className="text-base mb-2">{pkg.name}</h3>
									<p className="text-3xl font-semibold mb-4">
										{pkg.price}{' '}
										<span className="text-base">{pkg.perMonth}</span>
									</p>
								</div>
								<div
									className={`p-3 ${pkg.bgIconPackage} bg-opacity-10 rounded-full`}
								>
									<div
										className={`flex items-center justify-center ${pkg.bgIconPackage} bg-opacity-20 rounded-full p-2.5`}
									>
										<Icon
											icon={pkg.iconPackage}
											className={`w-9 h-9 ${pkg.textColor}`}
										/>
									</div>
								</div>
							</div>
							<ul className="mt-4 mb-8 space-y-2">
								{pkg.features.map((feature, idx) => (
									<li
										key={idx}
										className="flex items-center justify-between text-sm"
									>
										<span>{feature.name}</span>
										{typeof feature.available === 'boolean' ? (
											<Icon
												icon={
													feature.available
														? 'icon-park-solid:check-one'
														: 'ep:close-bold'
												}
												className={`w-5 h-5 ${
													feature.available
														? pkg.iconCheckColor
														: 'text-red-400'
												}`}
											/>
										) : (
											<span>{feature.available}</span>
										)}
									</li>
								))}
							</ul>
							<motion.button
								className={`px-4 py-2 rounded-lg font-semibold ${pkg.buttonSubscribeColor}`}
								whileHover={{ scale: 1.03 }}
								whileTap={{ scale: 0.97 }}
							>
								{translations[language].subscribeNow}
							</motion.button>
						</motion.div>
					))}
				</div>
			)}

			{/* Mobile Card Layout */}
		</div>
	)
}

export default Packages
