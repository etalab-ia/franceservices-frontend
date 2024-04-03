import type { Message, RootState } from '@types'
import { useSelector } from 'react-redux'
import { ChatFollowUp } from './ChatFollowUp'
import { DisplayArrayMessages } from './DisplayArrayMessages'
import { DisplaySingleMessage } from './DisplaySingleMessage'
import { GlobalChatContainer } from './GlobalChatContainer'
import { useEffect, useRef } from 'react'

/*
 *
 */
export function Display({
  messages,
  archive,
}: { messages: Message[]; archive: boolean }) {
  const endOfMessagesRef = useRef(null)
  const user = useSelector((state: RootState) => state.user)
  const stream = useSelector((state: RootState) => state.stream)
  useEffect(() => {
    console.log('scroll')
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, stream])
  console.log('messages', messages)
  return (
    <div>
      <div className=" w-full md:w-[992px]" id="chat" ref={endOfMessagesRef}>
        {messages.map((message, index) => {
          return Array.isArray(message.text) ? (
            <DisplayArrayMessages key={index} message={message} />
          ) : (
            <DisplaySingleMessage
              key={index}
              index={index}
              sender={message.sender}
              text={message.text}
              isFirst={index === 0}
              chunks={user.chunks}
            />
          )
        })}
        {!archive && <ChatFollowUp />}
      </div>
      <div ref={endOfMessagesRef}></div>
    </div>
  )
}
