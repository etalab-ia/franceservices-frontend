import {
  InitialQuestion,
  type WebService,
  type Question,
  type RootState,
  type UserHistory,
} from '@types'
import { CurrQuestionContext } from '@utils/context/questionContext'
import { rmContextFromQuestion } from '@utils/setData'
import { GlobalColContainer } from 'components/Global/GlobalColContainer'
import { GlobalParagraph } from 'components/Global/GlobalParagraph'
import { GlobalRowContainer } from 'components/Global/GlobalRowContainer'
import { OneThirdScreenWidth } from 'components/Global/OneThirdScreenWidth'
import Separator from 'components/Global/Separator'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MeetingCurrentResponse } from './MeetingCurrentResponse'
import { UsefulLinks } from './UsefulLinks'
import { useGetArchive } from '@api'
import { MeetingQuestionInput } from './MeetingQuestionInput'

export function MeetingOutputs({ chatId }: { chatId?: number }) {
  const user = useSelector((state: RootState) => state.user)
  const [currQuestion, setCurrQuestion] = useState(InitialQuestion)
  const dispatch = useDispatch()
  const updateCurrQuestion = (newQuestion: Question) => {
    setCurrQuestion(newQuestion)
  }
  const [question, setQuestion] = useState('')

  const { data: archiveData, isLoading, error } = useGetArchive(chatId)

  useEffect(() => {
    if (chatId !== undefined && archiveData) {
      console.log('archiveData', archiveData)
      if (Array.isArray(archiveData)) {
        archiveData.forEach((historyItem) => {
          dispatch({ type: 'ADD_HISTORY', newItem: historyItem })
        })
      }
    } else {
      if (user.chatId === 0) return
    }
  }, [chatId, archiveData, dispatch])

  useEffect(() => {
    return () => {
      dispatch({ type: 'RESET_USER' })
    }
  }, [dispatch])

  return (
    <CurrQuestionContext.Provider value={{ currQuestion, updateCurrQuestion }}>
      <h2 className="fr-my-2w fr-mb-5w">Poser une question à Albert</h2>
      {user.history.length > 0 && <History history={user.history} />}
      <MeetingCurrentResponse setQuestion={setQuestion} />
      <div className="fr-grid-row fr-mt-5w">
        <div className="fr-col-8">
          <MeetingQuestionInput questionInput={question} setQuestionInput={setQuestion} />
        </div>
      </div>
    </CurrQuestionContext.Provider>
  )
}

export function History({ history }: { history: UserHistory[] }) {
  const [openedAccordion, setOpenedAccordion] = useState(-1)
  return (
    <div className="fr-mt-5w">
      {history.map((h, index) => (
        <div className="fr-mb-1w" key={h.query + index}>
          <h3 className="fr-background-alt--blue-france">
            <button
              type="button"
              className="fr-accordion__btn fr-text-default--grey"
              aria-expanded="false"
              aria-controls={`history-${index}`}
              onClick={() => setOpenedAccordion((prev) => (prev === -1 ? index : -1))}
            >
              <p
                className={`${
                  openedAccordion === index
                    ? ''
                    : 'block overflow-hidden text-ellipsis whitespace-nowrap'
                }fr-text--lg`}
              >
                {h.query}
              </p>
            </button>
          </h3>
          <div className="fr-collapse" id={`history-${index}`}>
            <div className="fr-mb-2w">
              <DisplayResponse response={h.response} webservices={h.webservices} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function DisplayResponse({
  response,
  webservices,
}: { response: string; webservices: WebService[] }) {
  return (
    <GlobalRowContainer extraClass="fr-mt-5w">
      <GlobalColContainer>
        <div key={response}>
          <h3>Réponse proposée par Albert</h3>
          <GlobalParagraph>{response}</GlobalParagraph>
        </div>
      </GlobalColContainer>
      {webservices.length !== 0 && (
        <OneThirdScreenWidth>
          <GlobalColContainer>
            <UsefulLinks webservices={webservices} />
          </GlobalColContainer>
        </OneThirdScreenWidth>
      )}
      <Separator extraClass="fr-mt-5w" />
    </GlobalRowContainer>
  )
}
