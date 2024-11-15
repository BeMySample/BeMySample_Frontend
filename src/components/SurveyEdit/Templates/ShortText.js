import React from 'react'

const ShortText = ({ viewMode }) => (
	<div
		className={`flex items-center justify-center ${
			viewMode === 'mobile' ? 'w-[375px] h-[720px] p-4' : 'w-full h-full p-6'
		}`}
	>
		<input
			type="text"
			placeholder="Masukkan teks singkat..."
			className={`p-2 rounded border border-gray-300 ${
				viewMode === 'mobile' ? 'w-[85%]' : 'w-full'
			}`}
		/>
	</div>
)

export default ShortText
