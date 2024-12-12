import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useState } from 'react'

const Time = ({
	viewMode,
	title,
	description,
	setTitle,
	setDescription,
	buttonText,
	buttonColor,
	buttonTextColor,
	textColor,
	mustBeFilled,
}) => {
	const [isEditingTitle, setIsEditingTitle] = useState(false)
	const [isEditingDescription, setIsEditingDescription] = useState(false)

	const handleTitleDoubleClick = () => {
		setIsEditingTitle(true)
	}

	const handleDescriptionDoubleClick = () => {
		setIsEditingDescription(true)
	}

	const handleTitleBlur = (e) => {
		setIsEditingTitle(false)
		setTitle(e.target.value)
	}

	const handleDescriptionBlur = (e) => {
		setIsEditingDescription(false)
		setDescription(e.target.value)
	}

	return (
		<div
			className={`flex flex-col items-start justify-center ${
				viewMode === 'mobile' ? 'w-[375px] h-[720px] p-4' : 'w-full h-full p-6'
			}`}
		>
			{isEditingTitle ? (
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					onBlur={handleTitleBlur}
					autoFocus
					className={`font-bold mb-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 ${
						viewMode === 'mobile' ? 'text-[24px]' : 'text-[32px]'
					}`}
					style={{ color: textColor }}
				/>
			) : (
				<h1
					className={`font-bold mb-2 ${
						viewMode === 'mobile' ? 'text-[24px]' : 'text-[32px]'
					}`}
					style={{ color: textColor }}
					onDoubleClick={handleTitleDoubleClick}
				>
					{title || 'Mohon masukkan tanggal lahir'}
				</h1>
			)}

			{isEditingDescription ? (
				<input
					type="text"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					onBlur={handleDescriptionBlur}
					autoFocus
					className={`font-normal mb-4 text-center border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 ${
						viewMode === 'mobile' ? 'text-[16px]' : 'text-[18px]'
					}`}
					style={{ color: textColor }}
				/>
			) : (
				<p
					className={`font-normal ${
						viewMode === 'mobile' ? 'text-[16px]' : 'text-[18px]'
					} mb-4`}
					style={{ color: textColor }}
					onDoubleClick={handleDescriptionDoubleClick}
				>
					{description || 'Klik isian di bawah untuk menampilkan kalender'}
				</p>
			)}
			<input
				type="date"
				placeholder="Masukkan teks singkat..."
				className={`p-2 rounded border border-gray-300 mb-4 ${
					viewMode === 'mobile' ? 'w-[85%]' : 'w-[40%]'
				}`}
			/>
			<input
				type="time"
				placeholder="Masukkan teks singkat..."
				className={`p-2 rounded border border-gray-300 mb-4 ${
					viewMode === 'mobile' ? 'w-[85%]' : 'w-[40%]'
				}`}
			/>
			<button
				className={`py-2 px-4 rounded-lg ${
					viewMode === 'mobile' ? 'text-base' : 'text-lg'
				}`}
				style={{ backgroundColor: buttonColor, color: buttonTextColor }}
			>
				<p
					className={`font-semibold ${
						viewMode === 'mobile' ? 'text-[16px]' : 'text-[18px]'
					}`}
				>
					{buttonText}
				</p>
			</button>
		</div>
	)
}

export default Time
