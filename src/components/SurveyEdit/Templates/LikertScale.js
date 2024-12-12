import React, { useState } from 'react'
import { Icon } from '@iconify/react'

const LikertScale = ({
	viewMode,
	title,
	setTitle,
	description,
	setDescription,
	textColor,
	buttonColor,
	buttonText,
	buttonTextColor,
	mustBeFilled,
	smallLabel,
	midLabel,
	largeLabel,
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

	const [selectedRating, setSelectedRating] = useState(0)

	// Labels untuk setiap nilai likert (3 labels untuk 5 bintang)
	const labels = {
		1: smallLabel,
		3: midLabel,
		5: largeLabel,
	}

	return (
		<div
			className={`flex flex-col justify-center items-center text-gray-700 font-inter relative bg-cover bg-center rounded-lg ${
				viewMode === 'mobile' ? 'w-[375px] h-[720px] p-4' : 'w-full h-full p-6'
			}`}
		>
			<div className="flex flex-col items-center w-full max-w-[90%] text-center">
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
						{title || 'Isi judul di sini'}
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
						{description || 'Isi deskripsi di sini'}
					</p>
				)}

				{/* Likert Scale Options */}
				<div className="grid grid-cols-5 gap-6 mb-4 w-full max-w-[90%]">
					{[1, 2, 3, 4, 5].map((value) => (
						<div key={value} className="flex flex-col items-center text-center">
							<button
								onClick={() => setSelectedRating(value)}
								className="text-6xl text-gray-400 focus:outline-none"
							>
								<Icon
									icon={
										selectedRating >= value
											? 'solar:star-bold'
											: 'solar:star-line-duotone'
									}
									className={`${
										selectedRating >= value
											? 'text-yellow-500'
											: 'text-gray-400'
									}`}
								/>
							</button>
							{labels[value] && (
								<p className="text-xs text-gray-600 mt-1 whitespace-nowrap">
									{labels[value]}
								</p>
							)}
						</div>
					))}
				</div>

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

export default LikertScale
