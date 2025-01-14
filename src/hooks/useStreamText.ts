import { useState, useRef, useEffect } from 'react'

interface StreamTextOptions {
  text: string
  isStreaming: boolean
  streamId?: number | null
  speed?: number
}

export function useStreamText({
  text,
  isStreaming,
  streamId = null,
  speed = 0,
}: StreamTextOptions) {
  const [displayedText, setDisplayedText] = useState('')
  const lastIndexRef = useRef(0)
  const [prevStreamId, setPrevStreamId] = useState<number | null>(null)

  // Reset on new stream
  useEffect(() => {
    if (streamId && streamId !== prevStreamId) {
      setDisplayedText('')
      lastIndexRef.current = 0
      setPrevStreamId(streamId)
    }
  }, [streamId, prevStreamId])

  // Append text while streaming
  useEffect(() => {
    if (!isStreaming) return

    const intervalId = setInterval(() => {
      if (lastIndexRef.current < text.length) {
        setDisplayedText((prev) => {
          const nextChar = text[lastIndexRef.current]
          lastIndexRef.current += 1
          return prev + nextChar
        })
      }
    }, speed)

    return () => clearInterval(intervalId)
  }, [isStreaming, text, speed])

  // Ensure full text is displayed when streaming ends
  useEffect(() => {
    if (!isStreaming && text) {
      setDisplayedText(text)
      lastIndexRef.current = text.length
    }
  }, [isStreaming, text])

  return displayedText
}
