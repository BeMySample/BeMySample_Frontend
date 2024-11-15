import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import bgRect from '../../assets/images/Rectangle.png'
import circlePict from '../../assets/images/footer_circle_round.png'

const translations = {
	en: {
		readyToLaunch: 'Ready to Launch?',
		makeSurvey: 'Create Survey',
		contactUs: 'Contact Us',
		copyright: '© 2024 BeMySample. All Rights Reserved.',
	},
	id: {
		readyToLaunch: 'Siap Meluncur?',
		makeSurvey: 'Buat Survei',
		contactUs: 'Hubungi Kami',
		copyright: '© 2024 BeMySample. Seluruh Hak Cipta Dilindungi.',
	},
}

const Footer = ({ language }) => {
	const bgRectRef = useRef(null)
	const textRef = useRef(null)
	const buttonRef = useRef(null)
	const circlePictRef = useRef(null)
	const footerTextRef = useRef(null)

	const isBgRectInView = useInView(bgRectRef, { once: true })
	const isTextInView = useInView(textRef, { once: true })
	const isButtonInView = useInView(buttonRef, { once: true })
	const isCirclePictInView = useInView(circlePictRef, { once: true })
	const isFooterTextInView = useInView(footerTextRef, { once: true })

	return (
		<div className="relative flex flex-col items-center justify-end w-full bg-white h-auto mt-10 font-inter">
			{/* Background Image */}
			<motion.img
				ref={bgRectRef}
				className="absolute bottom-0 w-full h-auto object-cover rounded-xl"
				src={bgRect}
				alt="bg-rect"
				initial={{ opacity: 0, y: 50 }}
				animate={isBgRectInView ? { opacity: 1, y: 0 } : {}}
				transition={{ delay: 1, duration: 1 }}
			/>

			{/* Main Content */}
			<div className="relative flex flex-col items-center w-full p-4 sm:p-8 lg:px-20 lg:py-12 gap-10">
				<div className="flex flex-col lg:flex-row items-center justify-between w-full gap-10">
					{/* Text and Button */}
					<motion.div
						ref={textRef}
						className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4"
						initial={{ opacity: 0, y: 50 }}
						animate={isTextInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8 }}
					>
						<motion.p
							className="text-2xl sm:text-3xl lg:text-4xl font-semibold"
							initial={{ opacity: 0 }}
							animate={isTextInView ? { opacity: 1 } : {}}
							transition={{ delay: 0.5, duration: 1 }}
						>
							{translations[language].readyToLaunch}
						</motion.p>
						<motion.button
							ref={buttonRef}
							className="px-6 py-3 rounded-md text-lg sm:text-xl font-bold bg-[#1F38DB] text-white mt-2"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							animate={isButtonInView ? {} : { scale: 0 }}
							transition={{ duration: 0.2 }}
						>
							{translations[language].makeSurvey}
						</motion.button>
					</motion.div>

					{/* Circle Image */}
					<motion.div
						ref={circlePictRef}
						className="w-full lg:w-auto max-w-xs lg:max-w-md"
						initial={{ opacity: 0, x: 50 }}
						animate={isCirclePictInView ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.8 }}
					>
						<img src={circlePict} alt="circle-pict" className="w-full h-auto" />
					</motion.div>
				</div>

				{/* Footer Links and Text */}
				<div className="flex flex-col lg:flex-row items-center lg:justify-between w-full gap-6 lg:gap-8 pt-8 border-t border-gray-300">
					<motion.p
						ref={footerTextRef}
						className="text-sm sm:text-base text-center lg:text-right"
						initial={{ opacity: 0 }}
						animate={isFooterTextInView ? { opacity: 1 } : {}}
						transition={{ duration: 1 }}
					>
						{translations[language].copyright}
					</motion.p>
					<motion.button
						className="px-4 py-2 rounded-md text-base font-semibold bg-white text-black border border-gray-300 hover:bg-gray-100"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						transition={{ duration: 0.2 }}
					>
						{translations[language].contactUs}
					</motion.button>
				</div>
			</div>
		</div>
	)
}

export default Footer
