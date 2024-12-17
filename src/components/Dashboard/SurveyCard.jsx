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
	coinAllocated,
	coinUsed,
	onEdit,
	onDelete,
	isActive,
	onToggleMenu,
	isCreatedByAI,
}) => {
	const menuRef = useRef(null)

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				onToggleMenu(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [onToggleMenu])

	const formatDate = (isoString) => {
		// Ubah ISO string menjadi objek Date
		const date = new Date(isoString)

		// Format tanggal menjadi format yang mudah dibaca
		const options = {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			hour12: false, // Gunakan format 24 jam
			timeZone: 'Asia/Jakarta', // Sesuaikan timezone jika perlu
		}

		return new Intl.DateTimeFormat('id-ID', options).format(date)
	}

	return (
		<div className="relative flex flex-row items-center justify-between bg-gradient-to-r from-transparent to-[#F5F5F5] rounded-r-[16px] pr-[16px] w-full md:w-auto font-inter">
			<div className="flex flex-row items-center">
				<div className="flex flex-row">
					<p
						className={`px-2 py-1.5 rounded-l-xl text-center flex items-center justify-center gap-2 font-inter z-10 text-white text-xs ${
							status === 'draft' ? 'bg-gray-400' : 'bg-[#2073DB]'
						}`}
					>
						<p style={{ writingMode: 'vertical-lr', rotate: '180deg' }}>
							{status === 'draft' && 'Draf'}
							{status === 'published' && 'Terbit'}
						</p>
					</p>
					<img
						src={image || C1}
						alt="Survey Cover"
						className="h-[105px] min-w-[180px] md:w-[244px] object-cover rounded-r-[16px]"
					/>
				</div>
				<div className="px-4 md:px-8">
					<div className="flex flex-row gap-2 items-center mb-2">
						<p className="font-bold font-inter text-[16px]">{title}</p>
						{isCreatedByAI === 1 && (
							<span className="flex flex-row gap-1 items-center bg-gradient-to-r from-blue-400 to-blue-500 rounded-full px-2.5 py-1 text-white text-sm">
								<p>AI</p>
								<Icon icon="ri:gemini-fill" fontSize={16} />
							</span>
						)}
					</div>
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
								icon="akar-icons:coin"
								className="text-[13.33px] text-[#595959]"
							/>
							<p className="text-[12px]">{coinAllocated} koin </p>
						</div>
						<div className="flex flex-row items-center gap-2 font-inter">
							<Icon
								icon="mdi:clock"
								className="text-[13.33px] text-[#595959]"
							/>
							<p className="text-[12px]">{formatDate(updated)}</p>
						</div>
					</div>
				</div>
			</div>
			<div className="relative">
				<Icon
					icon="bi:three-dots-vertical"
					className="text-[#595959] text-[36px] cursor-pointer hover:bg-zinc-200 rounded-full p-2"
					onClick={() => onToggleMenu(!isActive)}
				/>

				{/* AnimatePresence for smooth entrance/exit animations */}
				<AnimatePresence>
					{isActive && (
						<motion.div
							ref={menuRef}
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.2 }}
							className="absolute -top-10 right-12 mt-2 w-28 bg-white shadow-md rounded-md p-2 z-20"
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
