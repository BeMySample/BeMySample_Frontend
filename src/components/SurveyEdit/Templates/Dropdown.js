import React, { useState } from 'react'
import { Icon } from '@iconify/react'

const Dropdown = ({
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
	setListChoices, // Menambahkan setListChoices di parameter props
}) => {
	const [newLabel, setNewLabel] = useState('')
	const [newValue, setNewValue] = useState('')
	const [selectedChoice, setSelectedChoice] = useState(null)
	const [showChoices, setShowChoices] = useState(false)

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

	// Handle adding a new choice
	const handleAddChoice = () => {
		if (newLabel.trim() !== '' && newValue.trim() !== '') {
			const newChoice = { label: newLabel, value: newValue }
			setListChoices([...listChoices, newChoice]) // Update listChoices dengan objek baru
			setNewLabel('')
			setNewValue('')
		}
	}

	// Handle selecting a choice
	const handleSelectChoice = (choice) => {
		setSelectedChoice(choice)
		setShowChoices(false)
	}

	return (
		<div
			className={`flex flex-col justify-center items-start text-gray-700 font-inter relative bg-cover bg-center rounded-lg ${
				viewMode === 'mobile' ? 'w-[375px] h-[720px] p-4' : 'w-full h-full p-6'
			}`}
		>
			<div className="flex flex-col items-start w-full max-w-[90%]">
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
						{title || 'Pilih kategori'}
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
						{description ||
							'Masukkan label dan value untuk menambahkan pilihan'}
					</p>
				)}

				{/* Editable Choice Input */}
				<div className="flex flex-col w-full mb-4 gap-2">
					<input
						type="text"
						placeholder="Label pilihan (contoh: Smartphone)"
						value={newLabel}
						onChange={(e) => setNewLabel(e.target.value)}
						className="p-2 border-b border-gray-300 text-lg focus:outline-none"
					/>
					<input
						type="text"
						placeholder="Value pilihan (contoh: A)"
						value={newValue}
						onChange={(e) => setNewValue(e.target.value)}
						className="p-2 border-b border-gray-300 text-lg focus:outline-none"
					/>
					<button
						onClick={handleAddChoice}
						className="text-blue-500 mt-2 flex items-center gap-1"
						title="Tambahkan pilihan"
					>
						<Icon icon="mdi:plus-circle" className="text-lg" /> Tambahkan
					</button>
				</div>

				{/* Dropdown Selector */}
				<div className="relative w-full flex flex-row gap-2 items-center mb-4">
					<div
						onClick={() => setShowChoices(!showChoices)}
						className="cursor-pointer flex items-center justify-between p-2 border border-gray-300 rounded-lg text-lg bg-white w-64"
					>
						{selectedChoice ? selectedChoice.label : 'Pilih kategori'}
						<Icon icon="mdi:chevron-down" className="text-gray-500" />
					</div>

					{showChoices && (
						<div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 shadow-lg max-h-40 overflow-y-auto z-10">
							{listChoices.length > 0 ? (
								listChoices.map((choice, index) => (
									<div
										key={index}
										onClick={() => handleSelectChoice(choice)}
										className="p-2 cursor-pointer hover:bg-gray-100 text-center"
									>
										{choice.label} - {choice.value}
									</div>
								))
							) : (
								<p className="p-2 text-gray-500 text-center">
									Tidak ada pilihan
								</p>
							)}
						</div>
					)}
					{/* Choice Summary and Action Button */}
					<div className="w-full flex gap-2 items-center text-gray-500 text-center italic">
						<p>Total {listChoices.length} pilihan tersimpan</p>
						<Icon
							icon="mdi:information-outline"
							className="text-lg"
							title="Jumlah pilihan tersimpan"
						/>
					</div>
				</div>

				{/* Next Button */}
				<button
					className={`py-2 px-4 rounded-lg ${
						viewMode === 'mobile' ? 'text-base' : 'text-lg'
					}`}
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
		</div>
	)
}

export default Dropdown
