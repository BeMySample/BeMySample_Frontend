import React from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

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
	addItemBetween,
	hoveredIndex,
	setHoveredIndex,
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
		<>
			{index !== 0 && hoveredIndex === index && (
				<motion.div
					className="relative flex justify-center items-center"
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.8 }}
					onMouseLeave={() => setHoveredIndex(null)}
				>
					<button
						className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:scale-110 transition-all"
						onClick={() => addItemBetween(index - 1)}
					>
						<Icon icon="mdi:plus" />
					</button>
				</motion.div>
			)}

			<motion.li
				ref={(node) => drag(drop(node))}
				className={`p-3 rounded-lg shadow-sm cursor-pointer flex items-center justify-between ${
					activeSection === item.id ? 'bg-blue-600 text-white' : 'bg-white'
				}`}
				onClick={() => setActiveSection(item.id)}
				onDoubleClick={() => handleRename(item.id, item.label)}
				onMouseEnter={() => setHoveredIndex(index)}
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: 20, opacity: 0 }}
				style={{
					opacity: isDragging ? 0.2 : 1,
					zIndex: isDragging ? 1000 : 'auto',
					transform: isDragging ? 'scale(1.02)' : 'scale(1)',
				}}
			>
				<div className="flex items-center">
					<Icon
						icon={item.icon}
						className="mr-2 text-lg"
						style={{
							color: activeSection === item.id ? '#FFFFFF' : '#7F1FDB',
						}}
					/>
					{isEditing === item.id ? (
						<input
							type="text"
							value={editedLabel}
							onChange={handleRenameChange}
							onBlur={() => handleRenameSubmit(item.id)}
							onKeyDown={(e) =>
								e.key === 'Enter' && handleRenameSubmit(item.id)
							}
							autoFocus
							className="outline-none bg-transparent"
						/>
					) : (
						item.label
					)}
				</div>

				{sectionsCount > 1 &&
					item.id !== 'welcome' &&
					item.id !== 'thankYou' && (
						<label title="Hapus">
							<Icon
								icon="mdi:delete"
								className={`
									${activeSection === item.id ? 'text-white' : 'text-red-500 '}
									cursor-pointer ml-2`}
								onClick={(e) => {
									e.stopPropagation()
									handleDelete(item.id, index)
								}}
							/>
						</label>
					)}
			</motion.li>
		</>
	)
}

const LeftSidebar = ({
	sections,
	activeSection,
	setActiveSection,
	addItem,
	handleRename,
	isEditing,
	editedLabel,
	handleRenameChange,
	handleRenameSubmit,
	handleDelete,
	moveSection,
	setSections,
	saveToLocalStorage,
}) => {
	const [hoveredIndex, setHoveredIndex] = useState(null)

	const addItemBetween = (index) => {
		const newItem = {
			id: `item-${Date.now()}`, // ID berdasarkan posisi halaman
			label: `Halaman ${index + 2}`, // Label berdasarkan posisi
			icon: 'mdi:file-document-outline',
		}

		setSections((prevSections) => {
			const updatedSections = [...prevSections]
			updatedSections.splice(index + 1, 0, newItem) // Tambahkan di posisi yang diinginkan

			// Tambahkan delay sebelum menyimpan
			setTimeout(() => {
				saveToLocalStorage(updatedSections) // Simpan setelah 1 detik
				toast('Perubahan otomatis disimpan!', {
					icon: <Icon icon="line-md:check-all" />,
					style: {
						borderRadius: '10px',
						background: '#2073DB',
						color: '#fff',
					},
					position: 'bottom-right',
				})
			}, 1000)

			return updatedSections
		})

		setActiveSection(newItem.id) // Atur section baru sebagai active section
	}

	const handleDeleteWithActiveCheck = (id, index) => {
		setSections((prevSections) => {
			const updatedSections = prevSections.filter(
				(section) => section.id !== id
			)

			// Perbarui activeSection jika section yang dihapus adalah yang aktif
			if (id === activeSection) {
				const newActiveIndex = index > 0 ? index - 1 : 0 // Pilih section sebelumnya atau pertama
				setActiveSection(updatedSections[newActiveIndex]?.id || null)
			}

			setTimeout(() => {
				saveToLocalStorage(updatedSections) // Simpan setelah 1 detik
				toast('Perubahan otomatis disimpan!', {
					icon: <Icon icon="line-md:check-all" />,
					style: {
						borderRadius: '10px',
						background: '#2073DB',
						color: '#fff',
					},
					position: 'bottom-right',
				})
			}, 1000)

			return updatedSections
		})
	}

	return (
		<aside className="w-1/5 bg-neutral-100 p-4 overflow-y-auto max-h-[90vh]">
			<ul className="space-y-4">
				{sections.map((section, index) => (
					<DraggableItem
						key={section.id}
						item={section}
						index={index}
						moveSection={moveSection}
						activeSection={activeSection}
						setActiveSection={setActiveSection}
						handleRename={handleRename}
						isEditing={isEditing}
						editedLabel={editedLabel}
						handleRenameChange={handleRenameChange}
						handleRenameSubmit={handleRenameSubmit}
						handleDelete={handleDeleteWithActiveCheck}
						sectionsCount={sections.length}
						addItemBetween={addItemBetween}
						hoveredIndex={hoveredIndex}
						setHoveredIndex={setHoveredIndex}
					/>
				))}
			</ul>

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
