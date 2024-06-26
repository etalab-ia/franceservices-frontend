import { useGetArchive } from '@api'
import {
  InitialQuestion,
  type RootState,
  type UserHistory,
  type WebService,
} from '@types'
import { CurrQuestionContext } from '@utils/context/questionContext'
import { GlobalColContainer } from 'components/Global/GlobalColContainer'
import { GlobalParagraph } from 'components/Global/GlobalParagraph'
import { GlobalRowContainer } from 'components/Global/GlobalRowContainer'
import { OneThirdScreenWidth } from 'components/Global/OneThirdScreenWidth'
import Separator from 'components/Global/Separator'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MeetingCurrentResponse } from './MeetingCurrentResponse'
import { MeetingQuestionInput } from './MeetingQuestionInput'
import { UsefulLinks } from './UsefulLinks'

export function MeetingOutputs({ chatId }: { chatId?: number }) {
  const user = useSelector((state: RootState) => state.user)
  const [currQuestion, setCurrQuestion] = useState(InitialQuestion)
  const dispatch = useDispatch()
  const [question, setQuestion] = useState('')
  const stream = useSelector((state: RootState) => state.stream)

  const { data: archiveData } = useGetArchive(chatId)

  useEffect(() => {
    if (chatId !== undefined && archiveData) {
      if (Array.isArray(archiveData)) {
        archiveData.reverse().forEach((item) => {
          dispatch({ type: 'ADD_HISTORY', newItem: item })
        })
      }
    }
  }, [chatId, archiveData, dispatch])

  useEffect(() => {
    return () => {
      dispatch({ type: 'RESET_USER' })
    }
  }, [dispatch])
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (ref.current) {
      console.log('REEEEEF', ref.current)
      ref.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [ref.current, stream])
  return (
    <CurrQuestionContext.Provider
      value={{ currQuestion, updateCurrQuestion: setCurrQuestion }}
    >
      {user.history.length > 0 && <History history={user.history} />}
      <MeetingCurrentResponse setQuestion={setQuestion} />
      <MeetingQuestionInput questionInput={question} setQuestionInput={setQuestion} />
      <div ref={ref} />
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
      {webservices?.length !== 0 && (
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
