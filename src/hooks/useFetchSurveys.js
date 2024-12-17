import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

const useFetchSurveys = (user) => {
	const [surveys, setSurveys] = useState([])
	const [isLoadingSurveys, setIsLoadingSurveys] = useState(true)

	const fetchSurveys = async () => {
		if (!user) return

		try {
			const token = Cookies.get('auth_token')
			const response = await fetch('http://localhost:8000/api/surveys', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})

			const result = await response.json()
			if (!response.ok || !result.success) {
				throw new Error(result.message || 'Gagal mengambil data survei.')
			}

			// Filter data survei sesuai user.id
			const filteredSurveys = result.data.filter(
				(survey) => survey.user_id === user.id
			)

			setSurveys(filteredSurveys)
			console.log('Surveys fetched:', filteredSurveys)
		} catch (error) {
			console.error('Terjadi kesalahan:', error)
			alert('Terjadi kesalahan saat mengambil data survei.')
		} finally {
			setIsLoadingSurveys(false)
		}
	}

	useEffect(() => {
		fetchSurveys()
	}, [user])

	return { surveys, isLoadingSurveys, refetch: fetchSurveys } // Tambahkan refetch
}

export default useFetchSurveys
