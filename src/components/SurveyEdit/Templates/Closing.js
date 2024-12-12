import React, { useState } from 'react'
import { Icon } from '@iconify/react'

const Closing = ({
	title,
	description,
	setTitle,
	setDescription,
	textColor,
	buttonColor,
	viewMode,
	toggleResponseCopy,
}) => {
	const [isEditingTitle, setIsEditingTitle] = useState(false)
	const [isEditingDescription, setIsEditingDescription] = useState(false)

	return (
		<div
			className={`flex flex-col items-center justify-center text-center space-y-4 rounded-lg cursor-default ${
				viewMode === 'mobile' ? 'w-[375px] h-[720px] p-4' : 'w-full h-full p-8'
			}`}
			style={{ color: textColor }}
		>
			{/* Title */}
			{isEditingTitle ? (
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					onBlur={() => setIsEditingTitle(false)}
					autoFocus
					className="text-3xl font-bold text-center border-b border-gray-400 outline-none"
				/>
			) : (
				<h1
					className="text-3xl font-bold"
					onDoubleClick={() => setIsEditingTitle(true)}
				>
					{title || 'Isi judul di sini'}
				</h1>
			)}

			{/* Description */}
			{isEditingDescription ? (
				<input
					type="text"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					onBlur={() => setIsEditingDescription(false)}
					autoFocus
					className="text-lg text-center border-b border-gray-400 outline-none resize-none"
				/>
			) : (
				<p
					className="text-lg"
					onDoubleClick={() => setIsEditingDescription(true)}
				>
					{description || 'Isi deskripsi di sini'}
				</p>
			)}

			{/* Button */}
			{toggleResponseCopy && (
				<div
					className="py-2 px-6 rounded-lg mt-4 text-lg font-semibold flex items-center justify-center"
					style={{ backgroundColor: buttonColor, color: '#FFFFFF' }}
				>
					<Icon icon="line-md:email-filled" className="mr-2" fontSize={28} />
					Dapatkan Salinan Respons
				</div>
			)}
		</div>
	)
}

export default Closing
