import React, { useState } from 'react'
import { Icon } from '@iconify/react'

const RightSidebar = ({
	sections,
	activeSection,
	setActiveSection,
	toggleViewMode,
}) => {
	const [isMobileView, setIsMobileView] = useState(false)

	const handleViewChange = (mode) => {
		setIsMobileView(mode === 'mobile')
		toggleViewMode(mode) // Memanggil fungsi dari Preview.js untuk mengubah tampilan di MainContent
	}

	return (
		<aside className="min-w-[350px] max-w-[500px] h-[10%] bg-neutral-100 p-4 flex flex-col justify-between">
			<div className="flex justify-center space-x-4 mb-4">
				<button
					className={`flex flex-col items-center justify-center p-2 w-full h-16 gap-2 rounded-lg ${
						!isMobileView
							? 'bg-[#2073DB] text-white'
							: 'bg-white text-black border-2 border-[#2073DB]'
					} cursor-pointer`}
					onClick={() => handleViewChange('desktop')}
				>
					<Icon icon="mynaui:desktop" className="text-2xl" />
					<span className="text-xs leading-3">Desktop</span>
				</button>
				<button
					className={`flex flex-col items-center justify-center p-2 w-full h-16 gap-2 rounded-lg ${
						isMobileView
							? 'bg-[#2073DB] text-white'
							: 'bg-white text-black border-2 border-[#2073DB]'
					} cursor-pointer`}
					onClick={() => handleViewChange('mobile')}
				>
					<Icon icon="proicons:phone" className="text-2xl" />
					<span className="text-xs leading-3">Mobile</span>
				</button>
			</div>

			<div
				className="overflow-y-auto space-y-4"
				style={{ height: 'calc(100vh - 19.2rem)' }}
			>
				<ul className="space-y-4">
					{sections.map((section) => (
						<li
							key={section.id}
							className={`p-3 rounded-lg shadow-sm cursor-pointer flex items-center ${
								activeSection === section.id
									? 'bg-[#2073DB] text-white'
									: 'bg-white'
							}`}
							onClick={() => setActiveSection(section.id)}
						>
							<Icon
								icon={section.icon}
								className="mr-2 text-lg"
								style={{
									color:
										activeSection === section.id
											? '#FFFFFF' // Warna putih saat aktif
											: section.icon === 'hugeicons:start-up-02' ||
											  section.icon === 'icon-park-outline:bye'
											? '#24B1DB'
											: '#7F1FDB',
								}}
							/>
							{section.label}
						</li>
					))}

					<li className="flex flex-row gap-2 items-center justify-center text-[#6A6A6A] text-sm">
						<Icon icon="basil:eye-outline" fontSize={20} />
						<p>Hanya Anda yang dapat melihat ini</p>
					</li>
				</ul>
			</div>

			<div className="mt-6 space-y-2 h-[10%]">
				<button className="w-full py-2 border border-blue-600 text-blue-600 rounded-lg flex items-center justify-center gap-2">
					<Icon icon="material-symbols:edit-outline" />
					Sunting
				</button>
				<button className="w-full py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2">
					<Icon icon="lucide:upload" />
					Terbitkan
				</button>
			</div>
		</aside>
	)
}

export default RightSidebar
