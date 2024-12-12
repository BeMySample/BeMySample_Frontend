import React, { useState } from 'react'
import { Icon } from '@iconify/react'

const MultipleChoice = ({
	viewMode,
	title,
	description,
	setTitle,
	setDescription,
	buttonText,
	buttonColor,
	buttonTextColor,
	textColor,
	mustBeFilled,
	otherOption,
	minChoices,
	maxChoices,
	optionsCount,
	setOptionsCount,
}) => {
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
	const [selectedOptions, setSelectedOptions] = useState([])

	// Handle new option addition
	const handleAddOption = () => {
		if (newOption.trim() !== '') {
			const nextValue = String.fromCharCode(65 + options.length) // Generate next letter
			setOptions([...options, { label: newOption, value: nextValue }])
			setNewOption('')
			setOptionsCount(options.length + 1) // Update options count
		}
	}

	// Handle selecting an option
	const handleSelectOption = (value) => {
		if (selectedOptions.includes(value)) {
			// Remove from selection if already selected
			setSelectedOptions(selectedOptions.filter((option) => option !== value))
		} else {
			// Add to selection if within maxChoices
			if (selectedOptions.length < maxChoices) {
				setSelectedOptions([...selectedOptions, value])
			}
		}
	}

	const [isEditingTitle, setIsEditingTitle] = useState(false)
	const [isEditingDescription, setIsEditingDescription] = useState(false)

	const handleTitleDoubleClick = () => {
		setIsEditingTitle(true)
	}

	const handleDescriptionDoubleClick = () => {
		setIsEditingDescription(true)
	}

	const handleTitleBlur = (e) => {
		setIsEditingTitle(false)
		setTitle(e.target.value)
	}

	const handleDescriptionBlur = (e) => {
		setIsEditingDescription(false)
		setDescription(e.target.value)
	}

	const handleOptionsCountChange = (e) => {
		const count = parseInt(e.target.value, 10)
		if (count >= options.length) {
			setOptionsCount(count)
		} else {
			alert(
				'Jumlah opsi tidak boleh lebih kecil dari jumlah opsi yang sudah ada.'
			)
		}
	}

	const isSelectionValid =
		selectedOptions.length >= minChoices && selectedOptions.length <= maxChoices

	return (
		<div
			className={`flex flex-col items-start justify-center text-gray-700 p-4 font-inter relative bg-cover bg-center rounded-lg ${
				viewMode === 'mobile' ? 'w-[375px] h-[720px]' : 'w-full h-full'
			}`}
		>
			<div className="flex flex-col items-start mb-4">
				{isEditingTitle ? (
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						onBlur={handleTitleBlur}
						autoFocus
						className={`font-bold mb-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 ${
							viewMode === 'mobile' ? 'text-[24px]' : 'text-[32px]'
						}`}
						style={{ color: textColor }}
					/>
				) : (
					<h1
						className={`font-bold mb-2 ${
							viewMode === 'mobile' ? 'text-[24px]' : 'text-[32px]'
						}`}
						style={{ color: textColor }}
						onDoubleClick={handleTitleDoubleClick}
					>
						{title || 'Siapa nama Anda?'}
					</h1>
				)}
				{isEditingDescription ? (
					<input
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						onBlur={handleDescriptionBlur}
						autoFocus
						className={`font-normal mb-4 text-center border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 ${
							viewMode === 'mobile' ? 'text-[16px]' : 'text-[18px]'
						}`}
						style={{ color: textColor }}
					/>
				) : (
					<p
						className={`font-normal ${
							viewMode === 'mobile' ? 'text-[16px]' : 'text-[18px]'
						} mb-4`}
						style={{ color: textColor }}
						onDoubleClick={handleDescriptionDoubleClick}
					>
						{description || 'Tak kenal, maka tak sayang 🥰'}
					</p>
				)}
			</div>

			{/* List of Multiple Choice Options */}
			<div className="w-full space-y-2 mb-4">
				{options.map((option, index) => (
					<div key={index} className="flex items-center space-x-2">
						<button
							onClick={() => handleSelectOption(option.value)}
							className={`min-w-8 min-h-8 flex items-center justify-center font-semibold border rounded-xl ${
								selectedOptions.includes(option.value)
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
				{otherOption && (
					<div className="flex items-center space-x-2">
						<button
							onClick={() =>
								handleSelectOption(String.fromCharCode(65 + options.length))
							}
							className={`min-w-8 min-h-8 flex items-center justify-center font-semibold border rounded-xl ${
								selectedOptions.includes(
									String.fromCharCode(65 + options.length)
								)
									? 'bg-blue-500 text-white'
									: 'border-gray-400 text-gray-700'
							}`}
						>
							{String.fromCharCode(65 + options.length)}
						</button>
						<input
							type="text"
							placeholder="Kolom isian “Lainnya”"
							className="flex-grow ml-2 bg-transparent border-b border-gray-400 focus:outline-none text-sm"
						/>
					</div>
				)}
			</div>

			{/* Add New Option Field */}
			<div className="flex items-center w-full mb-4">
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
					className="flex-grow ml-2 p-2 bg-transparent border-b border-gray-300 focus:outline-none text-sm"
				/>
			</div>

			{/* Options Count */}
			<div className="flex items-center w-full mb-4">
				<label className="flex-grow text-sm text-gray-800">Jumlah Opsi</label>
				<input
					type="number"
					min="1"
					value={optionsCount}
					onChange={handleOptionsCountChange}
					className="p-2 rounded border border-gray-300 text-sm"
				/>
			</div>

			{/* Next Button */}
			<button
				disabled={!isSelectionValid}
				className={`py-2 px-4 rounded-lg ${
					viewMode === 'mobile' ? 'text-base' : 'text-lg'
				} ${isSelectionValid ? '' : 'opacity-50 cursor-not-allowed'}`}
				style={{ backgroundColor: buttonColor, color: buttonTextColor }}
			>
				<p
					className={`font-semibold ${
						viewMode === 'mobile' ? 'text-[16px]' : 'text-[18px]'
					}`}
				>
					{buttonText}
				</p>
			</button>
		</div>
	)
}

export default MultipleChoice
