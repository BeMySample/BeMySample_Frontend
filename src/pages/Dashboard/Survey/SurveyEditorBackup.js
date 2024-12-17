import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import LeftSidebar from '../../../components/SurveyEdit/Edit/LeftSidebar'
import MainContent from '../../../components/SurveyEdit/Edit/MainContent'
import RightSidebar from '../../../components/SurveyEdit/Edit/RightSidebar'
import RightSidebarPreview from '../../../components/SurveyEdit/Preview/RightSidebar'
import NavBar from '../../../components/Navbar'
import Breadcrumbs from '../../../components/SurveyEdit/Breadcrumbs'
import ProfilePict from '../../../assets/images/profilepict.png'
import { Icon } from '@iconify/react'
import { Helmet } from 'react-helmet'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import ProfileMenu from '../../../components/ProfileMenu'
import Publish from './Publish'
import Results from './Results'

const LOCAL_STORAGE_KEY = 'surveyData'

const getFormattedDate = () => {
	const date = new Date();

	// Ambil komponen tanggal dan waktu
	const year = date.getUTCFullYear();
	const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
	const day = String(date.getUTCDate()).padStart(2, '0');
	const hours = String(date.getUTCHours()).padStart(2, '0');
	const minutes = String(date.getUTCMinutes()).padStart(2, '0');
	const seconds = String(date.getUTCSeconds()).padStart(2, '0');

	// Susun string sesuai format yang diinginkan
	return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000000Z`;
};

const Edit = ({ onEdit }) => {
	const { id } = useParams()
	const [viewMode, setViewMode] = useState('desktop')

	const toggleViewMode = (mode) => {
		setViewMode(mode)
	}

	const location = useLocation()
	const pathSegments = location.pathname.split('/')

	const currentPath = pathSegments[pathSegments.length - 2]
	const activeMenuFromPath =
		{
			edit: 'Sunting',
			preview: 'Pratinjau',
			publish: 'Terbitkan',
			results: 'Hasil',
		}[currentPath] || ''

	const [activeMenu, setActiveMenu] = useState(activeMenuFromPath)

	const handleMenuClick = (label) => {
		setActiveMenu(label)
	}

	const [activeSection, setActiveSection] = useState('welcome')
	const [createdByAI, setCreatedByAI] = useState(false)
	const [sections, setSections] = useState([
		{ id: 'welcome', label: 'Selamat datang', icon: 'hugeicons:start-up-02' },
		{ id: 'thankYou', label: 'Closing', icon: 'icon-park-outline:bye' },
	])

	const [surveyTitle, setSurveyTitle] = useState('Survei Baru')
	const [contentText, setContentText] = useState('')
	const [selectedIcon, setSelectedIcon] = useState('')
	const [surveyStatus, setSurveyStatus] = useState('draft')
	const [respondents, setRespondents] = useState(0)
	const [surveyUpdated, setSurveyUpdated] = useState(getFormattedDate())
	const [buttonText, setButtonText] = useState('Mulai')
	const [backgroundImage, setBackgroundImage] = useState(null)
	const [bgColor, setBgColor] = useState('#FFFFFF')
	const [bgOpacity, setBgOpacity] = useState(100)
	const [buttonColor, setButtonColor] = useState('#1F38DB')
	const [buttonTextColor, setButtonTextColor] = useState('#FFFFFF')
	const [textColor, setTextColor] = useState('#000000')
	const [title, setTitle] = useState('Terima kasih!')
	const [description, setDescription] = useState(
		'Anda sudah menyelesaikan survei ini'
	)
	const [toggleResponseCopy, setToggleResponseCopy] = useState(false)
	const [mustBeFilled, setMustBeFilled] = useState(true)
	const [listChoices, setListChoices] = useState([])
	const [otherOption, setOtherOption] = useState(false)
	const [dateFormat, setDateFormat] = useState(null)
	const [timeFormat, setTimeFormat] = useState(null)
	const [minChoices, setMinChoices] = useState(1)
	const [maxChoices, setMaxChoices] = useState(1)
	const [optionsCount, setOptionsCount] = useState(3)

	const [smallLabel, setSmallLabel] = useState(false)
	const [midLabel, setMidLabel] = useState(false)
	const [largeLabel, setLargeLabel] = useState(false)

	const [isEditing, setIsEditing] = useState(null)
	const [editedLabel, setEditedLabel] = useState('')
	const [unsavedChanges, setUnsavedChanges] = useState(false)
	const [saveStatus, setSaveStatus] = useState('idle')

	useEffect(() => {
		if (unsavedChanges) {
			const autoSaveTimeout = setTimeout(() => {
				saveToLocalStorage()
				toast('Perubahan otomatis disimpan!', {
					icon: <Icon icon="line-md:check-all" />,
					style: {
						borderRadius: '10px',
						background: '#2073DB',
						color: '#fff',
					},
					position: 'bottom-right',
				})
				setUnsavedChanges(false)
			}, 500)

			return () => clearTimeout(autoSaveTimeout)
		}
	}, [
		sections,
		surveyTitle,
		activeSection,
		createdByAI,
		contentText,
		buttonText,
		backgroundImage,
		bgColor,
		bgOpacity,
		buttonColor,
		buttonTextColor,
		textColor,
		title,
		description,
		unsavedChanges,
		toggleResponseCopy,
		mustBeFilled,
		listChoices,
		otherOption,
		optionsCount,
		dateFormat,
		timeFormat,
		minChoices,
		maxChoices,
		smallLabel,
		midLabel,
		largeLabel,
	])

	useEffect(() => {
		const savedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {}
		const surveyData = savedData[id]

		if (surveyData) {
			setSections(surveyData.sections || sections)
			setSurveyTitle(surveyData.surveyTitle || 'Survei Baru')
			setCreatedByAI(surveyData.createdByAI || false)

			const initialSection = surveyData.activeSection || sections[0].id
			setActiveSection(initialSection)

			const sectionData = surveyData.data[initialSection] || {}
			setSurveyStatus(surveyData.status || 'draft')
			setRespondents(surveyData.respondents || 0)
			setSurveyUpdated(surveyData.updated || getFormattedDate())
			setContentText(sectionData.contentText || '')
			setButtonText(sectionData.buttonText || 'Mulai')
			setBackgroundImage(surveyData.backgroundImage || null)
			setBgColor(surveyData.bgColor || '#FFFFFF')
			setBgOpacity(surveyData.bgOpacity || 1)
			setButtonColor(sectionData.buttonColor || '#1F38DB')
			setButtonTextColor(sectionData.buttonTextColor || '#FFFFFF')
			setTextColor(sectionData.textColor || '#000000')
			setTitle(sectionData.title || 'Terima kasih!')
			setDescription(
				sectionData.description || 'Anda sudah menyelesaikan survei ini.'
			)
			setToggleResponseCopy(sectionData.toggleResponseCopy || false)
			setMustBeFilled(sectionData.mustBeFilled || false)
			setListChoices(
				sectionData.listChoices || [
					{ label: 'Pilihan 1', value: 'A' },
					{ label: 'Pilihan 2', value: 'B' },
					{ label: 'Pilihan 3', value: 'C' },
				]
			)
			setOtherOption(sectionData.otherOption || false)
			setDateFormat(sectionData.dateFormat || null)
			setTimeFormat(sectionData.timeFormat || null)
			setMinChoices(sectionData.minChoices || 1)
			setMaxChoices(sectionData.maxChoices || 1)
			setOptionsCount(sectionData.optionsCount || 3)

			setSmallLabel(sectionData.smallLabel || false)
			setMidLabel(sectionData.midLabel || false)
			setLargeLabel(sectionData.largeLabel || false)
		} else {
			setActiveSection(sections[0].id)
		}
	}, [id])

	use

	const saveToLocalStorage = (updatedSections = sections) => {
		const savedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {}

		const surveyData = {
			sections: updatedSections,
			surveyTitle,
			data: {
				...savedData[id]?.data,
				[activeSection]: {
					contentText,
					buttonText,
					bgColor,
					bgOpacity,
					buttonColor,
					buttonTextColor,
					textColor,
					title,
					description,
					toggleResponseCopy,
					mustBeFilled,
					listChoices,
					otherOption,
					dateFormat,
					timeFormat,
					minChoices,
					maxChoices,
					optionsCount,
					smallLabel,
					midLabel,
					largeLabel,
				},
			},
			bgColor: bgColor,
			backgroundImage: backgroundImage,
			bgOpacity: bgOpacity,
			status: surveyStatus,
			respondents: respondents,
			updated: getFormattedDate(),
			createdByAI: createdByAI,
		}

		savedData[id] = surveyData
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedData))
		setUnsavedChanges(false)
	}

	const handleTitleChange = (newTitle) => {
		setSurveyTitle(newTitle)
		setUnsavedChanges(true)
	}

	const handleChange = (setStateFunction, value) => {
		setStateFunction(value)
		setUnsavedChanges(true)
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
		setUnsavedChanges(true)
	}

	const addItem = () => {
		const newItem = {
			id: `item-${sections.length + 1}`,
			label: `Item Baru ${sections.length + 1}`,
			icon: selectedIcon || 'mdi:file-document-outline',
		}
		setSections([...sections, newItem])
		setActiveSection(newItem.id)
		setUnsavedChanges(true)
	}

	const handleAddOption = (newOption) => {
		if (newOption.trim() !== '') {
			const nextValue = String.fromCharCode(65 + listChoices.length)
			setListChoices([...listChoices, { label: newOption, value: nextValue }])
		}
	}

	const handleBackgroundChange = (e) => {
		const file = e.target.files[0]
		if (file) {
			setBackgroundImage(URL.createObjectURL(file))
			setUnsavedChanges(true)
		}
	}

	const handleSectionChange = (sectionId) => {
		setActiveSection(sectionId)

		const savedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {}
		const surveyData = savedData[id]
		const sectionData = savedData[id]?.data[sectionId] || {}
		setContentText(sectionData.contentText || '')

		setCreatedByAI(surveyData.createdByAI || false)
		setButtonText(sectionData.buttonText || 'Mulai')
		setBackgroundImage(surveyData.backgroundImage || null)
		setBgColor(surveyData.bgColor || '#FFFFFF')
		setBgOpacity(surveyData.bgOpacity || 1)
		setButtonColor(sectionData.buttonColor || '#1F38DB')
		setButtonTextColor(sectionData.buttonTextColor || '#FFFFFF')
		setTextColor(sectionData.textColor || '#000000')
		setTitle(sectionData.title || 'Isi Judul di sini')
		setDescription(sectionData.description || 'Isi deskripsi di sini')
		setToggleResponseCopy(sectionData.toggleResponseCopy || false)
		setMustBeFilled(sectionData.mustBeFilled || false)
		setListChoices(
			sectionData.listChoices || [
				{ label: 'Pilihan 1', value: 'A' },
				{ label: 'Pilihan 2', value: 'B' },
				{ label: 'Pilihan 3', value: 'C' },
			]
		)
		setOtherOption(sectionData.otherOption || false)
		setDateFormat(sectionData.dateFormat || null)
		setTimeFormat(sectionData.timeFormat || null)
		setMinChoices(sectionData.minChoices || 1)
		setMaxChoices(sectionData.maxChoices || 1)
		setOptionsCount(sectionData.optionsCount || 3)

		setSmallLabel(sectionData.smallLabel || false)
		setMidLabel(sectionData.midLabel || false)
		setLargeLabel(sectionData.largeLabel || false)
	}

	const updateIconForActiveSection = (newIcon) => {
		setSections((prevSections) =>
			prevSections.map((section) =>
				section.id === activeSection ? { ...section, icon: newIcon } : section
			)
		)
		setUnsavedChanges(true)
	}

	const handleDelete = (id) => {
		setSections((prevSections) =>
			prevSections.filter((section) => section.id !== id)
		)
		setUnsavedChanges(true)
	}

	const moveSection = (fromIndex, toIndex) => {
		const updatedSections = Array.from(sections)

		const [movedItem] = updatedSections.splice(fromIndex, 1)
		updatedSections.splice(toIndex, 0, movedItem)

		setSections(updatedSections)
		setUnsavedChanges(true)
	}

	const handleBackgroundRemove = () => {
		setBackgroundImage(null)
		setUnsavedChanges(true)
	}

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="flex flex-col w-full min-h-screen bg-gray-100 font-inter">
				<NavBar
					childrenLeft={
						<Breadcrumbs
							items={[
								{ label: 'Survei Saya', link: '/dashboard/survey' },
								{ label: surveyTitle, link: `/dashboard/survey/edit/${id}` },
							]}
							separator="mdi:chevron-right"
							onTitleChange={handleTitleChange}
						/>
					}
					childrenCenter={
						<div className="absolute inset-0 top-0 left-0 right-0 w-full -z-10 flex-grow flex items-center justify-center space-x-8 text-base">
							{[
								{ label: 'Sunting', path: 'edit' },
								{ label: 'Pratinjau', path: 'preview' },
								{ label: 'Terbitkan', path: 'publish' },
								{ label: 'Hasil', path: 'results' },
							].map(({ label, path }) => (
								<Link
									key={label}
									to={`/dashboard/survey/${path}/${id}`}
									onClick={() => handleMenuClick(label)}
									className={`relative font-normal focus:outline-none ${
										activeMenu === label
											? 'text-blue-600 font-semibold'
											: 'text-gray-600'
									}`}
								>
									{label}
									{activeMenu === label && (
										<span className="absolute -top-8 left-0 right-0 h-[12px] bg-gradient-to-r from-[#1F38DB] to-[#30ADD7] rounded-b-md"></span>
									)}
								</Link>
							))}
						</div>
					}
					childrenRight={<ProfileMenu />}
				/>
				<Toaster position="bottom-right" />
				{location.pathname.includes('edit') && <div className="min-h-20" />}
				{location.pathname.includes('preview') && <div className="min-h-20" />}

				<div className="flex flex-grow">
					{onEdit && location.pathname.includes('edit') && (
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
							handleDelete={handleDelete}
							moveSection={moveSection}
							setSections={setSections}
							saveToLocalStorage={saveToLocalStorage}
						/>
					)}

					{(location.pathname.includes('edit') ||
						location.pathname.includes('preview')) && (
						<MainContent
							viewMode={viewMode}
							editMode={onEdit}
							sections={sections}
							activeSection={activeSection}
							contentText={contentText}
							textColor={textColor}
							buttonText={buttonText}
							buttonColor={buttonColor}
							buttonTextColor={buttonTextColor}
							bgColor={bgColor}
							backgroundImage={backgroundImage}
							bgOpacity={bgOpacity}
							title={title}
							description={description}
							setTitle={(value) => handleChange(setTitle, value)}
							setDescription={(value) => handleChange(setDescription, value)}
							toggleResponseCopy={toggleResponseCopy}
							mustBeFilled={mustBeFilled}
							listChoices={listChoices}
							setListChoices={setListChoices}
							handleAddOption={handleAddOption}
							otherOption={otherOption}
							minChoices={minChoices}
							maxChoices={maxChoices}
							optionsCount={optionsCount}
							setOptionsCount={setOptionsCount}
							smallLabel={smallLabel}
							midLabel={midLabel}
							largeLabel={largeLabel}
						/>
					)}
					{onEdit &&
						(location.pathname.includes('edit') ||
							location.pathname.includes('preview')) && (
							<RightSidebar
								contentProps={{
									contentText,
									setContentText: (value) =>
										handleChange(setContentText, value),
									setSelectedIcon: (value) => {
										setSelectedIcon(value)
										updateIconForActiveSection(value)
									},
									buttonText,
									setButtonText: (value) => handleChange(setButtonText, value),
									title,
									setTitle: (value) => handleChange(setTitle, value),
									description,
									setDescription: (value) =>
										handleChange(setDescription, value),
									toggleResponseCopy,
									setToggleResponseCopy: (value) =>
										handleChange(setToggleResponseCopy, value),
									mustBeFilled,
									setMustBeFilled: (value) =>
										handleChange(setMustBeFilled, value),
									otherOption,
									setOtherOption: (value) =>
										handleChange(setOtherOption, value),
									minChoices,
									setMinChoices: (value) => handleChange(setMinChoices, value),
									maxChoices,
									setMaxChoices: (value) => handleChange(setMaxChoices, value),
									dateFormat,
									setDateFormat: (value) => handleChange(setDateFormat, value),
									timeFormat,
									setTimeFormat: (value) => handleChange(setTimeFormat, value),
									optionsCount,
									setOptionsCount: (value) =>
										handleChange(setOptionsCount, value),
									smallLabel,
									setSmallLabel: (value) => handleChange(setSmallLabel, value),
									midLabel,
									setMidLabel: (value) => handleChange(setMidLabel, value),
									largeLabel,
									setLargeLabel: (value) => handleChange(setLargeLabel, value),
								}}
								designProps={{
									bgColor,
									setBgColor: (value) => handleChange(setBgColor, value),
									bgOpacity,
									setBgOpacity: (value) => handleChange(setBgOpacity, value),
									buttonColor,
									setButtonColor: (value) =>
										handleChange(setButtonColor, value),
									buttonTextColor,
									setButtonTextColor: (value) =>
										handleChange(setButtonTextColor, value),
									textColor,
									setTextColor: (value) => handleChange(setTextColor, value),
									backgroundImage,
									handleBackgroundChange,
									handleBackgroundRemove,
								}}
							/>
						)}

					{!onEdit && location.pathname.includes('preview') && (
						<RightSidebarPreview
							sections={sections}
							activeSection={activeSection}
							setActiveSection={handleSectionChange}
							toggleViewMode={toggleViewMode}
						/>
					)}
				</div>

				{location.pathname.includes('publish') && <Publish />}
				{location.pathname.includes('results') && <Results />}
				<Helmet>
					<title>{surveyTitle} - Sunting Survei | BeMySample</title>
				</Helmet>
			</div>
		</DndProvider>
	)
}

export default Edit
