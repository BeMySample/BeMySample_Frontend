import { Icon } from '@iconify/react'
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
			className={`py-2 px-4 rounded-lg flex flex-row gap-2 items-center justify-center ${
				viewMode === 'mobile' ? 'text-base' : 'text-lg'
			}`}
			style={{ backgroundColor: buttonColor, color: '#FFFFFF' }}
		>
			<Icon icon="solar:play-bold" />
			{buttonText}
		</button>
		<p>
			<small className="text-xs">
				atau tekan <kbd>Enter</kbd>
			</small>
		</p>
	</div>
)

export default Welcome
