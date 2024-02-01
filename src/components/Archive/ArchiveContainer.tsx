import { Table } from '@codegouvfr/react-dsfr/Table'
import React, { useState } from 'react'
import { Chat } from '../../../types'
import { archiveHeaders, setArchiveBody } from '../../utils/archive'
import { GlobalRowContainer } from '../Global/GlobalRowContainer'
import { GlobalTitle } from '../Global/GlobalTitle'

interface ArchiveContainerProps {
  chatsId: Chat[]
  setArchiveTab: React.Dispatch<React.SetStateAction<number | null>>
}

export function ArchiveContainer({ chatsId, setArchiveTab }: ArchiveContainerProps) {
  const [isDateAscending, setDateAscending] = useState(true)

  const sortChatsByDate = () => {
    chatsId.sort((a, b) => {
      const dateA = new Date(a.creationDate)
      const dateB = new Date(b.creationDate)
      return isDateAscending ? dateA - dateB : dateB - dateA
    })
    setDateAscending(!isDateAscending)
  }

  return (
    <div className="fr-container fr-pt-5w">
      <GlobalTitle>Consulter mes fiches rendez-vous</GlobalTitle>
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
          {chatsId.map((chat, index) => (
            <tr key={chat.id}>
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
