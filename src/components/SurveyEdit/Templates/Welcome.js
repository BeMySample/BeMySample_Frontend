import { Icon } from '@iconify/react'
import React, { useState } from 'react'

const Welcome = ({
	editMode,
	title,
	setTitle,
	description,
	setDescription,
	textColor,
	buttonColor,
	buttonText,
	buttonTextColor,
	viewMode,
}) => {
	const [isEditingTitle, setIsEditingTitle] = useState(false)
	const [isEditingDescription, setIsEditingDescription] = useState(false)

	const handleTitleDoubleClick = () => {
		if (editMode) {
			setIsEditingTitle(true)
		}
	}

	const handleDescriptionDoubleClick = () => {
		if (editMode) {
			setIsEditingDescription(true)
		}
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
			className={`flex flex-col items-center justify-center font-inter ${
				viewMode === 'mobile' ? 'w-[375px] h-[720px] p-6' : 'w-full h-full p-12'
			}`}
		>
			{editMode && isEditingTitle ? (
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					onBlur={handleTitleBlur}
					autoFocus
					className={`font-bold text-center mb-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 ${
						viewMode === 'mobile' ? 'text-[24px]' : 'text-[32px]'
					}`}
					style={{ color: textColor }}
				/>
			) : (
				<h1
					className={`font-bold text-center mb-2 ${
						viewMode === 'mobile' ? 'text-[24px]' : 'text-[32px]'
					}`}
					style={{ color: textColor }}
					onDoubleClick={handleTitleDoubleClick}
				>
					{title || 'Selamat datang!'}
				</h1>
			)}

			{editMode && isEditingDescription ? (
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
					{description || 'Silakan klik tombol di bawah untuk memulai survei.'}
				</p>
			)}

			<button
				className={`py-2 px-4 rounded-lg flex flex-row gap-2 items-center justify-center ${
					viewMode === 'mobile' ? 'text-base' : 'text-lg'
				}`}
				style={{ backgroundColor: buttonColor, color: buttonTextColor }}
			>
				<Icon icon="solar:play-bold" />
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

export default Welcome
