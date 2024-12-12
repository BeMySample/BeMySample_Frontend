import React, { useState } from 'react'
import { Icon } from '@iconify/react'

const Quote = ({
	viewMode,
	title,
	setTitle,
	description,
	setDescription,
	buttonText,
	buttonColor,
	buttonTextColor,
	textColor,
}) => {
	const [isEditingTitle, setIsEditingTitle] = useState(false)

	const handleTitleDoubleClick = () => {
		setIsEditingTitle(true)
	}

	const handleTitleBlur = (e) => {
		setIsEditingTitle(false)
		setTitle(e.target.value)
	}

	const handleTitleKeyPress = (e) => {
		if (e.key === 'Enter') {
			setIsEditingTitle(false)
			setTitle(e.target.value)
		}
	}

	return (
		<div
			className={`flex flex-col justify-center items-start text-gray-700 font-inter relative bg-cover bg-center rounded-lg ${
				viewMode === 'mobile' ? 'w-[375px] h-[720px] p-4' : 'w-full h-full p-6'
			}`}
		>
			<div className="flex flex-col items-start w-full max-w-[90%] text-center">
				{/* Quote Text */}
				<Icon
					icon="mdi:format-quote-open"
					className="text-4xl text-gray-600 inline-block mb-2"
				/>
				{isEditingTitle ? (
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						onBlur={handleTitleBlur}
						onKeyPress={handleTitleKeyPress}
						autoFocus
						className={`font-base mb-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 ${
							viewMode === 'mobile' ? 'text-[24px]' : 'text-[32px]'
						}`}
						style={{ color: textColor }}
					/>
				) : (
					<h1
						className={`mb-2 ${
							viewMode === 'mobile' ? 'text-[24px]' : 'text-[32px]'
						}`}
						style={{ color: textColor }}
						onDoubleClick={handleTitleDoubleClick}
					>
						{title || 'Isi kutipan di sini'}
					</h1>
				)}

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

export default Quote
