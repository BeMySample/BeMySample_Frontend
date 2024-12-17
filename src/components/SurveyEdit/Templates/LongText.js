import React, { useState } from 'react'
import { Icon } from '@iconify/react'

const LongText = ({
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
			className={`flex flex-col justify-center items-start text-gray-700 font-inter relative bg-cover bg-center rounded-lg ${
				viewMode === 'mobile' ? 'w-[375px] h-[720px] p-4' : 'w-full h-full p-6'
			}`}
		>
			<div className="flex flex-col items-start w-full max-w-[90%]">
				{/* Prompt Text */}
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
						{title || 'Siapa nama Anda?'}
					</h1>
				)}
				{isEditingDescription ? (
					<input
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						onBlur={handleDescriptionBlur}
						autoFocus
						className={`font-normal mb-4 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 ${
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
						{description || 'Tak kenal, maka tak sayang 🥰'}
					</p>
				)}

				{/* Long Text Input Field */}
				<textarea
					placeholder="Kolom isian teks panjang"
					className="w-full p-3 border border-gray-400 rounded-lg text-lg text-gray-800 bg-transparent focus:outline-none resize-none mb-4"
					rows="4"
				/>

				{/* Next Button */}
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
		</div>
	)
}

export default LongText
