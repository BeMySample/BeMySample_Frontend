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
}) => {
	const [options, setOptions] = useState([])
	const [newOption, setNewOption] = useState('')
	const [selectedOption, setSelectedOption] = useState(null)
	const [showOptions, setShowOptions] = useState(false)

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

	// Handle new option input
	const handleAddOption = () => {
		if (newOption.trim() !== '') {
			setOptions([...options, newOption])
			setNewOption('')
		}
	}

	// Handle selecting an option
	const handleSelectOption = (option) => {
		setSelectedOption(option)
		setShowOptions(false)
	}

	return (
		<div
			className={`flex flex-col justify-center items-start text-gray-700 font-inter relative bg-cover bg-center rounded-lg ${
				viewMode === 'mobile' ? 'w-[375px] h-[720px] p-4' : 'w-full h-full p-6'
			}`}
			style={{
				backgroundImage: 'url("/path/to/your/background-image.jpg")',
				backgroundColor: 'rgba(255, 255, 255, 0.7)',
				backgroundBlendMode: 'overlay',
			}}
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
						{title || 'Pilih provinsi tempat tinggal'}
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
							'Klik dropdown untuk menampilkan list dan pilih satu opsi'}
					</p>
				)}

				{/* Editable Option Input */}
				<div className="flex items-center w-full mb-4">
					<input
						type="text"
						placeholder="Sunting opsi"
						value={newOption}
						onChange={(e) => setNewOption(e.target.value)}
						onKeyPress={(e) => e.key === 'Enter' && handleAddOption()}
						className="flex-grow p-2 border-b border-gray-300 text-lg focus:outline-none"
					/>
					<button
						onClick={handleAddOption}
						className="text-blue-500 ml-2"
						title="Tambahkan opsi"
					>
						<Icon icon="mdi:plus-circle" className="text-lg" />
					</button>
				</div>

				{/* Dropdown Selector */}
				<div className="relative w-full flex flex-row gap-2 items-center mb-4">
					<div
						onClick={() => setShowOptions(!showOptions)}
						className="cursor-pointer flex items-center justify-between p-2 border border-gray-300 rounded-lg text-lg bg-white w-64"
					>
						{selectedOption || 'Pilih opsi'}
						<Icon icon="mdi:chevron-down" className="text-gray-500" />
					</div>

					{showOptions && (
						<div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 shadow-lg max-h-40 overflow-y-auto z-10">
							{options.length > 0 ? (
								options.map((option, index) => (
									<div
										key={index}
										onClick={() => handleSelectOption(option)}
										className="p-2 cursor-pointer hover:bg-gray-100 text-center"
									>
										{option}
									</div>
								))
							) : (
								<p className="p-2 text-gray-500 text-center">Tidak ada opsi</p>
							)}
						</div>
					)}
					{/* Option Summary and Action Button */}
					<div className="w-full flex gap-2 items-center text-gray-500 text-center italic">
						<p>Total {options.length} pilihan tersimpan</p>
						<Icon
							icon="mdi:information-outline"
							className="text-lg"
							title="Jumlah opsi tersimpan"
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
