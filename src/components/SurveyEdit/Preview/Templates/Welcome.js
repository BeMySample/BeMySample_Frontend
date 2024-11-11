import React from 'react'

const Welcome = ({ textColor, buttonColor, buttonText, viewMode }) => (
	<div
		className={`flex flex-col items-center justify-center font-inter ${
			viewMode === 'mobile' ? 'w-[375px] h-[720px] p-6' : 'w-full h-full p-12'
		}`}
	>
		<h1
			className={`font-bold mb-2 ${
				viewMode === 'mobile' ? 'text-[24px]' : 'text-[32px]'
			}`}
			style={{ color: textColor }}
		>
			Selamat datang
		</h1>
		<p
			className={`font-normal ${
				viewMode === 'mobile' ? 'text-[16px]' : 'text-[18px]'
			} mb-4 text-center`}
			style={{ color: textColor }}
		>
			Mari mengisi survei ini!
		</p>
		<button
			className={`py-2 px-6 rounded-lg ${
				viewMode === 'mobile' ? 'text-base' : 'text-lg'
			}`}
			style={{ backgroundColor: buttonColor, color: '#FFFFFF' }}
		>
			{buttonText}
		</button>
	</div>
)

export default Welcome
