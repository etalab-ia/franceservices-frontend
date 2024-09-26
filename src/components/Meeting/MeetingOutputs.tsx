import { useGetArchive } from '@api'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Skeleton } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import {
  InitialQuestion,
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
import { memo, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MeetingCurrentResponse } from './MeetingCurrentResponse'
import { MeetingQuestionInput } from './MeetingQuestionInput'
import { UsefulLinks } from './UsefulLinks'

export const MeetingOutputs = memo(function MeetingOutputs({
  chatId,
}: { chatId?: number }) {
  const user = useSelector((state: RootState) => state.user)
  const [currQuestion, setCurrQuestion] = useState(InitialQuestion)
  const dispatch = useDispatch()
  const [question, setQuestion] = useState('')
  const stream = useSelector((state: RootState) => state.stream)

  const { data: archiveData, isLoading, error } = useGetArchive(chatId)
  const [context, setContext] = useState({
    administrations: [],
    themes: [],
  })
  useEffect(() => {
    if (chatId !== undefined && archiveData) {
      if (Array.isArray(archiveData)) {
        dispatch({ type: 'ADD_HISTORY_BATCH', items: archiveData })
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
      ref.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [stream])

  return (
    <CurrQuestionContext.Provider
      value={{ currQuestion, updateCurrQuestion: setCurrQuestion }}
    >
      <div className="h-[70vh]">
        <div className="min-h-[70vh]">
          {isLoading && (
            <>
              <Skeleton height={'50px'} variant="rectangular" className="fr-mb-1w" />
              <Skeleton height={'50px'} variant="rectangular" className="fr-mb-1w" />
              <Skeleton height={'50px'} variant="rectangular" className="fr-mb-1w" />
            </>
          )}
          {user.history.length > 0 && <History history={user.history} />}
          <MeetingCurrentResponse
            setQuestion={setQuestion}
            context={context}
            setContext={setContext}
          />
          <div ref={ref} />
        </div>
        <div className="sticky mt-auto p-0 right-0 bottom-0 left-0 z-10 fr-grid-row">
          <div className="w-full fr-grid-row">
            <div className="mt-auto fr-col-8 w-full">
              <MeetingQuestionInput
                isNewChat={chatId === undefined}
                questionInput={question}
                setQuestionInput={setQuestion}
                context={context}
                setContext={setContext}
              />
            </div>
          </div>
        </div>
      </div>
    </CurrQuestionContext.Provider>
  )
})
export const History = memo(
  function History({ history }: { history: UserHistory[] }) {
    return (
      <div className="fr-mt-5w">
        {history.map((h, index) => (
          <div className="fr-mb-1w fade-in-left" key={h.query + index}>
            <Accordion sx={{ boxShadow: 0, position: 'relative', zIndex: 1 }}>
              <AccordionSummary
                aria-controls="panel1-content"
                id="panel1-header"
                expandIcon={<ExpandMoreIcon sx={{ color: 'var(--text-default-grey)' }} />}
                sx={{
                  backgroundColor: 'var(--background-action-low-blue-france)',
                  color: 'var(--text-default-grey)',
                  overflow: 'hidden',
                  wordBreak: 'break-word',
                  ':focus': { border: 3 },
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {rmContextFromQuestion(h.query)}
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  backgroundColor: 'var(--background-default-grey)',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <DisplayResponse
                  response={h.response ? h.response : ''}
                  webservices={h.webservices?.length ? h.webservices : getWebservices(h)}
                />
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
      </div>
    )
  },
  (prevProps, nextProps) => {
    return JSON.stringify(prevProps.history) === JSON.stringify(nextProps.history)
  },
)
function getWebservices(history) {
  const webservices = []

  history.chunks.map((chunk) => {
    if (chunk.web_services) {
      chunk.web_services.map((webservice) => {
        if (webservices.length >= 3) return webservices
        webservices.push(webservice)
      })
    }
  })

  return webservices
}

export const DisplayResponse = memo(
  function DisplayResponse({
    response,
    webservices,
  }: { response: string; webservices: WebService[] }) {
    return (
      <GlobalRowContainer extraClass="fr-mt-5w">
        <GlobalColContainer>
          <div key={response}>
            <h3>Réponse proposée par Albert</h3>
            <GlobalParagraph extraClass="fr-text-default--grey">
              {response}
            </GlobalParagraph>
          </div>
        </GlobalColContainer>
        {webservices?.length > 0 && (
          <OneThirdScreenWidth>
            <GlobalColContainer>
              <UsefulLinks webservices={webservices} />
            </GlobalColContainer>
          </OneThirdScreenWidth>
        )}
        <Separator extraClass="fr-mt-5w" />
      </GlobalRowContainer>
    )
  },
  (prevProps, nextProps) => {
    return (
      prevProps.response === nextProps.response &&
      JSON.stringify(prevProps.webservices) === JSON.stringify(nextProps.webservices)
    )
  },
)
