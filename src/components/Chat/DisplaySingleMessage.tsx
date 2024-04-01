import type { Chunk, RootState } from '@types'
import { useEffect, useRef, useState } from 'react'
import { Avatar } from './Avatar'
import { useSelector } from 'react-redux'

//User's message
export const DisplaySingleMessage = ({
  sender,
  text,
  isFirst,
  chunks,
  index,
}: {
  sender: 'user' | 'agent'
  text: string[]
  isFirst: boolean
  chunks: Chunk[]
  index: number
}) => {
  const isUser = sender === 'user'
  const classNames = isFirst ? 'fr-mt-5w user-message w-full ' : 'user-message w-full  '
  const ref = useRef(null)
  const user = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if (user.messages.length > 0 && isUser && index === user.messages.length - 1) {
      console.log('ref')
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [user.messages])
  return (
    <div className={`${classNames} bg-blue-500`} ref={ref}>
      <div className="fr-col-1" />
      <div className={'fr2w w-full fr-col-10'}>
        <p
          className={
            isUser
              ? 'rounded fr-mb-4w fr-p-2w fr-background-action-low--blue-france'
              : 'agent-chat fr-mb-4w fr-p-2w'
          }
        >
          {text}
        </p>
      </div>
      <div className="fr-col-1">{isUser && <Avatar user={sender} />}</div>
    </div>
  )
}
