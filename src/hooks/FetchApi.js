import { useState, useEffect } from 'react'

export const useFetchApi = () => {
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const searchImage = async () => {
            setLoading(true)

            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/photos`)
                const data = await response.json()

                setImages(data)
            } catch (error) {
                setError(error)
            }

            setLoading(false)
        }

        searchImage()
    }, [])

    return { images, loading, error }
}