import { useGetArchive } from '@api'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
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
import { GlobalColContainer } from 'components/Global/GlobalColContainer'
import { GlobalParagraph } from 'components/Global/GlobalParagraph'
import { GlobalRowContainer } from 'components/Global/GlobalRowContainer'
import { OneThirdScreenWidth } from 'components/Global/OneThirdScreenWidth'
import Separator from 'components/Global/Separator'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MeetingCurrentResponse } from './MeetingCurrentResponse'
import { FirstQuestionExample } from './MeetingFirstQuestionSidePanel'
import { MeetingQuestionInput } from './MeetingQuestionInput'
import { UsefulLinks } from './UsefulLinks'
import { Skeleton } from '@mui/material'

export function MeetingOutputs({ chatId }: { chatId?: number }) {
  const user = useSelector((state: RootState) => state.user)
  const [currQuestion, setCurrQuestion] = useState(InitialQuestion)
  const dispatch = useDispatch()
  const [question, setQuestion] = useState('')
  const stream = useSelector((state: RootState) => state.stream)

  const { data: archiveData, isLoading } = useGetArchive(chatId)
  console.log('outputs')
  useEffect(() => {
    if (chatId !== undefined && archiveData) {
      if (Array.isArray(archiveData)) {
        for (let i = archiveData.length - 1; i >= 0; i--) {
          dispatch({ type: 'ADD_HISTORY', newItem: archiveData[i] })
        }
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
  }, [ref.current, stream])
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
          {user.history.length > 0 && (
            <History history={user.history} unfoldLast={chatId !== undefined} />
          )}
          <MeetingCurrentResponse setQuestion={setQuestion} />
          <div ref={ref} />
        </div>
        <div className="sticky mt-auto p-0 right-0 bottom-0 left-0 z-10 fr-grid-row">
          <div className="w-full fr-grid-row">
            <div className="mt-auto fr-col-8 w-full">
              <MeetingQuestionInput
                questionInput={question}
                setQuestionInput={setQuestion}
              />
            </div>
            {/*            {!user.chatId && (
              <div className="">
                {' '}
                <FirstQuestionExample setQuestionInput={setQuestion} />
              </div>
            )} */}
          </div>
        </div>
      </div>
    </CurrQuestionContext.Provider>
  )
}
export function History({
  history,
  unfoldLast,
}: { history: UserHistory[]; unfoldLast: boolean }) {
  return (
    <div className="fr-mt-5w">
      {history.map((h, index) => (
        <div className="fr-mb-1w fade-in-left" key={h.query + index}>
          <Accordion sx={{ boxShadow: 0, position: 'relative', zIndex: 1 }}>
            <AccordionSummary
              aria-controls="panel1-content"
              id="panel1-header"
              expandIcon={<ExpandMoreIcon />}
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
              {h.query}
            </AccordionSummary>
            <AccordionDetails
              sx={{
                backgroundColor: 'var(--background-default-grey)',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <DisplayResponse response={h.response} webservices={h.webservices} />
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
    </div>
  )
}

/*
export function History({
  history,
  unfoldLast,
}: { history: UserHistory[]; unfoldLast: boolean }) {
  const [openedAccordion, setOpenedAccordion] = useState(
    unfoldLast ? history.length - 1 : -1
  )
  console.log('history', history)
  return (
    <div className="fr-mt-5w">
      {history.map((h, index) => (
        <div className="fr-mb-1w " key={h.query + index}>
          <h3 className="fr-background-alt--blue-france">
            <button
              type="button"
              className="fr-accordion__btn fr-text-default--grey "
              aria-expanded={openedAccordion === index ? 'true' : 'false'}
              aria-controls={`history-${index}`}
              onClick={() => {
                setOpenedAccordion((prev) => (prev === index ? -1 : index))
              }}
            >
              <p
                className={`fr-text--lg ${
                  openedAccordion === index
                    ? 'block overflow-hidden break-words'
                    : 'block overflow-hidden text-ellipsis whitespace-nowrap'
                }`}
              >
                {h.query}
              </p>
            </button>
          </h3>
          <div
            className={`fr-collapse ${
              openedAccordion === index ? 'fr-collapse--expanded' : ''
            }`}
            id={`history-${index}`}
          >
            {openedAccordion === index && (
              <div className="fr-mb-2w">
                <DisplayResponse response={h.response} webservices={h.webservices} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
  */

export function DisplayResponse({
  response,
  webservices,
}: { response: string; webservices: WebService[] }) {
  return (
    <GlobalRowContainer extraClass="fr-mt-5w">
      <GlobalColContainer>
        <div key={response}>
          <h3>Réponse proposée par Albert</h3>
          <GlobalParagraph extraClass="fr-text-default--grey">{response}</GlobalParagraph>
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
function extractContent(inputString) {
  const dataBlocks = inputString.split('\n\n')

  let result = ''
  for (const block of dataBlocks) {
    if (block.startsWith('data: ')) {
      try {
        const jsonData = JSON.parse(block.substring(6))

        if (jsonData.choices?.[0]?.delta?.content) {
          result += jsonData.choices[0].delta.content
        }
      } catch (error) {}
    }
  }
  return result
}
