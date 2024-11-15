import React from 'react'
import { Icon } from '@iconify/react'

const LongText = ({ viewMode }) => {
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
				{/* Prompt Text */}
				<h1 className="text-2xl font-bold text-black mb-2">
					Ceritakan mengapa Anda menyukai opsi{' '}
					<span className="text-red-600">@Mana yang paling tepat...</span>
				</h1>
				<p className="text-gray-600 mb-4">
					Tak kenal, maka tak sayang{' '}
					<span role="img" aria-label="smile">
						🥰
					</span>
				</p>

				{/* Long Text Input Field */}
				<textarea
					placeholder="Kolom isian teks panjang"
					className="w-full p-3 border border-gray-400 rounded-lg text-lg text-gray-800 bg-transparent focus:outline-none resize-none"
					rows="4"
				/>

				{/* Next Button */}
				<button
					className="w-full mt-4 py-2 bg-red-600 text-white text-lg font-semibold rounded-lg flex justify-center items-center"
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

export default LongText
