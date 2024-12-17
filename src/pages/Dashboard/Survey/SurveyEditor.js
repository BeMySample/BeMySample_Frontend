import React, { useState, useEffect } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import LeftSidebar from '../../../components/SurveyEdit/Edit/LeftSidebar'
import MainContent from '../../../components/SurveyEdit/Edit/MainContent'
import RightSidebar from '../../../components/SurveyEdit/Edit/RightSidebar'
import RightSidebarPreview from '../../../components/SurveyEdit/Preview/RightSidebar'
import NavBar from '../../../components/Navbar'
import Breadcrumbs from '../../../components/SurveyEdit/Breadcrumbs'
import { Icon } from '@iconify/react'
import { Helmet } from 'react-helmet'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import ProfileMenu from '../../../components/ProfileMenu'
import Publish from './Publish'
import Results from './Results'
import Cookies from 'js-cookie'
import axios from 'axios'
import Loading from 'react-loading'

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

	return `${new Intl.DateTimeFormat('id-ID', options).format(date)} WIB`
}

const Edit = ({ onEdit }) => {
	const { id } = useParams()
	const location = useLocation()

	const [viewMode, setViewMode] = useState('desktop')
	const [isLoading, setIsLoading] = useState(true)
	const [surveyData, setSurveyData] = useState({})

	const toggleViewMode = (mode) => {
		setViewMode(mode)
	}

	// State
	const [surveyTitle, setSurveyTitle] = useState('')
	const [selectedIcon, setSelectedIcon] = useState('')
	const [sections, setSections] = useState([])
	const [createdByAI, setCreatedByAI] = useState(false)
	const [surveyStatus, setSurveyStatus] = useState('draft')
	const [respondents, setRespondents] = useState(0)
	const [surveyUpdated, setSurveyUpdated] = useState(getFormattedDate())
	const [backgroundImage, setBackgroundImage] = useState(null)
	const [bgColor, setBgColor] = useState('#FFFFFF')
	const [bgOpacity, setBgOpacity] = useState(100)
	const [buttonColor, setButtonColor] = useState('#1F38DB')
	const [buttonText, setButtonText] = useState('Lanjutkan')
	const [buttonTextColor, setButtonTextColor] = useState('#FFFFFF')
	const [activeMenu, setActiveMenu] = useState('')
	const [activeSection, setActiveSection] = useState(null)

	const [contentText, setContentText] = useState('')
	const [dateFormat, setDateFormat] = useState('DD/MM/YYYY')
	const [timeFormat, setTimeFormat] = useState('24-hour')
	const [description, setDescription] = useState('')
	const [largeLabel, setLargeLabel] = useState('')
	const [listChoices, setListChoices] = useState([])
	const [maxChoices, setMaxChoices] = useState(1)
	const [midLabel, setMidLabel] = useState('')
	const [minChoices, setMinChoices] = useState(1)
	const [mustBeFilled, setMustBeFilled] = useState(false)
	const [optionsCount, setOptionsCount] = useState(1)
	const [otherOption, setOtherOption] = useState(false)
	const [smallLabel, setSmallLabel] = useState('')
	const [textColor, setTextColor] = useState('')
	const [title, setTitle] = useState('')
	const [toggleResponseCopy, setToggleResponseCopy] = useState(false)

	const [unsavedChanges, setUnsavedChanges] = useState(false)
	const [isEditing, setIsEditing] = useState(null)
	const [editedLabel, setEditedLabel] = useState('')

	// Fetch data dari API
	useEffect(() => {
		const fetchSurveyData = async () => {
			try {
				const token = Cookies.get('auth_token')
				const response = await fetch(
					`http://localhost:8000/api/surveys/${id}`,
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`, // Ganti token ini dengan token valid
						},
					}
				)

				const result = await response.json()

				// Cek status response
				if (!response.ok || !result.success) {
					throw new Error(result.message || 'Gagal mengambil data survei.')
				}

				const surveyData = result.data
				setSurveyData(surveyData)
				console.log('Survey data:', surveyData)

				// Parsing sections dari API (listChoices dalam bentuk string JSON)
				const parsedSections = surveyData.sections.map((section) => ({
					id: section.id,
					icon: section.icon,
					label: section.label,
					bgColor: section.bgColor || '#FFFFFF',
					bgOpacity: section.bgOpacity || 100,
					buttonColor: section.buttonColor,
					buttonText: section.buttonText,
					buttonTextColor: section.buttonTextColor,
					contentText: section.contentText,
					dateFormat: section.dateFormat,
					description: section.description,
					largeLabel: section.largeLabel,
					listChoices: JSON.parse(section.listChoices), // Parse string JSON
					maxChoices: section.maxChoices,
					midLabel: section.midLabel,
					minChoices: section.minChoices,
					mustBeFilled: section.mustBeFilled === 1,
					otherOption: section.otherOption === 1,
					optionsCount: section.optionsCount,
					smallLabel: section.smallLabel,
					textColor: section.textColor,
					timeFormat: section.timeFormat,
					title: section.title,
					toggleResponseCopy: section.toggleResponseCopy === 1,
				}))

				// Set state berdasarkan data API
				setSurveyTitle(surveyData.surveyTitle)
				console.log(surveyTitle)
				setSections(parsedSections)
				setCreatedByAI(surveyData.createdByAI === 1)
				setSurveyStatus(surveyData.status || 'draft')
				setRespondents(surveyData.respondents || 0)
				setBackgroundImage(surveyData.backgroundImage || null)
				setBgColor(surveyData.bgColor || '#FFFFFF')
				setBgOpacity(surveyData.bgOpacity || 100)
				setContentText(parsedSections[0]?.contentText || '')
				setSurveyUpdated(surveyData.updated_at || getFormattedDate())
				setActiveSection(parsedSections[0]?.id || null)
				setDateFormat(parsedSections[0]?.dateFormat || 'DD/MM/YYYY')
				setDescription(parsedSections[0]?.description || '')
				setLargeLabel(parsedSections[0]?.largeLabel || '')
				setListChoices(parsedSections[0]?.listChoices || [])
				setMaxChoices(parsedSections[0]?.maxChoices || 1)
				setMidLabel(parsedSections[0]?.midLabel || '')
				setMinChoices(parsedSections[0]?.minChoices || 1)
				setMustBeFilled(parsedSections[0]?.mustBeFilled || false)
				setOtherOption(parsedSections[0]?.otherOption || false)
				setOptionsCount(parsedSections[0]?.optionsCount || 1)
				setSmallLabel(parsedSections[0]?.smallLabel || '')
				setTextColor(parsedSections[0]?.textColor || '')
				setTimeFormat(parsedSections[0]?.timeFormat || '24-hour')
				setTitle(parsedSections[0]?.title || '')
				setToggleResponseCopy(parsedSections[0]?.toggleResponseCopy || false)
			} catch (error) {
				console.error('Terjadi kesalahan saat mengambil data survei:', error)
				toast.error('Gagal mengambil data survei.')
			} finally {
				setIsLoading(false)
			}
		}

		fetchSurveyData()
	}, [id])

	useEffect(() => {
		if (surveyData.surveyTitle) {
			setSurveyTitle(surveyData.surveyTitle)
		}
	}, [surveyData])

	const handleSectionChange = (id) => {
		setActiveSection(id)
		console.log('Active section:', id)
	}

	const currentSection = sections.find(
		(section) => section.id === activeSection
	)

	// Fungsi untuk mengganti menu aktif
	const handleMenuClick = (label) => {
		setActiveMenu(label)
	}

	// Fungsi untuk mengganti judul survei
	const handleTitleChange = async (newTitle) => {
		try {
			// Update local state for immediate feedback
			setSurveyTitle(newTitle)
			setUnsavedChanges(true)

			// Buat payload lengkap berdasarkan state surveyData
			const updatedData = {
				...surveyData, // Data lengkap dari surveyData
				surveyTitle: newTitle, // Hanya surveyTitle yang diperbarui
				sections: surveyData.sections || [], // Pastikan sections tidak null
				kriteria: surveyData.kriteria || [], // Pastikan kriteria tidak null
			}

			// Kirim PUT request ke server
			const token = Cookies.get('auth_token')
			await axios.put(`http://localhost:8000/api/surveys/${id}`, updatedData, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})

			toast.success('Judul survei berhasil diperbarui!')
			setSurveyData((prev) => ({
				...prev,
				surveyTitle: newTitle, // Update state surveyData
			}))
		} catch (error) {
			console.error('Gagal memperbarui judul survei:', error)
			toast.error('Gagal memperbarui judul survei. Coba lagi.')
		}
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

	const handleUpdateSurvey = async () => {
		try {
			const updatedSurveyData = {
				...surveyData, // Ambil semua data survei
				sections: sections, // Update bagian sections
			}

			console.log('Updated survey data:', updatedSurveyData)

			// Kirim PUT request ke API
			const response = await axios.put(
				`http://localhost:8000/api/surveys/${id}`,
				updatedSurveyData,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${Cookies.get('auth_token')}`,
					},
				}
			)

			// Update state lokal dengan data dari response backend
			setSurveyData(response.data.data)
			toast.success('Data survei berhasil diperbarui!')
		} catch (error) {
			console.error('Gagal memperbarui survei:', error)
			toast.error('Gagal memperbarui data survei.')
		}
	}

	const updateSectionProp = (key, value) => {
		setSections((prevSections) =>
			prevSections.map((section) =>
				section.id === activeSection
					? { ...section, [key]: value } // Update hanya prop yang diubah
					: section
			)
		)

		console.log(
			'Section aktif sebelum update:',
			sections.find((s) => s.id === activeSection)
		)

		console.log('Updated section:', key, value)
		console.log('Sections:', sections)

		// Langsung update ke backend setelah perubahan
		setUnsavedChanges(true)
		handleUpdateSurvey()
	}

	const handleTitleChangeInSection = async (newTitle) => {
		try {
			// Update state lokal
			const updatedSections = sections.map((section) =>
				section.id === activeSection ? { ...section, title: newTitle } : section
			)
			setSections(updatedSections)
			setUnsavedChanges(true)

			// Ambil data survei saat ini dari backend
			const token = Cookies.get('auth_token')
			const response = await axios.get(
				`http://localhost:8000/api/surveys/${id}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			)

			if (!response.data.success) {
				throw new Error('Gagal mengambil data survei.')
			}

			const currentSurveyData = response.data.data

			// Perbarui bagian `sections` dengan data terbaru
			const updatedSurveyData = {
				...currentSurveyData,
				sections: updatedSections,
			}

			// Kirim PUT request untuk memperbarui data survei
			await axios.put(
				`http://localhost:8000/api/surveys/${id}`,
				updatedSurveyData,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			)

			toast.success('Judul berhasil diperbarui!')
		} catch (error) {
			console.error('Gagal memperbarui judul:', error)
			toast.error('Gagal memperbarui judul.')
		}
	}

	useEffect(() => {
		// Dapatkan path saat ini dan tentukan activeMenu berdasarkan URL
		const pathMap = {
			edit: 'Sunting',
			preview: 'Pratinjau',
			publish: 'Terbit',
			results: 'Hasil',
		}

		const currentPath = location.pathname.split('/')[3] // Ambil bagian path ke-3 dari URL
		setActiveMenu(pathMap[currentPath] || '') // Set activeMenu berdasarkan URL
	}, [location]) // Berjalan setiap URL berubah

	// Render komponen
	return (
		<DndProvider backend={HTML5Backend}>
			<div className="flex flex-col w-full min-h-screen bg-gray-100 font-inter">
				{isLoading ? (
					<div className="absolute left-0 bottom-0 right-0 flex flex-col justify-center items-center w-full bg-white bg-opacity-90 backdrop-blur-md z-20 h-screen">
						<Loading type="spin" color="#1F38DB" height={50} width={50} />
						<p className="mt-4 text-gray-700 font-semibold">
							Memuat data survei...
						</p>
					</div>
				) : (
					<NavBar
						childrenLeft={
							<Breadcrumbs
								items={[
									{ label: 'Survei Saya', link: '/dashboard/survey' },
									{
										label:
											surveyData?.surveyTitle || surveyTitle || 'Loading...',
										link: `/dashboard/survey/edit/${id}`,
									},
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
									{ label: 'Terbit', path: 'publish' },
									{ label: 'Hasil', path: 'results' },
								].map(({ label, path }) => (
									<Link
										key={label}
										to={`/dashboard/survey/${path}/${id}`}
										onClick={() => setActiveMenu(label)} // Set saat menu diklik
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
				)}
				<Toaster position="bottom-right" />

				{location.pathname.includes('edit') && <div className="min-h-20" />}
				{location.pathname.includes('preview') && <div className="min-h-20" />}

				<div className="flex flex-grow">
					{onEdit && location.pathname.includes('edit') && (
						<LeftSidebar
							sections={sections}
							activeSection={activeSection}
							setActiveSection={handleSectionChange}
							setSections={setSections}
							handleRenameChange={handleRenameChange}
							handleRenameSubmit={handleRenameSubmit}
							handleRename={handleRename}
						/>
					)}

					{(location.pathname.includes('edit') ||
						location.pathname.includes('preview')) && (
						<MainContent
							viewMode={viewMode}
							sections={sections}
							activeSection={activeSection}
							bgColor={currentSection?.bgColor || bgColor}
							backgroundImage={backgroundImage}
							bgOpacity={currentSection?.bgOpacity || bgOpacity}
							buttonText={currentSection?.buttonText || buttonText}
							buttonTextColor={
								currentSection?.buttonTextColor || buttonTextColor
							}
							buttonColor={currentSection?.buttonColor || buttonColor}
							contentText={currentSection?.contentText || contentText}
							dateFormat={currentSection?.dateFormat || dateFormat}
							description={currentSection?.description || description}
							largeLabel={currentSection?.largeLabel || largeLabel}
							listChoices={currentSection?.listChoices || listChoices}
							maxChoices={currentSection?.maxChoices || maxChoices}
							midLabel={currentSection?.midLabel || midLabel}
							minChoices={currentSection?.minChoices || minChoices}
							mustBeFilled={currentSection?.mustBeFilled || mustBeFilled}
							otherOption={currentSection?.otherOption || otherOption}
							smallLabel={currentSection?.smallLabel || smallLabel}
							textColor={currentSection?.textColor || textColor}
							timeFormat={currentSection?.timeFormat || timeFormat}
							title={currentSection?.title || title}
							setTitle={handleTitleChangeInSection}
							toggleResponseCopy={
								currentSection?.toggleResponseCopy || toggleResponseCopy
							}
						/>
					)}

					{onEdit &&
						(location.pathname.includes('edit') ||
							location.pathname.includes('preview')) && (
							<RightSidebar
								contentProps={{
									contentText: currentSection?.contentText || '',
									setContentText: (value) =>
										updateSectionProp('contentText', value),
									dateFormat: currentSection?.dateFormat || 'MM/DD/YYYY',
									setDateFormat: (value) =>
										updateSectionProp('dateFormat', value),
									largeLabel: currentSection?.largeLabel || '',
									setLargeLabel: (value) =>
										updateSectionProp('largeLabel', value),
									maxChoices: currentSection?.maxChoices || 1,
									setMaxChoices: (value) =>
										updateSectionProp('maxChoices', value),
									midLabel: currentSection?.midLabel || '',
									setMidLabel: (value) => updateSectionProp('midLabel', value),
									minChoices: currentSection?.minChoices || 0,
									setMinChoices: (value) =>
										updateSectionProp('minChoices', value),
									mustBeFilled: currentSection?.mustBeFilled || false,
									setMustBeFilled: (value) =>
										updateSectionProp('mustBeFilled', value),
									otherOption: currentSection?.otherOption || false,
									setOtherOption: (value) =>
										updateSectionProp('otherOption', value),
									optionsCount: currentSection?.optionsCount || 1,
									setOptionsCount: (value) =>
										updateSectionProp('optionsCount', value),
									smallLabel: currentSection?.smallLabel || '',
									setSmallLabel: (value) =>
										updateSectionProp('smallLabel', value),
									textColor: currentSection?.textColor || '#000000',
									setTextColor: (value) =>
										updateSectionProp('textColor', value),
									timeFormat: currentSection?.timeFormat || '24-hour',
									setTimeFormat: (value) =>
										updateSectionProp('timeFormat', value),
									toggleResponseCopy:
										currentSection?.toggleResponseCopy || false,
									setToggleResponseCopy: (value) =>
										updateSectionProp('toggleResponseCopy', value),
									buttonText: currentSection?.buttonText || 'Next',
									setButtonText: (value) =>
										updateSectionProp('buttonText', value),
									setSelectedIcon: (value) => updateSectionProp('icon', value), // Set icon
								}}
								designProps={{
									bgColor: currentSection?.bgColor || bgColor,
									setBgColor: (value) => handleUpdateSurvey('bgColor', value),
									bgOpacity: currentSection?.bgOpacity || bgOpacity,
									setBgOpacity: (value) =>
										handleUpdateSurvey('bgOpacity', value),
									backgroundImage: backgroundImage,
									setBackgroundImage: (value) =>
										handleUpdateSurvey('backgroundImage', value),
									textColor: currentSection?.textColor || textColor,
									setTextColor: (value) =>
										handleUpdateSurvey('textColor', value),
									buttonColor: currentSection?.buttonColor || buttonColor,
									setButtonColor: (value) =>
										handleUpdateSurvey('buttonColor', value),
									buttonTextColor:
										currentSection?.buttonTextColor || buttonTextColor,
									setButtonTextColor: (value) =>
										handleUpdateSurvey('buttonTextColor', value),
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

				{location.pathname.includes('publish') && (
					<Publish id={id} surveyData={surveyData} />
				)}
				{location.pathname.includes('results') && (
					<Results id={id} surveyData={surveyData} />
				)}
				<Helmet>
					<title>{surveyTitle} - Sunting Survei | BeMySample</title>
				</Helmet>
			</div>
		</DndProvider>
	)
}

export default Edit
