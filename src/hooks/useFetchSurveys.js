import { useEffect, useState } from 'react';

const useFetchSurveys = (user) => {
    const [surveys, setSurveys] = useState([]);
    const [isLoadingSurveys, setIsLoadingSurveys] = useState(true);

    useEffect(() => {
        const fetchSurveys = async () => {
            if (!user) {
                return; // Tunggu data user tersedia
            }

            try {
                const response = await fetch('http://localhost:8000/api/survey');
                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || 'Gagal mengambil data survei.');
                }

                // Filter survei berdasarkan user_id
                const userId = user.id;
                const filteredSurveys = result.data.filter(
                    (survey) => survey.user_id === userId
                );

                // Simpan hasil yang sudah difilter ke state
                setSurveys(filteredSurveys);
            } catch (error) {
                console.error('Terjadi kesalahan:', error);
                alert('Terjadi kesalahan saat mengambil data survei.');
            } finally {
                setIsLoadingSurveys(false);
            }
        };

        fetchSurveys();
    }, [user]);

    return { surveys, isLoadingSurveys };
};

export default useFetchSurveys;
