import React from 'react'

const Time = ({ viewMode }) => (
	<div
		className={`flex items-center justify-center ${
			viewMode === 'mobile' ? 'w-[375px] h-[720px] p-4' : 'w-full h-full p-6'
		}`}
	>
		<input
			type="time"
			className={`p-2 rounded border border-gray-300 ${
				viewMode === 'mobile' ? 'w-[85%]' : 'w-1/2'
			}`}
		/>
	</div>
)

export default Time
