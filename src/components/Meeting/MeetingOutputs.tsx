import {
  InitialQuestion,
  type Question,
  type RootState,
  type UserHistory,
  type WebService,
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

/*****************************************************************************************************
    Displays Albert's response(s) 

    GENERAL: display:
      - main informations: user prompt, stream response, response explanation / chunks
      - additional informations (sources): sheets, related questions, webservices

  *****************************************************************************************************/

export function MeetingOutputs() {
  const user = useSelector((state: RootState) => state.user)
  const [currQuestion, setCurrQuestion] = useState(InitialQuestion)
  const dispatch = useDispatch()
  const [query, setQuery] = useState<string>(currQuestion.query)
  const updateCurrQuestion = (newQuestion: Question) => {
    setCurrQuestion(newQuestion)
  }

  useEffect(() => {
    if (user.chatId === 0) return
    if (query !== '') rmContextFromQuestion(query, setQuery)
  }, [query])

  useEffect(() => {
    return () => {
      dispatch({ type: 'RESET_USER' })
    }
  }, [])
  return (
    <CurrQuestionContext.Provider value={{ currQuestion, updateCurrQuestion }}>
      <h2 className="fr-my-2w fr-mb-5w">Poser une question à Albert</h2>
      {user.history.length > 0 && <History history={user.history} />}
      <MeetingCurrentResponse />
    </CurrQuestionContext.Provider>
  )
}

/**
 * Display a list of accordion, each one contains a previous user query and the bot's response with sources and useful links
 */
export function History({ history }: { history: UserHistory[] }) {
  const [openedAccordion, setOpenedAccordion] = useState(-1)
  return (
    <div className="fr-mt-5w">
      {history.map((h, index) => (
        <div className="fr-mb-1w" key={h.query}>
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

/**
 * Display the response of the bot with the sources and useful links
 */
export function DisplayResponse({
  response,
  webservices,
}: { response: string; webservices: WebService[] }) {
  return (
    <GlobalRowContainer extraClass="fr-mt-5w">
      <GlobalColContainer>
        <div key={response}>
          <h3>Réponse proposée par </h3>
          <GlobalParagraph>{response}</GlobalParagraph>
        </div>
      </GlobalColContainer>
      {webservices?.length && (
        <OneThirdScreenWidth extraClass="">
          <GlobalColContainer>
            <UsefulLinks webservices={webservices} />
          </GlobalColContainer>
        </OneThirdScreenWidth>
      )}
      <Separator extraClass="fr-mt-5w" />
    </GlobalRowContainer>
  )
}
