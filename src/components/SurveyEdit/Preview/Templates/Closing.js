import React from 'react'
import { Icon } from '@iconify/react'

const Closing = ({
	title,
	description,
	textColor = '#000000',
	buttonColor = '#FF0000',
	onButtonClick,
	viewMode, // Menambahkan viewMode sebagai prop
}) => {
	return (
		<div
			className={`flex flex-col items-center justify-center text-center space-y-4 rounded-lg ${
				viewMode === 'mobile' ? 'w-[375px] h-[720px] p-4' : 'w-full h-full p-8'
			}`}
			style={{ color: textColor }}
		>
			<div className="flex items-center justify-center mb-4">
				<Icon
					icon="mdi:flag-checkered"
					className="text-6xl"
					style={{ color: textColor }}
				/>
			</div>

			<h1 className="text-3xl font-bold">{title || 'Isi Judul di sini'}</h1>
			<p className="text-lg">{description || 'Isi deskripsi di sini'}</p>

			<button
				className="py-2 px-6 rounded-lg mt-4 text-lg font-semibold flex items-center justify-center"
				style={{ backgroundColor: buttonColor, color: '#FFFFFF' }}
				onClick={onButtonClick}
			>
				<Icon icon="mdi:exit-to-app" className="mr-2" />
				Selesai
			</button>
		</div>
	)
}

export default Closing
