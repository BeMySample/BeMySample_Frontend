import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import bgRect from '../../assets/images/Rectangle.png'
import circlePict from '../../assets/images/footer_circle_round.png'

const Footer = () => {
	// Refs to track if elements are in view
	const bgRectRef = useRef(null)
	const textRef = useRef(null)
	const buttonRef = useRef(null)
	const circlePictRef = useRef(null)
	const footerTextRef = useRef(null)

	// Check if elements are in view
	const isBgRectInView = useInView(bgRectRef, { once: true })
	const isTextInView = useInView(textRef, { once: true })
	const isButtonInView = useInView(buttonRef, { once: true })
	const isCirclePictInView = useInView(circlePictRef, { once: true })
	const isFooterTextInView = useInView(footerTextRef, { once: true })

	return (
		<div className="relative flex flex-col items-end justify-end w-full bg-white h-[703px] mt-40">
			{/* Background Image Animation */}
			<motion.img
				ref={bgRectRef}
				className="absolute bottom-0 w-full h-auto object-cover rounded-xl"
				src={bgRect}
				alt="bg-rect"
				initial={{ opacity: 0, y: 50 }}
				animate={isBgRectInView ? { opacity: 1, y: 0 } : {}}
				transition={{ delay: 1, duration: 1 }}
			/>

			<div className="relative flex flex-col items-end w-full p-4 gap-20 px-20">
				<div className="flex flex-row items-center justify-center w-full">
					{/* Text and Button Animation */}
					<motion.div
						ref={textRef}
						className="flex flex-col items-start w-full gap-[16px]"
						initial={{ opacity: 0, y: 50 }}
						animate={isTextInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8 }}
					>
						<motion.p
							className="text-[45px] text-center"
							initial={{ opacity: 0 }}
							animate={isTextInView ? { opacity: 1 } : {}}
							transition={{ delay: 0.5, duration: 1 }}
						>
							Siap Meluncur?
						</motion.p>
						<motion.button
							ref={buttonRef}
							className="px-4 py-2 rounded-[8px] text-[18pt] font-bold bg-[#1F38DB] text-white mt-2 font-inter"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							animate={isButtonInView ? {} : { scale: 0 }}
							transition={{ duration: 0.2 }}
						>
							Buat Survei
						</motion.button>
					</motion.div>

					{/* Circle Picture Animation */}
					<motion.div
						ref={circlePictRef}
						className="w-fit"
						initial={{ opacity: 0, x: 50 }}
						animate={isCirclePictInView ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.8 }}
					>
						<img
							src={circlePict}
							alt="circle-pict"
							className="max-w-[600px] h-auto"
						/>
					</motion.div>
				</div>

				{/* Footer Text and Contact Button */}
				<div className="flex flex-row items-center gap-8 pb-20">
					<motion.p
						ref={footerTextRef}
						className="font-inter text-[16pt] text-right"
						initial={{ opacity: 0 }}
						animate={isFooterTextInView ? { opacity: 1 } : {}}
						transition={{ duration: 1 }}
					>
						© 2024 BeMySample. All Rights Reserved.
					</motion.p>
					<motion.button
						className="px-4 py-2 rounded-[8px] text-[18pt] font-bold bg-white text-black mt-2 font-inter"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						transition={{ duration: 0.2 }}
					>
						Hubungi Kami
					</motion.button>
				</div>
			</div>
		</div>
	)
}

export default Footer
