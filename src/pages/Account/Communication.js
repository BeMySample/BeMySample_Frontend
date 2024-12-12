import React, { useState } from 'react'
import { Icon } from '@iconify/react'

const Communication = () => {
	const [generalInfo, setGeneralInfo] = useState(true)
	const [newsletter, setNewsletter] = useState(true)

	return (
		<div className="bg-white p-4 rounded-lg shadow-md">
			<h3 className="text-xl font-semibold mb-4 flex items-center gap-2 justify-center">
				<Icon icon="mdi:email-outline" className="text-2xl text-gray-800" />
				Komunikasi
			</h3>

			<div className="space-y-4">
				<div className="flex justify-between items-center">
					<div>
						<p className="text-gray-800 font-medium">
							Informasi umum, tips, dan pengenalan produk
						</p>
						<p className="text-sm text-gray-600">Kiat menggunakan BeMySample</p>
					</div>
					<div>
						<label className="inline-flex items-center">
							<input
								type="checkbox"
								className="toggle-checkbox hidden"
								checked={generalInfo}
								onChange={() => setGeneralInfo(!generalInfo)}
							/>
							<span
								className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
									generalInfo ? 'bg-blue-500' : 'bg-[#B2B2B2]'
								}`}
							>
								<span
									className={`h-4 w-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
										generalInfo ? 'translate-x-4' : 'translate-x-0'
									}`}
								></span>
							</span>
						</label>
					</div>
				</div>

				<div className="flex justify-between items-center">
					<div>
						<p className="text-gray-800 font-medium">Newsletter dan promosi</p>
						<p className="text-sm text-gray-600">
							Jadilah yang pertama mendapatkan penawaran terbaik
						</p>
					</div>
					<div>
						<label className="inline-flex items-center">
							<input
								type="checkbox"
								className="toggle-checkbox hidden"
								checked={newsletter}
								onChange={() => setNewsletter(!newsletter)}
							/>
							<span
								className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
									newsletter ? 'bg-blue-500' : 'bg-[#B2B2B2]'
								}`}
							>
								<span
									className={`h-4 w-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
										newsletter ? 'translate-x-4' : 'translate-x-0'
									}`}
								></span>
							</span>
						</label>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Communication
