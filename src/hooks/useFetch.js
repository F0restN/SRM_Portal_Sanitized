import { useEffect, useState } from "react";

const useFetch = (url, requestBody) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect( async () => {
        const fetchData = async () => {
            setLoading(true)
            try {
                let res = {};
                if (requestBody != null) {
                    res = await fetch(url, requestBody)
                } else {
                    res = await fetch(url)
                }

                if (res.status === 200){
                    const json = await res.json()
                    setData(json)
                    setLoading(false)
                } else {
                    setError(res)
                    setLoading(false)
                }
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        }

        await fetchData()
    }, [url])

    return {loading, error, data}
}

export default useFetch