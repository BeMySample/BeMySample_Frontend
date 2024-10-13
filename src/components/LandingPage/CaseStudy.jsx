import React, { useRef } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { motion, useInView } from 'framer-motion'
import pict from '../../assets/images/c1.png'
import pict2 from '../../assets/images/c2.png'
import pict3 from '../../assets/images/c3.png'

const CaseStudy = () => {
	const sections = [
		{
			title: 'Tugas Sekolah Selesai Lebih Mudah',
			description:
				'Observasi data dapat diolah lebih cepat dengan tingginya jumlah responden yang ingin berkontribusi',
			image: pict2,
		},
		{
			title: 'Observasi Lebih Mendalam dan Variatif',
			description:
				'Kuantitas data yang sedikit berpengaruh buruk hasil observasi tugas akhir Anda. Dengan BeMySample, Anda dapat menarik calon responden yang menjadi sasaran Anda dengan menggunakan MyPoin',
			image: pict,
		},
		{
			title: 'Latar Belakang Lebih Menggugah',
			description:
				'Dengan data pendukung yang melimpah, pernyataan Anda akan makin meyakinkan, tentunya dengan jaminan validitas data',
			image: pict3,
		},
	]

	const responsive = {
		superLarge: {
			breakpoint: { max: 4000, min: 3000 },
			items: 3,
		},
		large: {
			breakpoint: { max: 3000, min: 1024 },
			items: 3,
		},
		medium: {
			breakpoint: { max: 1024, min: 464 },
			items: 1,
		},
		small: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
		},
	}

	const carouselRef = useRef(null)
	const isCarouselInView = useInView(carouselRef, { once: true })

	return (
		<div
			ref={carouselRef}
			className="w-full py-10 gap-6 px-6 bg-gradient-to-r from-[#6AA9F0] to-[#2073DB] text-center"
		>
			<motion.p
				className="text-[45px] text-white mb-10"
				initial={{ opacity: 0, y: 50 }}
				animate={isCarouselInView ? { opacity: 1, y: 0 } : {}}
				transition={{ duration: 0.8 }}
			>
				Studi Kasus
			</motion.p>

			<Carousel
				responsive={responsive}
				infinite
				autoPlay
				autoPlaySpeed={3000}
				transitionDuration={500}
				showDots
				dotListClass="custom-dot-list-style"
				containerClass="carousel-container"
			>
				{sections.map((section, index) => (
					<motion.div
						key={index}
						className="flex flex-col justify-start items-center bg-white rounded-[32px] px-[32px] py-[30px] mx-5 gap-[28px] h-full"
						initial={{ opacity: 0, y: 50 }}
						animate={isCarouselInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8, delay: index * 0.3 }}
					>
						<img
							src={section.image}
							alt={section.title}
							className="h-auto w-auto"
						/>
						<div className="flex flex-col items-start">
							<p className="text-[32px] font-bold font-inter">
								{section.title}
							</p>
							<p className="text-[16px] font-inter">{section.description}</p>
						</div>
					</motion.div>
				))}
			</Carousel>
		</div>
	)
}

export default CaseStudy
