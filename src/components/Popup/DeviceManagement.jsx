import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { motion, AnimatePresence } from 'framer-motion'

const DeviceManagementPopup = ({ onClose }) => {
	const [devices, setDevices] = useState([
		{
			id: 1,
			name: 'Google Chrome di Windows',
			location: 'Jawa Timur, Indonesia',
			details: 'Pertama kali masuk pada 3 Mei 2023\nWindows 11',
			current: true,
			expanded: false,
		},
		{
			id: 2,
			name: 'Google Pixel 9 XL',
			location: 'Jawa Timur, Indonesia',
			details: '',
			current: false,
			expanded: false,
		},
		{
			id: 3,
			name: 'Samsung Galaxy Z Flip 6',
			location: 'Makassar, Indonesia',
			details: '',
			current: false,
			expanded: false,
		},
	])

	const toggleExpand = (id) => {
		setDevices((prevDevices) =>
			prevDevices.map((device) =>
				device.id === id
					? { ...device, expanded: !device.expanded }
					: { ...device, expanded: false }
			)
		)
	}

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white p-6 rounded-lg shadow-lg w-[32rem] relative">
				<h3 className="text-xl font-semibold mb-4 text-[#1F38DB]">
					Perangkat Anda
				</h3>
				<p className="text-sm text-gray-600 mb-6">
					Periksa hingga keluarkan perangkat yang masuk dengan akun Anda
				</p>

				<div className="space-y-4">
					{devices.map((device) => (
						<div
							key={device.id}
							className={`border rounded-lg p-4 ${
								device.expanded
									? 'bg-blue-50 border-blue-500'
									: 'bg-gray-50 border-gray-300'
							} cursor-pointer`}
							onClick={() => toggleExpand(device.id)}
						>
							<div className="flex justify-between items-center">
								<div>
									<p className="text-gray-800 font-medium">{device.name}</p>
									<p className="text-sm text-gray-600 flex items-center gap-1">
										{device.location}{' '}
										{device.current && (
											<Icon
												icon="mdi:check-circle"
												className="text-blue-500 text-lg"
											/>
										)}
									</p>
								</div>
								<Icon
									icon={device.expanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}
									className="text-xl text-gray-500 hover:text-gray-700"
								/>
							</div>
							<AnimatePresence>
								{device.expanded && (
									<motion.div
										initial={{ opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: 'auto' }}
										exit={{ opacity: 0, height: 0 }}
										className="mt-4 border-t border-gray-200 pt-2 overflow-hidden"
									>
										<p className="text-sm text-gray-600 whitespace-pre-line">
											{device.details || 'Tidak ada detail tambahan'}
										</p>
										<div className="flex justify-between items-center mt-2">
											<p className="text-sm text-gray-600">
												Keluarkan perangkat ini jika mencurigakan.
											</p>
											<button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition flex items-center gap-2">
												<Icon icon="mdi:logout" className="text-gray-600" />
												Keluarkan
											</button>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					))}
				</div>

				<div className="flex justify-end mt-6">
					<button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 flex items-center gap-2">
						<Icon icon="mdi:logout" className="text-xl" /> Keluarkan Semua
					</button>
				</div>

				<button
					className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition"
					onClick={onClose}
				>
					<Icon icon="mdi:close" className="text-xl" />
				</button>
			</div>
		</div>
	)
}

export default DeviceManagementPopup
