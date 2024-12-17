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
	listChoices,
	setListChoices,
	handleAddOption,
	otherOption,
	minChoices,
	maxChoices,
	optionsCount,
	setOptionsCount,
}) => {
	const [newOption, setNewOption] = useState('')
	const [selectedOptions, setSelectedOptions] = useState([])
	const [editingChoice, setEditingChoice] = useState(null)
	const [editingText, setEditingText] = useState('')
	const [isEditingTitle, setIsEditingTitle] = useState(false)
	const [isEditingDescription, setIsEditingDescription] = useState(false)

	const handleAddNewOption = () => {
		if (newOption.trim() !== '') {
			handleAddOption(newOption)
			setNewOption('') // Reset input field
		}
	}

	const handleSelectOption = (value) => {
		if (selectedOptions.includes(value)) {
			setSelectedOptions(selectedOptions.filter((option) => option !== value))
		} else {
			if (selectedOptions.length < maxChoices) {
				setSelectedOptions([...selectedOptions, value])
			}
		}
	}

	const handleRemoveOption = (index) => {
		const updatedChoices = listChoices.filter((_, i) => i !== index)
		setListChoices(updatedChoices)
	}

	const handleEditChoice = (index) => {
		setEditingChoice(index)
		setEditingText(listChoices[index].label)
	}

	const handleEditChoiceBlur = (index) => {
		if (editingText.trim() !== '') {
			const updatedChoices = [...listChoices]
			updatedChoices[index].label = editingText
			setListChoices(updatedChoices)
		}
		setEditingChoice(null)
		setEditingText('')
	}

	const isSelectionValid =
		selectedOptions.length >= minChoices && selectedOptions.length <= maxChoices

	const handleTitleBlur = (e) => {
		setTitle(e.target.value)
	}

	const handleDescriptionBlur = (e) => {
		setDescription(e.target.value)
	}

	const handleTitleDoubleClick = () => {
		setTitle('')
	}

	const handleDescriptionDoubleClick = () => {
		setDescription('')
	}

	return (
		<div
			className={`flex flex-col items-start justify-center text-gray-700 p-4 font-inter relative bg-cover bg-center rounded-lg ${
				viewMode === 'mobile' ? 'w-[375px] h-[720px]' : 'w-full h-full'
			}`}
		>
			<div className="flex flex-col items-start mb-4">
				{/* Title Editing */}
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
				{/* Description Editing */}
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
				{listChoices.map((option, index) => (
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
						{editingChoice === index ? (
							<input
								type="text"
								value={editingText}
								onChange={(e) => setEditingText(e.target.value)}
								onBlur={() => handleEditChoiceBlur(index)}
								autoFocus
								className="flex-grow bg-transparent border-b border-gray-400 focus:outline-none text-sm"
							/>
						) : (
							<p
								className="flex-grow text-sm text-gray-800 cursor-pointer"
								onDoubleClick={() => handleEditChoice(index)}
							>
								{option.label}
							</p>
						)}
						<button
							onClick={() => handleRemoveOption(index)}
							className="text-red-500 hover:text-red-700"
						>
							<Icon icon="mdi:minus" />
						</button>
					</div>
				))}

				{/* 'Other' option with input field */}
				{otherOption && (
					<div className="flex items-center space-x-2">
						<button
							onClick={() =>
								handleSelectOption(String.fromCharCode(65 + listChoices.length))
							}
							className={`min-w-8 min-h-8 flex items-center justify-center font-semibold border rounded-xl ${
								selectedOptions.includes(
									String.fromCharCode(65 + listChoices.length)
								)
									? 'bg-blue-500 text-white'
									: 'border-gray-400 text-gray-700'
							}`}
						>
							{String.fromCharCode(65 + listChoices.length)}
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
					onClick={handleAddNewOption}
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
					className="flex-grow ml-2 p-2 bg-transparent border-b border-gray-300 focus:outline-none text-sm"
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
