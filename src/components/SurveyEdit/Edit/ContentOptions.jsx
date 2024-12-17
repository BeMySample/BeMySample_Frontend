import React from 'react'
import Select from 'react-select'
import { Icon } from '@iconify/react'
import toast, { Toaster } from 'react-hot-toast'

const ContentOptions = ({
	contentText,
	setContentText,
	setSelectedIcon,
	buttonText,
	setButtonText,
	toggleResponseCopy,
	setToggleResponseCopy,
	mustBeFilled,
	setMustBeFilled,
	otherOption,
	setOtherOption,

	minChoices,
	setMinChoices,
	maxChoices,
	setMaxChoices,
	dateFormat,
	setDateFormat,
	timeFormat,
	setTimeFormat,
	optionsCount,

	smallLabel,
	setSmallLabel,
	midLabel,
	setMidLabel,
	largeLabel,
	setLargeLabel,
}) => {
	const options = [
		{
			value: 'Selamat Datang',
			label: 'Pembuka',
			icon: 'hugeicons:start-up-02',
			color: '#24B1DB',
		},
		{
			value: 'Teks Pendek',
			label: 'Teks Pendek',
			icon: 'majesticons:text-line',
			color: '#7F1FDB',
		},
		{
			value: 'Teks Panjang',
			label: 'Teks Panjang',
			icon: 'tabler:text-plus',
			color: '#7F1FDB',
		},
		{
			value: 'Pilihan Ganda',
			label: 'Pilihan Ganda',
			icon: 'carbon:circle-filled',
			color: '#7F1FDB',
		},
		{
			value: 'Waktu',
			label: 'Waktu',
			icon: 'mdi-light:calendar',
			color: '#7F1FDB',
		},
		{
			value: 'Dropdown',
			label: 'Dropdown',
			icon: 'icon-park-solid:down-one',
			color: '#7F1FDB',
		},
		{
			value: 'Quote',
			label: 'Quote',
			icon: 'proicons:quote',
			color: '#7F1FDB',
		},
		{
			value: 'Likert',
			label: 'Likert',
			icon: 'hugeicons:star',
			color: '#7F1FDB',
		},
		{
			value: 'Closing',
			label: 'Penutup',
			icon: 'icon-park-outline:bye',
			color: '#24B1DB',
		},
	]

	const handleContentChange = (selectedOption) => {
		setContentText(selectedOption.value)
		setSelectedIcon(selectedOption.icon)
	}

	const handleMinChoicesChange = (e) => {
		const min = parseInt(e.target.value, 10)
		if (min <= maxChoices) {
			setMinChoices(min)
		} else {
			toast.error('Min. Pilih tidak boleh lebih besar dari Maks. Pilih.')
		}
	}

	const handleMaxChoicesChange = (e) => {
		const max = parseInt(e.target.value, 10)
		if (max >= minChoices) {
			setMaxChoices(max)
		} else {
			toast.error('Maks. Pilih tidak boleh lebih kecil dari Min. Pilih.')
		}
	}

	const handleDateFormatChange = (e) => {
		setDateFormat(e.target.value)
		console.log(e.target.value)
	}

	const handleTimeFormatChange = (e) => {
		setTimeFormat(e.target.value)
		console.log(e.target.value)
	}

	const handleSmallLabelChange = (e) => {
		setSmallLabel(e.target.value)
	}

	const handleMidLabelChange = (e) => {
		setMidLabel(e.target.value)
	}

	const handleLargeLabelChange = (e) => {
		setLargeLabel(e.target.value)
	}

	return (
		<div>
			<div className="flex items-center space-x-2 mb-2.5">
				<p className="font-bold">Konten</p>
				<div className="flex-grow border-t border-gray-400" />
			</div>
			<div className="space-y-4">
				<div className="flex items-center">
					<label className="w-28 text-gray-800">Isi</label>
					<div className="flex-grow">
						<Select
							value={options.find((option) => option.value === contentText)}
							onChange={handleContentChange}
							options={options}
							getOptionLabel={(e) => (
								<div className="flex items-center space-x-2">
									<Icon
										icon={e.icon}
										className="text-lg"
										style={{ color: e.color }}
									/>
									<span>{e.label}</span>
								</div>
							)}
							placeholder="Pilih Template"
							className="w-full"
						/>
					</div>
				</div>

				{contentText === 'Selamat datang' || contentText === 'Survey Baru' ? (
					<div className="flex items-center">
						<label className="w-28 text-gray-800">Tombol</label>
						<input
							type="text"
							value={buttonText}
							onChange={(e) => setButtonText(e.target.value)}
							className="flex-grow p-2 rounded border border-gray-300 bg-white"
						/>
					</div>
				) : null}

				{contentText === 'Teks Pendek' && (
					<>
						<div className="flex items-center justify-between">
							<label className="w-28 text-gray-800">Harus Diisi?</label>
							<div>
								<label className="inline-flex items-center">
									<input
										type="checkbox"
										className="toggle-checkbox hidden"
										checked={toggleResponseCopy}
										onChange={() => setToggleResponseCopy(!toggleResponseCopy)}
									/>
									<span
										className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
											toggleResponseCopy ? 'bg-blue-500' : 'bg-[#B2B2B2]'
										}`}
									>
										<span
											className={`h-4 w-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
												toggleResponseCopy ? 'translate-x-4' : 'translate-x-0'
											}`}
										></span>
									</span>
								</label>
							</div>
						</div>
						<div className="flex items-center">
							<label className="w-28 text-gray-800">Tombol</label>
							<input
								type="text"
								value={buttonText}
								onChange={(e) => setButtonText(e.target.value)}
								className="flex-grow p-2 rounded border border-gray-300 bg-white"
							/>
						</div>
					</>
				)}

				{contentText === 'Teks Panjang' && (
					<>
						<div className="flex items-center justify-between">
							<label className="w-28 text-gray-800">Harus Diisi?</label>
							<div>
								<label className="inline-flex items-center">
									<input
										type="checkbox"
										className="toggle-checkbox hidden"
										checked={toggleResponseCopy}
										onChange={() => setToggleResponseCopy(!toggleResponseCopy)}
									/>
									<span
										className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
											toggleResponseCopy ? 'bg-blue-500' : 'bg-[#B2B2B2]'
										}`}
									>
										<span
											className={`h-4 w-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
												toggleResponseCopy ? 'translate-x-4' : 'translate-x-0'
											}`}
										></span>
									</span>
								</label>
							</div>
						</div>
						<div className="flex items-center">
							<label className="w-28 text-gray-800">Tombol</label>
							<input
								type="text"
								value={buttonText}
								onChange={(e) => setButtonText(e.target.value)}
								className="flex-grow p-2 rounded border border-gray-300 bg-white"
							/>
						</div>
					</>
				)}

				{contentText === 'Waktu' && (
					<>
						<div className="flex items-center justify-between">
							<label className="w-28 text-gray-800">Harus Diisi?</label>
							<div>
								<label className="inline-flex items-center">
									<input
										type="checkbox"
										className="toggle-checkbox hidden"
										checked={toggleResponseCopy}
										onChange={() => setToggleResponseCopy(!toggleResponseCopy)}
									/>
									<span
										className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
											toggleResponseCopy ? 'bg-blue-500' : 'bg-[#B2B2B2]'
										}`}
									>
										<span
											className={`h-4 w-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
												toggleResponseCopy ? 'translate-x-4' : 'translate-x-0'
											}`}
										></span>
									</span>
								</label>
							</div>
						</div>
						<div className="flex items-center">
							<label className="w-28 text-gray-800">Format Tanggal</label>
							<select
								id="date-format"
								name="date-format"
								value={dateFormat}
								onChange={handleDateFormatChange}
								className="flex-grow p-2 rounded border border-gray-300 bg-white"
							>
								<option value="dd/mm/yyyy">HH/BB/TTTT</option>
								<option value="mm/dd/yyyy">BB/HH/TTTT</option>
								<option value="yyyy/mm/dd">TTTT/BB/HH</option>
							</select>
						</div>
						<div className="flex items-center">
							<label className="w-28 text-gray-800">Format Waktu</label>
							<select
								id="time-format"
								name="time-format"
								value={timeFormat}
								onChange={handleTimeFormatChange}
								className="flex-grow p-2 rounded border border-gray-300 bg-white"
							>
								<option value="12">12 Jam</option>
								<option value="24">24 Jam</option>
							</select>
						</div>
						<div className="flex items-center">
							<label className="w-28 text-gray-800">Tombol</label>
							<input
								type="text"
								value={buttonText}
								onChange={(e) => setButtonText(e.target.value)}
								className="flex-grow p-2 rounded border border-gray-300 bg-white"
							/>
						</div>
					</>
				)}

				{contentText === 'Pilihan Ganda' && (
					<>
						<div className="flex items-center">
							<label className="w-28 text-gray-800">Min. Pilih</label>
							<select
								id="min-select"
								name="min-select"
								value={minChoices}
								onChange={handleMinChoicesChange}
								className="flex-grow p-2 rounded border border-gray-300 bg-white"
							>
								{Array.from({ length: optionsCount }, (_, i) => (
									<option key={i + 1} value={i + 1}>
										{i + 1}
									</option>
								))}
							</select>
						</div>
						<div className="flex items-center">
							<label className="w-28 text-gray-800">Maks. Pilih</label>
							<select
								id="max-select"
								name="max-select"
								value={maxChoices}
								onChange={handleMaxChoicesChange}
								className="flex-grow p-2 rounded border border-gray-300 bg-white"
							>
								{Array.from({ length: optionsCount }, (_, i) => (
									<option key={i + 1} value={i + 1}>
										{i + 1}
									</option>
								))}
							</select>
						</div>
						<div className="flex items-center justify-between">
							<label className="w-28 text-gray-800">Harus Diisi?</label>
							<div>
								<label className="inline-flex items-center">
									<input
										type="checkbox"
										className="toggle-checkbox hidden"
										checked={mustBeFilled}
										onChange={() => setMustBeFilled(!mustBeFilled)}
									/>
									<span
										className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
											mustBeFilled ? 'bg-blue-500' : 'bg-[#B2B2B2]'
										}`}
									>
										<span
											className={`h-4 w-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
												mustBeFilled ? 'translate-x-4' : 'translate-x-0'
											}`}
										></span>
									</span>
								</label>
							</div>
						</div>
						<div className="flex items-center justify-between">
							<label className="w-28 text-gray-800">Opsi "Lainnya"</label>
							<div>
								<label className="inline-flex items-center">
									<input
										type="checkbox"
										className="toggle-checkbox hidden"
										checked={otherOption}
										onChange={() => setOtherOption(!otherOption)}
									/>
									<span
										className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
											otherOption ? 'bg-blue-500' : 'bg-[#B2B2B2]'
										}`}
									>
										<span
											className={`h-4 w-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
												otherOption ? 'translate-x-4' : 'translate-x-0'
											}`}
										></span>
									</span>
								</label>
							</div>
						</div>
						<div className="flex items-center">
							<label className="w-28 text-gray-800">Tombol</label>
							<input
								type="text"
								value={buttonText}
								onChange={(e) => setButtonText(e.target.value)}
								className="flex-grow p-2 rounded border border-gray-300 bg-white"
							/>
						</div>
					</>
				)}

				{contentText === 'Likert' && (
					<>
						<div className="flex items-center">
							<label className="w-28 text-gray-800">Maks. Skala</label>
							<select
								id="max-scale"
								name="max-scale"
								// value={maxScale}
								// onChange={handleMaxScaleChange}
								className="flex-grow p-2 rounded border border-gray-300 bg-white"
							>
								{/* {Array.from({ length: 5 }, (_, i) => (
									<option key={i + 1} value={i + 1}>
										{i + 1}
									</option>
								))} */}
								<option value="5">5</option>
							</select>
						</div>
						<div className="flex items-center">
							<label className="w-28 text-gray-800">Ket. Terkecil</label>
							<input
								type="text"
								value={smallLabel || 'Tidak nyaman'}
								onChange={handleSmallLabelChange}
								className="flex-grow p-2 rounded border border-gray-300 bg-white"
							/>
						</div>
						<div className="flex items-center">
							<label className="w-28 text-gray-800">Ket. Tengah</label>
							<input
								type="text"
								value={midLabel || 'Netral'}
								onChange={handleMidLabelChange}
								className="flex-grow p-2 rounded border border-gray-300 bg-white"
							/>
						</div>
						<div className="flex items-center">
							<label className="w-28 text-gray-800">Ket. Terbesar</label>
							<input
								type="text"
								value={largeLabel || 'Sangat nyaman'}
								onChange={handleLargeLabelChange}
								className="flex-grow p-2 rounded border border-gray-300 bg-white"
							/>
						</div>
						<div className="flex items-center justify-between">
							<label className="w-28 text-gray-800">Harus Diisi?</label>
							<div>
								<label className="inline-flex items-center">
									<input
										type="checkbox"
										className="toggle-checkbox hidden"
										checked={mustBeFilled}
										onChange={() => setMustBeFilled(!mustBeFilled)}
									/>
									<span
										className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
											mustBeFilled ? 'bg-blue-500' : 'bg-[#B2B2B2]'
										}`}
									>
										<span
											className={`h-4 w-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
												mustBeFilled ? 'translate-x-4' : 'translate-x-0'
											}`}
										></span>
									</span>
								</label>
							</div>
						</div>
						<div className="flex items-center">
							<label className="w-28 text-gray-800">Tombol</label>
							<input
								type="text"
								value={buttonText}
								onChange={(e) => setButtonText(e.target.value)}
								className="flex-grow p-2 rounded border border-gray-300 bg-white"
							/>
						</div>
					</>
				)}

				{contentText === 'Closing' && (
					<div className="flex items-center justify-between">
						<label className="w-28 text-gray-800">Salinan Respons</label>
						<div>
							<label className="inline-flex items-center">
								<input
									type="checkbox"
									className="toggle-checkbox hidden"
									checked={toggleResponseCopy}
									onChange={() => setToggleResponseCopy(!toggleResponseCopy)}
								/>
								<span
									className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
										toggleResponseCopy ? 'bg-blue-500' : 'bg-[#B2B2B2]'
									}`}
								>
									<span
										className={`h-4 w-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
											toggleResponseCopy ? 'translate-x-4' : 'translate-x-0'
										}`}
									></span>
								</span>
							</label>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default ContentOptions
