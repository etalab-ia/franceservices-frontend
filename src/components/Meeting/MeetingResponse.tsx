import { ArchiveType } from 'types'
import { GlobalRowContainer } from '../Global/GlobalRowContainer'
import { MeetingAdditionalResponse } from './MeetingAdditionalResponse'
import { MeetingMainResponse } from './MeetingMainResponse'
import { MeetingQR } from './MeetingQR'
import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react'
import { GlobalParagraph } from '../Global/GlobalParagraph'

/*
 *	Contains text response from the bot and additional informations like sheets and chunks, useful links
 */
export function MeetingResponse({ archive }: { archive: ArchiveType | undefined }) {
  const [history, setHistory] = useState(['Hello'])
  const updateHistory = (newHistory) => {
    setHistory(newHistory)
  }

  return (
    <HistoryContext.Provider value={{ history, setHistory }}>
      <GlobalRowContainer extraClass="fr-grid-row--center">
        <MeetingMainResponse archive={archive} />
        <MeetingAdditionalResponse archive={archive} />
      </GlobalRowContainer>
    </HistoryContext.Provider>
  )
}

function MeetingHistory() {
  const { history } = useContext(HistoryContext)
  return (
    <>
      {history.map((item, index) => (
        <GlobalParagraph key={index}>{item}</GlobalParagraph>
      ))}
    </>
  )
}

const HistoryContext = createContext<HistoryContextType>({
  history: [],
  setHistory: () => {}, // noop function as a placeholder
})
interface HistoryContextType {
  history: string[]
  setHistory: Dispatch<SetStateAction<string[]>>
}

type HistoryType = {}
