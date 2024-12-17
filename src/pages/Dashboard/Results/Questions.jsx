import React from 'react'
import { Icon } from '@iconify/react'

const Questions = ({ questionNumber, icon, questionTitle, responses }) => {
	return (
		<div className="rounded-xl bg-white shadow-sm p-4 mb-4">
			{/* Header Question */}
			<div className="flex items-center gap-3 mb-3">
				<div className="flex items-center justify-center bg-purple-600 text-white w-8 h-8 rounded-lg">
					<Icon icon={icon} />
				</div>
				<h4 className="font-medium text-gray-800">
					<span className="text-blue-500 mr-1">{questionNumber}.</span>
					{questionTitle}
				</h4>
			</div>

			{/* Responses */}
			<div className="border-t">
				{responses.map((response, index) => (
					<div
						key={index}
						className="flex justify-between items-center border-b py-2"
					>
						<div className="text-gray-700">{response.name}</div>
						<div className="text-gray-500 text-sm">{response.timeAgo}</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Questions
