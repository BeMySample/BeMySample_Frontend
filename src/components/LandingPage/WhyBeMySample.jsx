import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

const translations = {
	en: {
		title: 'Why BeMySample?',

		contributiveSystem: 'Contributive System',
		contributiveSystemDesc:
			'Help each other and get MyPoin to create your own survey',
		integrationAI: 'AI Integration',
		integrationAIDesc:
			'Create surveys faster with AI and personalize as needed',
		completeAnalysis: 'Complete Analysis',
		completeAnalysisDesc:
			'Rich information dashboard to facilitate your research',
	},
	id: {
		title: 'Kenapa BeMySample?',

		contributiveSystem: 'Sistem Kontributif',
		contributiveSystemDesc:
			'Saling bantu dan dapatkan MyPoin untuk membuat survei sendiri',
		integrationAI: 'Integrasi AI',
		integrationAIDesc:
			'Buat survei lebih cepat dengan AI dan personalisasikan sesuai kebutuhan',
		completeAnalysis: 'Analisis Lengkap',
		completeAnalysisDesc:
			'Dashboard yang kaya informasi untuk memudahkan riset Anda',
	},
}

const WhyBeMySample = ({ language }) => {
	const features = [
		{
			icon: 'material-symbols:handshake',
			title: translations[language].contributiveSystem,
			description: translations[language].contributiveSystemDesc,
			bgColor: 'bg-blue-500',
		},
		{
			icon: 'mingcute:ai-fill',
			title: translations[language].integrationAI,
			description: translations[language].integrationAIDesc,
			bgColor: 'bg-blue-500',
		},
		{
			icon: 'akar-icons:statistic-up',
			title: translations[language].completeAnalysis,
			description: translations[language].completeAnalysisDesc,
			bgColor: 'bg-blue-500',
		},
	]

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
		<motion.div
			id="whyBeMySample"
			className="flex flex-col items-center justify-center w-full py-20 gap-12 px-4 sm:px-6 lg:px-20"
			initial={{ opacity: 0, y: 20 }}
			animate={isVisible ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 0.5 }}
		>
			<p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-bold">
				{translations[language].title}
			</p>

			<div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12 w-full max-w-8xl">
				{features.map((feature, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 20 }}
						animate={isVisible ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.5, delay: index * 0.3 }}
						className={`flex flex-col justify-center items-center gap-4 ${feature.bgColor} rounded-lg p-6 w-full sm:w-72 md:w-80 lg:w-96 text-white`}
					>
						<Icon
							icon={feature.icon}
							className="text-[80px] sm:text-[100px] md:text-[120px]"
						/>

						<div className="flex flex-col items-center justify-center w-full text-white">
							<p className="text-lg sm:text-xl md:text-2xl font-bold font-inter text-center text-white">
								{feature.title}
							</p>
							<p className="text-sm sm:text-base md:text-lg font-inter text-center text-white">
								{feature.description}
							</p>
						</div>
					</motion.div>
				))}
			</div>
		</motion.div>
	)
}

export default WhyBeMySample
