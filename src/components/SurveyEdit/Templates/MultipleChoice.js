import React, { useState } from 'react'
import { Icon } from '@iconify/react'

const MultipleChoice = ({ viewMode }) => {
	const [options, setOptions] = useState([
		{
			label: 'Pemilihan umum sebaiknya dilakukan dengan kertas dan pencoblos',
			value: 'A',
		},
		{
			label:
				'Digitalisasi sebaiknya dilakukan, pemilu mesti menggunakan komputer',
			value: 'B',
		},
		{ label: 'Saya tidak mengikuti Pemilu', value: 'C' },
	])
	const [newOption, setNewOption] = useState('')
	const [selectedOption, setSelectedOption] = useState(null)

	// Handle new option addition
	const handleAddOption = () => {
		if (newOption.trim() !== '') {
			const nextValue = String.fromCharCode(65 + options.length) // Generate next letter
			setOptions([...options, { label: newOption, value: nextValue }])
			setNewOption('')
		}
	}

	// Handle selecting an option
	const handleSelectOption = (value) => {
		setSelectedOption(value)
	}

	return (
		<div
			className={`flex flex-col items-center justify-center text-gray-700 p-4 font-inter relative bg-cover bg-center rounded-lg ${
				viewMode === 'mobile' ? 'w-[375px] h-[720px]' : 'w-full h-full'
			}`}
			style={{
				backgroundColor: 'rgba(255, 255, 255, 0.7)',
				backgroundBlendMode: 'overlay',
			}}
		>
			<div className="text-center mb-4">
				<h1 className="text-2xl font-bold text-black">
					Mana yang paling tepat menurut Anda?
				</h1>
				<p className="text-gray-600 mb-4">Pilih salah satu opsi</p>
			</div>

			{/* List of Multiple Choice Options */}
			<div className="w-full space-y-2 mb-4 px-4">
				{options.map((option, index) => (
					<div key={index} className="flex items-center space-x-2">
						<button
							onClick={() => handleSelectOption(option.value)}
							className={`min-w-10 min-h-10 flex items-center justify-center font-semibold border rounded-full ${
								selectedOption === option.value
									? 'bg-blue-500 text-white'
									: 'border-gray-400 text-gray-700'
							}`}
						>
							{option.value}
						</button>
						<p className="flex-grow text-sm text-gray-800">{option.label}</p>
					</div>
				))}

				{/* 'Other' option with input field */}
				<div className="flex items-center space-x-2">
					<button
						onClick={() =>
							handleSelectOption(String.fromCharCode(65 + options.length))
						}
						className={`min-w-10 min-h-10 flex items-center justify-center font-semibold border rounded-full ${
							selectedOption === String.fromCharCode(65 + options.length)
								? 'bg-blue-500 text-white'
								: 'border-gray-400 text-gray-700'
						}`}
					>
						{String.fromCharCode(65 + options.length)}
					</button>
					<input
						type="text"
						placeholder="Kolom isian “Lainnya”"
						className="flex-grow ml-2 border-b border-gray-400 focus:outline-none text-sm"
					/>
				</div>
			</div>

			{/* Add New Option Field */}
			<div className="flex items-center w-full mb-4 px-4">
				<button
					onClick={handleAddOption}
					className="flex items-center px-2 py-1 border border-gray-400 rounded text-gray-700 text-sm"
				>
					<Icon icon="mdi:plus" className="mr-2" />
					Tambah Opsi
				</button>
				<input
					type="text"
					placeholder="Sunting opsi"
					value={newOption}
					onChange={(e) => setNewOption(e.target.value)}
					onKeyPress={(e) => e.key === 'Enter' && handleAddOption()}
					className="flex-grow ml-2 p-2 border-b border-gray-300 focus:outline-none text-sm"
				/>
			</div>

			{/* Next Button */}
			<button
				className="w-full py-2 bg-red-600 text-white text-lg font-semibold rounded-lg mt-4"
				onClick={() => alert('Lanjut ke bagian berikutnya')}
			>
				Lanjut
			</button>
			<p className="text-sm text-gray-500 mt-2 text-center">
				atau tekan Enter ↵
			</p>
		</div>
	)
}

export default MultipleChoice
