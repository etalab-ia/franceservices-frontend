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
import { TextWithSources } from 'components/Sources/TextWithSources'

const str = `La saisie sur le RSA est un sujet complexe et nécessite une compréhension précise des règles et des conditions. 
<ref text="Seul un commissaire de justice peut saisir un véhicule. Il peut le faire à la demande d'un créancier. Le créancier doit avoir un titre exécutoire." title="Saisie du véhicule">https://www.service-public.fr/particuliers/vosdroits/F1752</ref>. 
De plus, la saisie ne peut pas être effectuée directement par le créancier, mais uniquement par le commissaire de justice
<ref text="En aucun cas, le créancier ne peut s'adresser directement à l'employeur pour demander une saisie." title="Saisie sur salaire (ou "saisie des rémunérations")">https://www.service-public.fr/particuliers/vosdroits/F115</ref>. 
Cependant, il est important de noter que la nature et le montant de la somme saisie doivent être mentionnés sur la fiche de paie, sous peine de sanctions à l'encontre de l'employeur
<ref text="La nature et le montant de la somme saisie doivent être mentionnés sur la fiche de paie, sous peine de sanctions à l'encontre de l'employeur." title="Saisie sur salaire (ou "saisie des rémunérations")">https://www.service-public.fr/particuliers/vosdroits/F115</ref>. 
Enfin, il est important de noter que la saisie sur le RSA peut être effectuée uniquement dans certaines conditions et que les règles varient selon le type de RSA concerné. 
<ref text="Vous pouvez faire la demande auprès de votre Caf, des services du département, du CCAS de votre domicile (dans certains cas) ou d’une association habilitée par le département." title="RSA jeunes parents">https://www.service-public.fr/particuliers/vosdroits/F33692</ref>`

export function MeetingOutputs({ chatId }: { chatId?: number }) {
  const user = useSelector((state: RootState) => state.user)
  const [currQuestion, setCurrQuestion] = useState(InitialQuestion)
  const dispatch = useDispatch()
  const [question, setQuestion] = useState('')
  const stream = useSelector((state: RootState) => state.stream)

  const { data: archiveData, isLoading } = useGetArchive(chatId)
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
          <TextWithSources text={str} />
          {user.history.length > 0 && <History history={user.history} />}
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
          </div>
        </div>
      </div>
    </CurrQuestionContext.Provider>
  )
}
export function History({ history }: { history: UserHistory[] }) {
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
}

function getWebservices(history) {
  const webservices = []

  history.chunks.map((chunk) => {
    chunk.web_services.map((webservice) => {
      if (webservices.length >= 3) return webservices
      webservices.push(webservice)
    })
  })

  return webservices
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
