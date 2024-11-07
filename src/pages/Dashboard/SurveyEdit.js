// EditSurvey.js
import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import LeftSidebar from '../../components/SurveyEdit/LeftSidebar'
import MainContent from '../../components/SurveyEdit/MainContent'
import RightSidebar from '../../components/SurveyEdit/RightSidebar'

const LOCAL_STORAGE_KEY = 'surveyData'

const EditSurvey = () => {
	const [activeSection, setActiveSection] = useState('welcome')
	const [sections, setSections] = useState([
		{ id: 'welcome', label: 'Selamat datang', icon: 'hugeicons:start-up-02' },
		{ id: 'thankYou', label: 'Terima kasih!', icon: 'icon-park-outline:bye' },
	])

	// Editable fields state
	const [contentText, setContentText] = useState('')
	const [buttonText, setButtonText] = useState('Mulai')
	const [backgroundImage, setBackgroundImage] = useState(null)
	const [bgColor, setBgColor] = useState('#FFFFFF')
	const [buttonColor, setButtonColor] = useState('#1F38DB')
	const [textColor, setTextColor] = useState('#000000')

	const [isEditing, setIsEditing] = useState(null)
	const [editedLabel, setEditedLabel] = useState('')

	// Load data from localStorage on mount
	useEffect(() => {
		const savedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
		if (savedData) {
			setSections(savedData.sections || sections)
			setActiveSection(savedData.activeSection || 'welcome')

			const sectionData = savedData.data[savedData.activeSection]
			if (sectionData) {
				setContentText(sectionData.contentText || '')
				setButtonText(sectionData.buttonText || 'Mulai')
				setBackgroundImage(sectionData.backgroundImage || null)
				setBgColor(sectionData.bgColor || '#FFFFFF')
				setButtonColor(sectionData.buttonColor || '#1F38DB')
				setTextColor(sectionData.textColor || '#000000')
			}
		}
	}, [])

	// Update data in localStorage on state change
	const saveToLocalStorage = () => {
		const surveyData = {
			sections,
			activeSection,
			data: {
				...JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))?.data,
				[activeSection]: {
					contentText,
					buttonText,
					backgroundImage,
					bgColor,
					buttonColor,
					textColor,
				},
			},
		}
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(surveyData))
	}

	const handleRename = (id, label) => {
		setIsEditing(id)
		setEditedLabel(label)
	}

	const handleRenameChange = (e) => {
		setEditedLabel(e.target.value)
	}

	const handleRenameSubmit = (id) => {
		setSections((prevSections) =>
			prevSections.map((section) =>
				section.id === id ? { ...section, label: editedLabel } : section
			)
		)
		setIsEditing(null)
		saveToLocalStorage()
	}

	const addItem = () => {
		const newItem = {
			id: `item-${sections.length + 1}`,
			label: `Item Baru ${sections.length + 1}`,
			icon: 'mdi:file-document-outline',
		}
		setSections([...sections, newItem])
		setActiveSection(newItem.id)
		saveToLocalStorage()
	}

	const handleBackgroundChange = (e) => {
		const file = e.target.files[0]
		if (file) {
			setBackgroundImage(URL.createObjectURL(file))
		}
	}

	// Save data manually with button
	const handleManualSave = () => {
		saveToLocalStorage()
		toast('Survei berhasil disimpan!', {
			icon: '✅',
			style: {
				borderRadius: '10px',
				background: '#333',
				color: '#fff',
			},
		})
	}

	// When switching sections, save current section's data first
	const handleSectionChange = (sectionId) => {
		saveToLocalStorage() // Save the current section data
		setActiveSection(sectionId)

		// Load new section data if it exists
		const savedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
		const sectionData = savedData?.data[sectionId] || {}
		setContentText(sectionData.contentText || '')
		setButtonText(sectionData.buttonText || 'Mulai')
		setBackgroundImage(sectionData.backgroundImage || null)
		setBgColor(sectionData.bgColor || '#FFFFFF')
		setButtonColor(sectionData.buttonColor || '#1F38DB')
		setTextColor(sectionData.textColor || '#000000')
	}

	return (
		<div className="flex flex-col w-full h-screen bg-gray-100 font-inter">
			{/* Toast Notification */}
			<Toaster position="top-right" />

			<div className="min-h-20" />

			<div className="flex flex-grow">
				<LeftSidebar
					sections={sections}
					activeSection={activeSection}
					setActiveSection={handleSectionChange}
					addItem={addItem}
					handleRename={handleRename}
					isEditing={isEditing}
					editedLabel={editedLabel}
					handleRenameChange={handleRenameChange}
					handleRenameSubmit={handleRenameSubmit}
				/>
				<MainContent
					contentText={contentText}
					textColor={textColor}
					buttonText={buttonText}
					buttonColor={buttonColor}
					bgColor={bgColor}
					backgroundImage={backgroundImage}
				/>
				<RightSidebar
					contentText={contentText}
					setContentText={setContentText}
					buttonText={buttonText}
					setButtonText={setButtonText}
					bgColor={bgColor}
					setBgColor={setBgColor}
					buttonColor={buttonColor}
					setButtonColor={setButtonColor}
					textColor={textColor}
					setTextColor={setTextColor}
					backgroundImage={backgroundImage}
					handleBackgroundChange={handleBackgroundChange}
					activeSection={activeSection}
				/>
			</div>

			{/* Save Button */}
			<div className="flex justify-end p-4 bg-gray-200">
				<button
					onClick={handleManualSave}
					className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
				>
					Simpan
				</button>
			</div>
		</div>
	)
}

export default EditSurvey
