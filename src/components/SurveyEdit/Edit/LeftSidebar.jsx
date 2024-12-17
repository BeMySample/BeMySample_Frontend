import React, { useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom'

const ItemType = 'SECTION_ITEM'

const DraggableItem = ({
	item,
	index,
	moveSection,
	activeSection,
	setActiveSection,
	handleRename,
	isEditing,
	editedLabel,
	handleRenameChange,
	handleRenameSubmit,
	handleDelete,
	sectionsCount,
}) => {
	const [{ isDragging }, drag] = useDrag({
		type: ItemType,
		item: { index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	})

	const [, drop] = useDrop({
		accept: ItemType,
		hover: (draggedItem) => {
			if (draggedItem.index !== index) {
				moveSection(draggedItem.index, index)
				draggedItem.index = index
			}
		},
	})

	return (
		<motion.li
			ref={(node) => drag(drop(node))}
			className={`p-3 rounded-lg shadow-sm cursor-pointer flex items-center justify-between ${
				activeSection === item.id ? 'bg-blue-600 text-white' : 'bg-white'
			}`}
			onClick={() => setActiveSection(item.id)}
			onDoubleClick={() => handleRename(item.id, item.label)}
			style={{
				opacity: isDragging ? 0.2 : 1,
			}}
		>
			<div className="flex items-center">
				<Icon icon={item.icon} className="mr-2 text-lg" />
				{isEditing === item.id ? (
					<input
						type="text"
						value={editedLabel}
						onChange={handleRenameChange}
						onBlur={() => handleRenameSubmit(item.id)}
						onKeyDown={(e) => e.key === 'Enter' && handleRenameSubmit(item.id)}
						autoFocus
						className="outline-none bg-transparent text-white"
					/>
				) : (
					item.label
				)}
			</div>

			{sectionsCount > 1 && (
				<Icon
					icon="mdi:delete"
					className="text-red-500 cursor-pointer ml-2"
					onClick={(e) => {
						e.stopPropagation()
						handleDelete(item.id, index)
					}}
				/>
			)}
		</motion.li>
	)
}

const LeftSidebar = ({
	sections,
	activeSection,
	setActiveSection,
	setSections,
}) => {
	const [isEditing, setIsEditing] = useState(null)
	const [editedLabel, setEditedLabel] = useState('')
	const { id } = useParams()

	const token = Cookies.get('auth_token')

	const updateSurveyData = async (updatedSections) => {
		try {
			const response = await axios.get(
				`http://localhost:8000/api/surveys/${id}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			)

			const currentSurveyData = response.data.data
			const updatedSurveyData = {
				...currentSurveyData,
				sections: updatedSections,
			}

			await axios.put(
				`http://localhost:8000/api/surveys/${id}`,
				updatedSurveyData,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			)

			toast.success('Perubahan berhasil disimpan!')
		} catch (error) {
			console.error('Gagal menyimpan perubahan:', error)
			toast.error('Gagal menyimpan perubahan.')
		}
	}

	const handleRename = (id, label) => {
		setIsEditing(id)
		setEditedLabel(label)
	}

	const handleRenameSubmit = (id) => {
		setSections((prevSections) => {
			const updatedSections = prevSections.map((section) =>
				section.id === id ? { ...section, label: editedLabel } : section
			)
			updateSurveyData(updatedSections)
			return updatedSections
		})
		setIsEditing(null)
	}

	const handleDelete = async (surveyId, index) => {
		try {
			const response = await axios.get(
				`http://localhost:8000/api/surveys/${id}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			)

			const surveyData = response.data.data
			const updatedSections = surveyData.sections.filter(
				(section) => section.id !== surveyId
			)

			await axios.put(
				`http://localhost:8000/api/surveys/${id}`,
				{ ...surveyData, sections: updatedSections },
				{ headers: { Authorization: `Bearer ${token}` } }
			)

			setSections(updatedSections)
			setActiveSection(updatedSections[index - 1]?.id || null)
			toast.success('Bagian berhasil dihapus!')
		} catch (error) {
			console.error('Gagal menghapus bagian:', error)
			toast.error('Terjadi kesalahan saat menghapus bagian.')
		}
	}

	const addItem = () => {
		const newItem = {
			icon: 'hugeicons:start-up-02',
			label: 'Bagian Baru',
			bgColor: '#f2f2f2',
			bgOpacity: 2,
			buttonColor: '#0081FB',
			buttonText: 'Lanjut',
			buttonTextColor: '#fff',
			contentText: 'Selamat Datang',
			dateFormat: 'MM/DD/YYYY',
			description: 'Isi Deskripsi',
			largeLabel: '',
			listChoices: [], // Array kosong
			maxChoices: 1,
			midLabel: '',
			minChoices: 0,
			mustBeFilled: 0,
			optionsCount: 0,
			otherOption: 0,
			smallLabel: '',
			textColor: '#000000',
			timeFormat: '24-hour',
			title: 'Isi Judul',
			toggleResponseCopy: 0,
		}

		setSections((prevSections) => {
			const updatedSections = [...prevSections, newItem]
			updateSurveyData(updatedSections)
			return updatedSections
		})
		setActiveSection(newItem.id)
		toast.success('Bagian baru berhasil ditambahkan!')
	}

	return (
		<aside className="w-1/5 bg-neutral-100 p-4 overflow-y-auto max-h-[90vh]">
			<ul className="space-y-4">
				{sections.map((section, index) => (
					<DraggableItem
						key={section.id}
						item={section}
						index={index}
						moveSection={() => {}}
						activeSection={activeSection}
						setActiveSection={setActiveSection}
						handleRename={handleRename}
						isEditing={isEditing}
						editedLabel={editedLabel}
						handleRenameChange={(e) => setEditedLabel(e.target.value)}
						handleRenameSubmit={handleRenameSubmit}
						handleDelete={handleDelete}
						sectionsCount={sections.length}
					/>
				))}
			</ul>

			{/* Tombol Tambah Item hanya ada di akhir */}
			<li
				onClick={addItem}
				className="mt-4 p-2 flex items-center justify-start text-[#757575] cursor-pointer hover:text-[#2073DB] border-2 border-zinc-300 hover:border-[#2073DB] rounded-lg"
			>
				<Icon icon="mdi:plus" className="mr-1" />
				Tambahkan Item
			</li>
		</aside>
	)
}

export default LeftSidebar
