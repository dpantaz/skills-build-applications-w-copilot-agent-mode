import { useEffect, useState } from 'react'

import { fetchCollection } from '../api'

function useCollection(collection) {
  const [items, setItems] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadCollection() {
      try {
        setLoading(true)
        setError('')

        const result = await fetchCollection(collection)

        if (active) {
          setItems(result.items)
          setPagination(result.pagination)
        }
      } catch (requestError) {
        if (active) {
          setError(requestError.message)
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadCollection()

    return () => {
      active = false
    }
  }, [collection])

  return { items, pagination, loading, error }
}

export default useCollection