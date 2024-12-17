import React from 'react'

const ProgressBarWithIndicator = ({ completed, target }) => {
	return (
		<div className="flex flex-col gap-4 w-full">
			{/* Progress Bar dan Persentase - Flex Row */}
			<div className="flex items-center gap-4 w-full">
				{/* Progress Bar */}
				<div className="relative w-full bg-gray-200 rounded-full h-2.5">
					<div
						style={{ width: `${completed}%` }}
						className="bg-blue-600 h-2.5 rounded-full"
					></div>
					{/* Penanda Panah */}
					<div
						className="absolute top-5 transform -translate-x-1/2"
						style={{ left: `${completed}%` }}
					>
						<div className="relative flex flex-col items-center">
							<div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-blue-600"></div>
							<div className="bg-blue-500 text-white rounded-lg px-4 py-2 shadow-md">
								<p className="text-xl font-bold text-center">{target}</p>
								<p className="text-xs text-center">Responden</p>
							</div>
						</div>
					</div>
				</div>

				{/* Persentase */}
				<div className="text-blue-600 text-2xl font-bold">{completed}%</div>
			</div>
		</div>
	)
}

export default ProgressBarWithIndicator
