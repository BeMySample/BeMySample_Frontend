import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import RightSidebar from '../../../components/SurveyEdit/Preview/RightSidebar'
import MainContent from '../../../components/SurveyEdit/Preview/MainContent'
import NavBar from '../../../components/Navbar'
import Breadcrumbs from '../../../components/Breadcrumbs'
import ProfilePict from '../../../assets/images/profilepict.png'
import { Icon } from '@iconify/react'
import { Helmet } from 'react-helmet'

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

const Preview = () => {
	const { id } = useParams()

	const [viewMode, setViewMode] = useState('desktop')

	const toggleViewMode = (mode) => {
		setViewMode(mode)
	}

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
	const [surveyStatus, setSurveyStatus] = useState('draft')
	const [respondents, setRespondents] = useState(0)
	const [surveyUpdated, setSurveyUpdated] = useState(getFormattedDate())
	const [buttonText, setButtonText] = useState('Mulai')
	const [backgroundImage, setBackgroundImage] = useState(null)
	const [bgColor, setBgColor] = useState('#FFFFFF')
	const [buttonColor, setButtonColor] = useState('#1F38DB')
	const [textColor, setTextColor] = useState('#000000')
	const [title, setTitle] = useState('Isi Judul di sini')
	const [description, setDescription] = useState('Isi deskripsi di sini')
	const [unsavedChanges, setUnsavedChanges] = useState(false)

	useEffect(() => {
		const savedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {}
		const surveyData = savedData[id]

		if (surveyData) {
			setSections(surveyData.sections || sections)
			setSurveyTitle(surveyData.surveyTitle || 'Survei Baru')
			setActiveSection(surveyData.activeSection || 'welcome')

			const sectionData = surveyData.data[surveyData.activeSection] || {}
			setSurveyStatus(surveyData.status || 'draft')
			setRespondents(surveyData.respondents || 0)
			setSurveyUpdated(surveyData.updated || getFormattedDate())
			setContentText(sectionData.contentText || '')
			setButtonText(sectionData.buttonText || 'Mulai')
			setBackgroundImage(surveyData.backgroundImage || null)
			setBgColor(surveyData.bgColor || '#FFFFFF')
			setButtonColor(sectionData.buttonColor || '#1F38DB')
			setTextColor(sectionData.textColor || '#000000')
			setTitle(sectionData.title || 'Isi Judul di sini')
			setDescription(sectionData.description || 'Isi deskripsi di sini')
		}
	}, [id])

	const handleTitleChange = (newTitle) => {
		setSurveyTitle(newTitle)
		setUnsavedChanges(true)
	}

	const handleSectionChange = (sectionId) => {
		setActiveSection(sectionId)

		const savedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {}
		const surveyData = savedData[id] || {}
		const sectionData = savedData[id]?.data[sectionId] || {}
		setContentText(sectionData.contentText || '')

		setButtonText(sectionData.buttonText || 'Mulai')
		setBackgroundImage(surveyData.backgroundImage || null)
		setBgColor(surveyData.bgColor || '#FFFFFF')
		setButtonColor(sectionData.buttonColor || '#1F38DB')
		setTextColor(sectionData.textColor || '#000000')
		setTitle(sectionData.title || 'Isi Judul di sini')
		setDescription(sectionData.description || 'Isi deskripsi di sini')
	}

	const [activeMenu, setActiveMenu] = useState('Pratinjau')

	const handleMenuClick = (menu) => {
		setActiveMenu(menu)
	}

	return (
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
									activeMenu === label ? 'text-blue-600 font-semibold' : 'text-gray-600'
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
								src={ProfilePict}
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
				<MainContent
					contentText={contentText}
					textColor={textColor}
					buttonText={buttonText}
					buttonColor={buttonColor}
					bgColor={bgColor}
					backgroundImage={backgroundImage}
					title={title}
					description={description}
					viewMode={viewMode}
				/>
				<RightSidebar
					sections={sections}
					activeSection={activeSection}
					setActiveSection={handleSectionChange}
					toggleViewMode={toggleViewMode}
				/>
			</div>

			<Helmet>
				<title>{surveyTitle} - Pratinjau Survei | BeMySample</title>
			</Helmet>
		</div>
	)
}

export default Preview
