import React from 'react'
import { Icon } from '@iconify/react'

const DesignOptions = ({
	bgColor,
	setBgColor,
	buttonColor,
	setButtonColor,
	buttonTextColor,
	setButtonTextColor,
	textColor,
	setTextColor,
	backgroundImage,
	handleBackgroundChange,
	handleBackgroundRemove,
	bgOpacity,
	setBgOpacity,
}) => {
	return (
		<div>
			<div className="flex items-center space-x-2 mt-4 mb-2.5">
				<p className="font-bold">Desain</p>
				<div className="flex-grow border-t border-gray-400" />
			</div>

			{/* Background Options */}
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<label className="w-28 text-gray-800">Latar</label>
					<div className="relative flex-grow flex items-center">
						{backgroundImage ? (
							<>
								<input
									type="text"
									value="Latar terpilih"
									readOnly
									className="w-full p-2 pr-10 rounded border border-gray-300 bg-white text-gray-800"
								/>
								<input
									type="file"
									accept="image/*"
									onChange={handleBackgroundChange}
									className="hidden"
									id="background-replace"
								/>
								<label
									htmlFor="background-replace"
									className="absolute right-9 top-1/2 transform -translate-y-1/2 cursor-pointer"
									title="Ganti Latar"
								>
									<Icon icon="mdi:upload" className="text-blue-500 text-lg" />
								</label>
								<button
									onClick={handleBackgroundRemove}
									className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
									title="Hapus Latar"
								>
									<Icon
										icon="mdi:close-circle"
										className="text-red-500 text-xl"
									/>
								</button>
							</>
						) : (
							<>
								<input
									type="text"
									placeholder="Tidak ada"
									readOnly
									className="w-full p-2 pr-10 rounded border border-gray-300 bg-white text-gray-500"
								/>
								<input
									type="file"
									accept="image/*"
									onChange={handleBackgroundChange}
									className="hidden"
									id="background-upload"
								/>
								<label
									htmlFor="background-upload"
									className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
								>
									<Icon icon="mdi:upload" className="text-gray-500 text-lg" />
								</label>
							</>
						)}
					</div>
				</div>

				{backgroundImage && (
					<div className="flex items-center justify-between">
						<label className="w-28 text-gray-800">Transparansi Latar</label>
						<div className="relative flex-grow">
							<input
								type="range"
								min="0"
								max="100"
								step="1"
								value={bgOpacity * 100}
								onChange={(e) => setBgOpacity(e.target.value / 100)}
								className="w-full"
							/>
						</div>
						<div className="flex items-center justify-center px-2 pointer-events-none">
							<p className="text-gray-800 text-sm">
								{`${Math.round(bgOpacity * 100)}%`}
							</p>
						</div>
					</div>
				)}

				{/* Color Pickers */}
				<div className="flex items-center justify-between">
					<label className="w-28 text-gray-800">Warna Latar</label>
					<div className="relative flex-grow">
						<input
							type="text"
							value={bgColor}
							onChange={(e) => setBgColor(e.target.value)}
							className="w-full p-2 pr-10 rounded border border-gray-300 bg-white uppercase"
						/>
						<input
							type="color"
							value={bgColor}
							onChange={(e) => setBgColor(e.target.value)}
							className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 border-none rounded-full cursor-pointer"
						/>
					</div>
				</div>

				<div className="flex items-center justify-between">
					<label className="w-28 text-gray-800">Warna Teks</label>
					<div className="relative flex-grow">
						<input
							type="text"
							value={textColor}
							onChange={(e) => setTextColor(e.target.value)}
							className="w-full p-2 pr-10 rounded border border-gray-300 bg-white uppercase"
						/>
						<input
							type="color"
							value={textColor}
							onChange={(e) => setTextColor(e.target.value)}
							className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 border-none rounded-full cursor-pointer"
						/>
					</div>
				</div>

				<div className="flex items-center justify-between">
					<label className="w-28 text-gray-800">Warna Tombol</label>
					<div className="relative flex-grow">
						<input
							type="text"
							value={buttonColor}
							onChange={(e) => setButtonColor(e.target.value)}
							className="w-full p-2 pr-10 rounded border border-gray-300 bg-white uppercase"
						/>
						<input
							type="color"
							value={buttonColor}
							onChange={(e) => setButtonColor(e.target.value)}
							className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 border-none rounded-full cursor-pointer"
						/>
					</div>
				</div>

				<div className="flex items-center justify-between">
					<label className="w-28 text-gray-800">Warna Teks Tombol</label>
					<div className="relative flex-grow">
						<input
							type="text"
							value={buttonTextColor}
							onChange={(e) => setButtonTextColor(e.target.value)}
							className="w-full p-2 pr-10 rounded border border-gray-300 bg-white uppercase"
						/>
						<input
							type="color"
							value={buttonTextColor}
							onChange={(e) => setButtonTextColor(e.target.value)}
							className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 border-none rounded-full cursor-pointer"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DesignOptions
