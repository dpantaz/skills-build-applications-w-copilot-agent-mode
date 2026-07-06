import { useEffect, useState } from 'react'

import { fetchCollection } from '../api.js'

/**
 * Custom Hook: useCollection
 * 
 * Fetches and manages collection state from the API.
 * Handles loading, error, and pagination states.
 *
 * @param {string} collection - The collection name (e.g., 'users', 'activities')
 * @returns {Object} { items, pagination, loading, error }
 *
 * Features:
 * - Cancels in-flight requests if component unmounts (via cleanup)
 * - Normalizes paginated and array responses
 * - Provides loading and error states
 */
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