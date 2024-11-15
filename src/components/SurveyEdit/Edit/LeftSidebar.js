import React from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { Icon } from '@iconify/react'

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
		<li
			ref={(node) => drag(drop(node))}
			className={`p-3 rounded-lg shadow-sm cursor-pointer flex items-center justify-between ${
				activeSection === item.id
					? item.icon === 'hugeicons:start-up-02' ||
					  item.icon === 'icon-park-outline:bye'
						? 'bg-[#2073DB] text-white'
						: 'bg-[#7F1FDB] text-white'
					: 'bg-white'
			}`}
			onClick={() => setActiveSection(item.id)}
			onDoubleClick={() => handleRename(item.id, item.label)}
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
						color:
							activeSection === item.id
								? '#FFFFFF'
								: item.icon === 'hugeicons:start-up-02' ||
								  item.icon === 'icon-park-outline:bye'
								? '#24B1DB'
								: '#7F1FDB',
					}}
				/>
				{isEditing === item.id ? (
					<input
						type="text"
						value={editedLabel}
						onChange={handleRenameChange}
						onBlur={() => handleRenameSubmit(item.id)}
						onKeyDown={(e) => e.key === 'Enter' && handleRenameSubmit(item.id)}
						autoFocus
						className={`outline-none ${
							activeSection === item.id ? 'bg-[#E6E6E6]' : 'bg-white'
						}`}
					/>
				) : (
					item.label
				)}
			</div>

			{/* Tampilkan ikon hapus hanya jika section bukan "welcome" atau "thankYou" */}
			{sectionsCount > 1 && item.id !== 'welcome' && item.id !== 'thankYou' && (
				<label title="Hapus">
					<Icon
						icon="mdi:delete"
						className={`${
							activeSection === item.id ? 'text-white' : 'text-red-500'
						} cursor-pointer ml-2`}
						onClick={(e) => {
							e.stopPropagation()
							handleDelete(item.id, index) // Pass the index as an argument
						}}
					/>
				</label>
			)}
		</li>
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
}) => {
	// Update handleDelete to accept index as parameter and handle activeSection change
	const handleDeleteWithActiveCheck = (id, index) => {
		// Only change active section if the deleted section is the active one
		if (id === activeSection) {
			const newActiveIndex = index > 0 ? index - 1 : 1 // Select previous section if exists, otherwise the next one
			setActiveSection(sections[newActiveIndex]?.id)
		}
		handleDelete(id) // Call the original handleDelete function
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
						handleDelete={handleDeleteWithActiveCheck} // Use the modified delete handler
						sectionsCount={sections.length}
					/>
				))}
			</ul>

			{/* Button untuk menambah item baru */}
			<li
				onClick={addItem}
				className="mt-4 p-2 flex items-center justify-start text-[#757575] cursor-pointer hover:text-[#24B1DB] border-2 border-zinc-300 hover:border-[#24B1DB] rounded-lg"
			>
				<Icon icon="mdi:plus" className="mr-1" />
				Tambahkan Item
			</li>
		</aside>
	)
}

export default LeftSidebar
