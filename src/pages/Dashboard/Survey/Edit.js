import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import LeftSidebar from '../../../components/SurveyEdit/Edit/LeftSidebar'
import MainContent from '../../../components/SurveyEdit/Edit/MainContent'
import RightSidebar from '../../../components/SurveyEdit/Edit/RightSidebar'
import NavBar from '../../../components/Navbar'
import Breadcrumbs from '../../../components/SurveyEdit/Breadcrumbs'
import ProfilePict from '../../../assets/images/profilepict.png'
import { Icon } from '@iconify/react'
import { Helmet } from 'react-helmet'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const LOCAL_STORAGE_KEY = 'surveyData'

const getFormattedDate = () => {
	const date = new Date()
	const options = {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
		timeZone: 'Asia/Jakarta',
	}

	const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(date)
	return `${formattedDate} WIB`
}

const Edit = () => {
	const { id } = useParams()

	const [activeSection, setActiveSection] = useState('welcome')
	const [sections, setSections] = useState([
		{ id: 'welcome', label: 'Selamat datang', icon: 'hugeicons:start-up-02' },
		{ id: 'thankYou', label: 'Closing', icon: 'icon-park-outline:bye' },
	])

	const [surveyTitle, setSurveyTitle] = useState(
		JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))?.[id]?.surveyTitle ||
			'Survei Baru'
	)
	const [contentText, setContentText] = useState('')
	const [selectedIcon, setSelectedIcon] = useState('')
	const [surveyStatus, setSurveyStatus] = useState('draft')
	const [respondents, setRespondents] = useState(0)
	const [surveyUpdated, setSurveyUpdated] = useState(getFormattedDate())
	const [buttonText, setButtonText] = useState('Mulai')
	const [backgroundImage, setBackgroundImage] = useState(null)
	const [bgColor, setBgColor] = useState('#FFFFFF')
	const [buttonColor, setButtonColor] = useState('#1F38DB')
	const [buttonTextColor, setButtonTextColor] = useState('#FFFFFF')
	const [textColor, setTextColor] = useState('#000000')
	const [title, setTitle] = useState('Terima kasih!')
	const [description, setDescription] = useState(
		'Anda sudah menyelesaikan survei ini'
	)
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
			}, 1000)

			return () => clearTimeout(autoSaveTimeout)
		}
	}, [
		sections,
		surveyTitle,
		activeSection,
		contentText,
		buttonText,
		backgroundImage,
		bgColor,
		buttonColor,
		buttonTextColor,
		textColor,
		title,
		description,
		unsavedChanges,
	])

	useEffect(() => {
		const savedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {}
		const surveyData = savedData[id]

		if (surveyData) {
			setSections(surveyData.sections || sections)
			setSurveyTitle(surveyData.surveyTitle || 'Survei Baru')

			// Set the first section as active if there is no active section saved
			const initialSection = surveyData.activeSection || sections[0].id
			setActiveSection(initialSection)

			// Load other data as usual
			const sectionData = surveyData.data[initialSection] || {}
			setSurveyStatus(surveyData.status || 'draft')
			setRespondents(surveyData.respondents || 0)
			setSurveyUpdated(surveyData.updated || getFormattedDate())
			setContentText(sectionData.contentText || '')
			setButtonText(sectionData.buttonText || 'Mulai')
			setBackgroundImage(surveyData.backgroundImage || null)
			setBgColor(surveyData.bgColor || '#FFFFFF')
			setButtonColor(sectionData.buttonColor || '#1F38DB')
			setButtonTextColor(sectionData.buttonTextColor || '#FFFFFF')
			setTextColor(sectionData.textColor || '#000000')
			setTitle(sectionData.title || 'Terima kasih!')
			setDescription(
				sectionData.description || 'Anda sudah menyelesaikan survei ini.'
			)
		} else {
			// Set the first section as active if no data is found
			setActiveSection(sections[0].id)
		}
	}, [id])

	const saveToLocalStorage = (updatedSections = sections) => {
		const savedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {}

		const surveyData = {
			sections: updatedSections, // Gunakan sections yang diperbarui
			surveyTitle,
			data: {
				...savedData[id]?.data,
				[activeSection]: {
					contentText,
					buttonText,
					bgColor,
					buttonColor,
					buttonTextColor,
					textColor,
					title,
					description,
				},
			},
			bgColor: bgColor,
			backgroundImage: backgroundImage,
			status: surveyStatus,
			respondents: respondents,
			updated: getFormattedDate(),
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

		setButtonText(sectionData.buttonText || 'Mulai')
		setBackgroundImage(surveyData.backgroundImage || null)
		setBgColor(surveyData.bgColor || '#FFFFFF')
		setButtonColor(sectionData.buttonColor || '#1F38DB')
		setButtonTextColor(sectionData.buttonTextColor || '#FFFFFF')
		setTextColor(sectionData.textColor || '#000000')
		setTitle(sectionData.title || 'Isi Judul di sini')
		setDescription(sectionData.description || 'Isi deskripsi di sini')
	}

	const updateIconForActiveSection = (newIcon) => {
		setSections((prevSections) =>
			prevSections.map((section) =>
				section.id === activeSection ? { ...section, icon: newIcon } : section
			)
		)
		setUnsavedChanges(true)
	}

	const [activeMenu, setActiveMenu] = useState('Sunting')

	const handleMenuClick = (menu) => {
		setActiveMenu(menu)
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

	const [user, setUser] = useState({ name: '', avatar: '' })
	const navigate = useNavigate()

	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		const name = params.get('name')
		let avatar = params.get('avatar')
		const token = params.get('token')

		if (avatar && avatar.includes('=s96-c')) {
			avatar = avatar.replace('=s96-c', '')
		}

		if (name && avatar && token) {
			const userData = { name, avatar, token }
			localStorage.setItem('user', JSON.stringify(userData))
			setUser(userData)

			window.history.replaceState({}, document.title, '/dashboard')
		} else {
			const savedUser = JSON.parse(localStorage.getItem('user'))
			if (savedUser) {
				setUser(savedUser)
			} else {
				navigate('/login')
			}
		}
	}, [navigate])

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="flex flex-col w-full min-h-screen bg-gray-100 font-inter">
				<NavBar
					childrenLeft={
						<Breadcrumbs
							items={[
								{ label: 'Surveiku', link: '/dashboard' },
								{ label: surveyTitle, link: `/survey/edit/${id}` },
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
									to={`/survey/${path}/${id}`}
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
					childrenRight={
						<div className="flex flex-row gap-2 items-center font-inter text-base">
							<div className="hover:bg-zinc-100 px-4 py-2 rounded-lg flex flex-row gap-2 items-center justify-center text-base h-full">
								<Icon icon="akar-icons:coin" />
								<p>200.000</p>
							</div>
							<div className="hover:bg-zinc-100 px-4 py-2 rounded-lg flex flex-row gap-2 items-center justify-center text-base h-full">
								<img
									src={user?.avatar || ProfilePict}
									alt="profile"
									className="w-10 h-10 rounded-full"
								/>
							</div>
						</div>
					}
				/>
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
						handleDelete={handleDelete}
						moveSection={moveSection}
						setSections={setSections}
						saveToLocalStorage={saveToLocalStorage} // Tambahkan prop ini
					/>

					<MainContent
						sections={sections}
						activeSection={activeSection}
						contentText={contentText}
						textColor={textColor}
						buttonText={buttonText}
						buttonColor={buttonColor}
						buttonTextColor={buttonTextColor}
						bgColor={bgColor}
						backgroundImage={backgroundImage}
						title={title}
						description={description}
					/>
					<RightSidebar
						contentText={contentText}
						setContentText={(value) => handleChange(setContentText, value)}
						setSelectedIcon={(value) => {
							setSelectedIcon(value)
							updateIconForActiveSection(value)
						}}
						buttonText={buttonText}
						setButtonText={(value) => handleChange(setButtonText, value)}
						bgColor={bgColor}
						setBgColor={(value) => handleChange(setBgColor, value)}
						buttonColor={buttonColor}
						setButtonColor={(value) => handleChange(setButtonColor, value)}
						buttonTextColor={buttonTextColor}
						setButtonTextColor={(value) =>
							handleChange(setButtonTextColor, value)
						}
						textColor={textColor}
						setTextColor={(value) => handleChange(setTextColor, value)}
						backgroundImage={backgroundImage}
						handleBackgroundChange={handleBackgroundChange}
						handleBackgroundRemove={handleBackgroundRemove}
						activeSection={activeSection}
						title={title}
						setTitle={(value) => handleChange(setTitle, value)}
						description={description}
						setDescription={(value) => handleChange(setDescription, value)}
					/>
				</div>

				<Helmet>
					<title>{surveyTitle} - Sunting Survei | BeMySample</title>
				</Helmet>
			</div>
		</DndProvider>
	)
}

export default Edit
