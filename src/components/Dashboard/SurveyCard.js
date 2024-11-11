import React, { useState, useRef, useEffect } from 'react'
import { Icon } from '@iconify/react'
import Swal from 'sweetalert2'
import C1 from '../../assets/images/SurveyCover.png'
import { motion, AnimatePresence } from 'framer-motion'

const SurveyCard = ({
	title,
	respondents,
	updated,
	image,
	status,
	onEdit,
	onDelete,
	isActive,
	onToggleMenu,
}) => {
	const menuRef = useRef(null) // Ref for the menu

	useEffect(() => {
		// Close the menu when clicking outside
		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				onToggleMenu(false) // Close the menu when clicking outside
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [onToggleMenu])

	return (
		<div className="relative flex flex-row items-center justify-between bg-[#F5F5F5] rounded-r-[16px] pr-[16px] w-full md:w-auto font-inter">
			<div className="flex flex-row items-center">
				<div className="relative">
					<img
						src={C1} // replace with default image path if needed
						alt="Survey Cover"
						className="h-[94px] w-[100%] md:w-[244px] object-cover rounded-l-[16px]"
					/>
					<p
						className={`absolute bottom-0 right-0 w-[116px] h-[35px] text-center flex items-center justify-center gap-2 font-inter z-10 text-white text-xs rounded-tl-lg ${
							status === 'open'
								? 'bg-[#1F38DB]'
								: status === 'closed'
								? 'bg-[#EB221E]'
								: 'bg-[#5A5A5A]'
						}`}
					>
						{status === 'open' && 'Dibuka'}
						{status === 'closed' && 'Terhenti'}
						{status === 'draft' && 'Draft'}
					</p>
				</div>
				<div className="px-4 md:px-8">
					<p className="font-bold font-inter text-[16px]">{title}</p>
					<div className="flex flex-row gap-[16px] flex-wrap">
						<div className="flex flex-row items-center gap-2 font-inter">
							<Icon
								icon="material-symbols:person"
								className="text-[13.33px] text-[#595959]"
							/>
							<p className="text-[12px]">{respondents} responden</p>
						</div>
						<div className="flex flex-row items-center gap-2 font-inter">
							<Icon
								icon="mdi:clock"
								className="text-[13.33px] text-[#595959]"
							/>
							<p className="text-[12px]">{updated}</p>
						</div>
					</div>
				</div>
			</div>
			<div className="relative">
				<Icon
					icon="bi:three-dots-vertical"
					className="text-[#595959] text-[36px] cursor-pointer hover:bg-zinc-200 rounded-full p-2"
					onClick={() => onToggleMenu(!isActive)} // Toggle the menu
				/>

				{/* AnimatePresence for smooth entrance/exit animations */}
				<AnimatePresence>
					{isActive && (
						<motion.div
							ref={menuRef} // Attach ref to the menu
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.2 }}
							className="absolute -top-10 left-10 mt-2 w-28 bg-white shadow-md rounded-md p-2 z-20"
						>
							<div
								onClick={onEdit}
								className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
							>
								<Icon icon="material-symbols:edit" className="text-blue-500" />
								<span className="text-blue-500">Edit</span>
							</div>
							<div
								onClick={onDelete}
								className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded text-red-500"
							>
								<Icon icon="material-symbols:delete" />
								<span>Hapus</span>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	)
}

export default SurveyCard
