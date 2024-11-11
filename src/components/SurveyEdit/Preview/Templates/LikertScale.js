import React, { useState } from 'react'
import { Icon } from '@iconify/react'

const LikertScale = ({ viewMode }) => {
	const [selectedRating, setSelectedRating] = useState(0)

	// Labels untuk setiap nilai likert
	const labels = [
		'Sangat tidak nyaman',
		'Tidak nyaman',
		'Cukup nyaman',
		'Nyaman',
		'Sangat nyaman',
	]

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
					Secara menyeluruh, dari 1 hingga 5, bagaimana kenyamanan pengalaman
					Anda?
				</h1>
				<p className="text-gray-600 mb-4">
					Gunakan <span className="italic">likert</span> di bawah
				</p>

				{/* Likert Scale Options */}
				<div className="flex justify-between space-x-2 mb-4 w-full max-w-[90%]">
					{labels.map((label, index) => (
						<div key={index} className="flex flex-col items-center text-center">
							<button
								onClick={() => setSelectedRating(index + 1)}
								className="text-4xl text-gray-400 focus:outline-none"
							>
								<Icon
									icon="mdi:star-outline"
									className={`${
										selectedRating >= index + 1
											? 'text-yellow-500'
											: 'text-gray-400'
									}`}
								/>
							</button>
							<p className="text-xs text-gray-600 mt-1">{label}</p>
						</div>
					))}
				</div>

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

export default LikertScale
