import type { Chat } from '@types'
import { archiveHeaders, setArchiveBody } from '@utils/archive'
import type React from 'react'
import { useState } from 'react'
import { GlobalTitle } from '../Global/GlobalTitle'

interface ArchiveListProps {
  chatList: Chat[]
  setArchiveTab: React.Dispatch<React.SetStateAction<number | null>>
}

export function ArchiveList({ chatList, setArchiveTab }: ArchiveListProps) {
  const [isDateAscending, setDateAscending] = useState(true)

  const sortChatsByDate = () => {
    chatList.sort((a, b) => {
      const dateA = new Date(a.creationDate)
      const dateB = new Date(b.creationDate)
      return isDateAscending
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime()
    })
    setDateAscending(!isDateAscending)
  }

  return (
    <div className="fr-container fr-pt-5w">
      <GlobalTitle>Consulter mon historique</GlobalTitle>
      <table className="w-full">
        <thead style={{ borderBottom: '2px solid #000' }}>
          <tr>
            {archiveHeaders.map((header, index) => (
              <th
                key={index}
                style={{ textAlign: 'left', padding: '10px' }}
                onClick={header === 'Date de création' ? sortChatsByDate : undefined}
                {...(header === 'Date de création'
                  ? { className: 'cursor-pointer' }
                  : {})}
              >
                {header}
                {header === 'Date de création' && (
                  <span
                    className={`fr-icon-arrow-${isDateAscending ? 'down' : 'up'}-s-fill`}
                    aria-hidden="true"
                  ></span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chatList.map((chat, index) => (
            <tr key={index}>
              {setArchiveBody({
                item: chat,
                index: index,
                name: chat.name || `Chat ${index + 1}`,
                setArchiveTab: setArchiveTab,
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
