import { ArchiveType } from 'types'
import { GlobalRowContainer } from '../Global/GlobalRowContainer'
import { MeetingAdditionalResponse } from './MeetingAdditionalResponse'
import { MeetingMainResponse } from './MeetingMainResponse'
import { MeetingQR } from './MeetingQR'
import { createContext, useContext, useState } from 'react'

/*
 *	Contains text response from the bot and additional informations like sheets and chunks, useful links
 */
export function MeetingResponse({ archive }: { archive: ArchiveType | undefined }) {
  const [history, setHistory] = useState([])
  return (
    <HistoryContext.Provider value={{ history }}>
      <GlobalRowContainer extraClass="fr-grid-row--center">
        <MeetingMainResponse archive={archive} />
        <MeetingAdditionalResponse archive={archive} />
      </GlobalRowContainer>
    </HistoryContext.Provider>
  )
}

function MeetingHistory({ history }: { history: any[] }) {
  return <GlobalRowContainer extraClass="fr-grid-row--center"></GlobalRowContainer>
}

const HistoryContext = createContext({ history: [] })
type HistoryType = {}
