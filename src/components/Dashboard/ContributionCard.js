import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

const ContributionCard = ({ title, updated, coins, image }) => {
	return (
		<motion.div
			className="flex flex-col items-center justify-between bg-[#F5F5F5] rounded-2xl w-full"
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5 }}
		>
			<img
				src={image}
				alt=""
				className="h-[98px] w-full object-cover rounded-t-2xl"
			/>
			<div className="px-6 py-4 flex flex-col items-start justify-start w-full">
				<p className="font-bold font-inter text-[16px]">{title}</p>
				<div className="flex flex-row gap-[16px]">
					<div className="flex flex-row items-center gap-2 font-inter">
						<Icon
							icon="akar-icons:coin"
							className="text-[13.33px] text-[#595959]"
						/>
						<p className="text-[12px]">Dapatkan {coins}</p>
					</div>
				</div>
			</div>
		</motion.div>
	)
}

export default ContributionCard
