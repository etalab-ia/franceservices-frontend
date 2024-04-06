import type { Message, RootState } from '@types'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { ChatFollowUp } from './ChatFollowUp'
import { DisplayArrayMessages } from './DisplayArrayMessages'
import { DisplaySingleMessage } from './DisplaySingleMessage'

export function Display({
  messages,
  archive,
}: { messages: Message[]; archive: boolean }) {
  const endOfMessagesRef = useRef(null) // We use this ref to scroll to the end of the messages
  const stream = useSelector((state: RootState) => state.stream)

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, stream])
  return (
    <div>
      <div className="w-full md:w-[992px]" id="chat" ref={endOfMessagesRef}>
        {messages.map((message, index) => {
          return Array.isArray(message.text) ? (
            <DisplayArrayMessages key={index} message={message} />
          ) : (
            <DisplaySingleMessage
              key={index}
              sender={message.sender}
              text={message.text}
              isFirst={index === 0}
            />
          )
        })}
        {!archive && <ChatFollowUp />}
      </div>
      <div ref={endOfMessagesRef}></div>
    </div>
  )
}
