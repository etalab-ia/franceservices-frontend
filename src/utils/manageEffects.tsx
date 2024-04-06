import { useEffect } from 'react'

const scrollToBottom = () => {
  const chatDiv = document.getElementById('chat')

  if (!chatDiv) return

  chatDiv.scrollTop = chatDiv.scrollHeight
}

export const handleTextareaResize = (e) => {
  e.target.style.height = 'auto'
  e.target.style.height = e.target.scrollHeight + 'px'
}

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
