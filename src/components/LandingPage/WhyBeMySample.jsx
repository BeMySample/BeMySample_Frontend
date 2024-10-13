import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

const features = [
	{
		icon: 'material-symbols:handshake',
		title: 'Sistem Kontributif',
		description:
			'Saling bantu dan dapatkan MyPoin untuk membuat survei sendiri',
		// bgColor: '#8BD5E8',
		bgColor: 'bg-blue-500',
	},
	{
		icon: 'mingcute:ai-fill',
		title: 'Integrasi AI',
		description:
			'Buat survei lebih cepat dengan AI dan personalisasikan sesuai kebutuhan',
		// bgColor: '#6AA9F0',
		bgColor: 'bg-blue-500',
	},
	{
		icon: 'akar-icons:statistic-up',
		title: 'Analisis Lengkap',
		description: 'Dashboard yang kaya informasi untuk memudahkan riset Anda',
		// bgColor: '#D2C6F1',
		bgColor: 'bg-blue-500',
	},
]

const WhyBeMySample = () => {
	const [isVisible, setIsVisible] = useState(false)

	const handleScroll = () => {
		const section = document.getElementById('whyBeMySample')
		const rect = section.getBoundingClientRect()
		if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
			setIsVisible(true)
			window.removeEventListener('scroll', handleScroll) // Menghapus event listener setelah terlihat
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<div
			id="whyBeMySample"
			className="flex flex-col items-center justify-center w-full py-20 gap-[45px] px-6"
		>
			<p className="text-[45px] text-center">Kenapa BeMySample?</p>

			<div className="flex flex-row items-center justify-between gap-[29px] text-white h-full">
				{features.map((feature, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 20 }}
						animate={isVisible ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.5, delay: index * 0.3 }}
						className={`flex flex-col justify-center items-center gap-4 ${feature.bgColor} rounded-[16px] p-6 h-full`}
					>
						<Icon icon={feature.icon} className="size-[143px]" />

						<div className="flex flex-col items-center justify-center">
							<p className="text-[32px] font-bold font-inter text-center">
								{feature.title}
							</p>
							<p className="text-[16px] font-inter text-center">
								{feature.description}
							</p>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	)
}

export default WhyBeMySample