import React from 'react'
import { Icon } from '@iconify/react'

const Quote = ({ viewMode }) => {
	return (
		<div
			className={`flex flex-col justify-center items-center text-gray-700 font-inter relative bg-cover bg-center rounded-lg ${
				viewMode === 'mobile' ? 'w-[375px] h-[720px] p-4' : 'w-full h-full p-6'
			}`}
			style={{
				backgroundImage: 'url("/path/to/your/background-image.jpg")',
				backgroundColor: 'rgba(255, 255, 255, 0.7)',
				backgroundBlendMode: 'overlay',
			}}
		>
			<div className="flex flex-col items-center w-full max-w-[90%] text-center">
				{/* Quote Text */}
				<Icon
					icon="mdi:format-quote-open"
					className="text-4xl text-gray-600 inline-block mb-2"
				/>
				<h1 className="text-2xl font-bold text-black mb-4">
					Selanjutnya, Anda akan menceritakan pengalaman Anda!
				</h1>

				{/* Next Button */}
				<button
					className="w-full py-2 bg-red-600 text-white text-lg font-semibold rounded-lg flex justify-center items-center"
					onClick={() => alert('Lanjut ke bagian berikutnya')}
				>
					Lanjut
				</button>
				<p className="text-sm text-gray-500 mt-2 text-center">
					atau tekan Enter ↵
				</p>
			</div>
		</div>
	)
}

export default Quote
