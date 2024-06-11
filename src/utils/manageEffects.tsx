import { useEffect } from 'react'

export const useKeyPress = (callback) => {
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e) {
        callback(e)
      }
    }
    document.addEventListener('keypress', handleKeyPress)

    return () => {
      document.removeEventListener('keypress', handleKeyPress)
    }
  }, [callback])
}
