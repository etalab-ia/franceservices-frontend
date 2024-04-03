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
  const classNames = isFirst ? 'fr-mt-5w user-message w-full ' : 'user-message w-full'

  return (
    <div className={`${classNames} `}>
      <div className="fr-col-1 hide-on-smallscreen" />
      <div className={' w-full fr-col fr-col-md-10'}>
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
      <div className="fr-col-1 fr-pl-2w hide-on-smallscreen">
        {isUser && <Avatar user={sender} />}
      </div>
    </div>
  )
}
