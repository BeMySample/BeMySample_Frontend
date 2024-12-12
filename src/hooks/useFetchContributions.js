import { useEffect, useState } from 'react'

const useFetchContributions = () => {
	const [contributions, setContributions] = useState([])
	const [isLoadingContributions, setIsLoadingContributions] = useState(true)

	useEffect(() => {
		const fetchContributions = async () => {
			try {
				const response = await fetch(
					'http://localhost:8000/api/kontribusi-explore'
				)
				const result = await response.json()

				if (!response.ok) {
					throw new Error(result.message || 'Gagal mengambil data kontribusi.')
				}

				// Transformasi data API ke format yang sesuai
				const formattedData = result.data.map((item) => ({
					id: item.id,
					title: item.judul,
					updated: new Date(item.updated_at).toLocaleString('id-ID', {
						dateStyle: 'long',
						timeStyle: 'short',
					}),
					coins: item.coin,
					image: item.thumbnail,
				}))

				setContributions(formattedData)
			} catch (error) {
				console.error('Terjadi kesalahan:', error)
				alert('Terjadi kesalahan saat mengambil data kontribusi.')
			} finally {
				setIsLoadingContributions(false)
			}
		}

		fetchContributions()
	}, [])

	return { contributions, isLoadingContributions }
}

export default useFetchContributions
