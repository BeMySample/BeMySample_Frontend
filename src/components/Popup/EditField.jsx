import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

const EditFieldPopup = ({
	isOpen,
	profileData,
	onClose,
	fieldTitle,
	fieldType,
	fieldToEdit,
	fieldValue: initialFieldValue,
	onSave,
	options = [],
	userId,
}) => {
	const [fieldValue, setFieldValue] = useState(
		fieldType === 'multi-select' ? [] : initialFieldValue || ''
	)

	const capitalizeFirstLetter = (string) => {
		if (!string) return ''
		return string.charAt(0).toUpperCase() + string.slice(1)
	}

	useEffect(() => {
		if (isOpen) {
			if (fieldType === 'multi-select') {
				const values = (initialFieldValue || '')
					.split(', ')
					.map((value) => ({ value, label: value }))
				setFieldValue(values)
			} else {
				setFieldValue(initialFieldValue || '')
			}
		}
	}, [initialFieldValue, isOpen, fieldType])

	const handleInputChange = (e) => {
		setFieldValue(e.target.value)
	}

	const handleSelectChange = (selectedOptions) => {
		setFieldValue(selectedOptions || [])
	}

	const handleSave = async () => {
		try {
			let updatedValue
			if (fieldType === 'multi-select') {
				updatedValue = fieldValue.map((option) => option.value).join(', ')
			} else {
				updatedValue = fieldValue
			}

			const payload = {
				...profileData,
				[fieldToEdit]: updatedValue,
			}

			const url = `http://localhost:8000/api/users/edit/${userId}`

			await toast.promise(
				axios.post(url, payload, {
					headers: {
						'Content-Type': 'application/json',
					},
				}),
				{
					loading: 'Sedang menyimpan perubahan...',
					success: 'Perubahan berhasil disimpan!',
					error: 'Gagal menyimpan perubahan. Silakan coba lagi.',
				}
			)

			onSave(updatedValue)

			// Reload hanya jika fieldToEdit adalah 'nama_lengkap'
			if (fieldToEdit === 'nama_lengkap') {
				setTimeout(() => {
					window.location.reload()
				}, 1500)
			}
		} catch (error) {
			toast.error('Terjadi kesalahan saat memperbarui data.')
		} finally {
			onClose()
		}
	}

	const handleCancel = () => {
		if (fieldType === 'multi-select') {
			const values = (initialFieldValue || '')
				.split(', ')
				.map((value) => ({ value, label: value }))
			setFieldValue(values)
		} else {
			setFieldValue(initialFieldValue || '')
		}
		onClose()
	}

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<motion.div
						className="bg-white rounded-lg p-6 w-96 shadow-lg"
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.8, opacity: 0 }}
						transition={{ duration: 0.3 }}
					>
						{/* Header */}
						<h3 className="text-xl font-semibold text-gray-800 mb-4">
							{fieldTitle}
						</h3>

						{/* Description */}
						<p className="text-sm text-gray-600 mb-4">
							Perubahan hanya dapat dilakukan{' '}
							<b className="text-red-500">sebulan sekali</b>.
						</p>

						{/* Input Field */}
						{fieldType === 'multi-select' ? (
							<Select
								isMulti
								value={fieldValue}
								onChange={handleSelectChange}
								options={options.map((opt) => ({
									value: opt,
									label: opt,
								}))}
								className="mb-4"
								placeholder={`Pilih ${fieldTitle}`}
							/>
						) : fieldType === 'select' ? (
							<select
								value={fieldValue}
								onChange={handleInputChange}
								className="w-full p-2 border border-gray-300 rounded-md mb-4"
							>
								<option value="" disabled>
									Pilih {fieldTitle}
								</option>
								{options.map((option, index) => (
									<option key={index} value={option}>
										{capitalizeFirstLetter(option)}
									</option>
								))}
							</select>
						) : fieldType === 'date' ? (
							<input
								type="date"
								value={fieldValue}
								onChange={handleInputChange}
								className="w-full p-2 border border-gray-300 rounded-md mb-4"
							/>
						) : (
							<input
								type={fieldType}
								value={fieldValue}
								onChange={handleInputChange}
								placeholder={`Masukkan ${fieldTitle.toLowerCase()}`}
								className="w-full p-2 border border-gray-300 rounded-md mb-4"
							/>
						)}

						{/* Buttons */}
						<div className="flex justify-end gap-4">
							<button
								onClick={handleCancel}
								className="px-4 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition duration-200"
							>
								Batal
							</button>
							<button
								onClick={handleSave}
								className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200"
							>
								Simpan
							</button>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default EditFieldPopup
