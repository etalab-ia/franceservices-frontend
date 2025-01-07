const modelName: string = import.meta.env.VITE_MODEL_NAME as string
const modelMode: string = import.meta.env.VITE_MODEL_MODE as string
const modelTemperature: number = import.meta.env.VITE_MODEL_TEMPERATURE as number

import { chatUrl, streamUrl, useAddFeedback } from '@api'
import { Notice } from '@codegouvfr/react-dsfr/Notice'
import StarIcon from '@mui/icons-material/Star'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import {
  type NegativeFeedbackArray,
  type NegativeReason,
  type PositiveFeedbackArray,
  type PositiveReason,
  negativeTags,
  positiveTags,
} from '@types'
import { useFetch } from '@utils/hooks'
import { setHeaders } from '@utils/setData'
import Separator from 'components/Global/Separator'
import { LoadingSpinner } from 'components/LoadingSpinner'
import { TextWithSources } from 'components/Sources/TextWithSources'
import { EventSourcePolyfill } from 'event-source-polyfill'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { onCloseStream } from '../utils/eventsEmitter'
import { fr } from '@codegouvfr/react-dsfr'
//import ShowError from 'components/Error/ShowError'

const questions = [
  {
    question:
      'Comment changer le titulaire sur la carte grise suite au décès du conjoint ?',
    theme: 'Immatriculation',
    operators: ['ANTS / France titres'],
    complexity: 'Simple',
  },
  {
    question:
      "L'usager souhaite faire la carte grise d'un véhicule acquis en 2021 mais n'a plus le certificat de cession. Comment faire ?",
    theme: 'Immatriculation',
    operators: ['ANTS / France titres'],
    complexity: 'Intermédiaire',
  },
  {
    question:
      "Une usagère, dont son frère est décédé et était titulaire de la carte grise, a hérité du véhicule. Si elle ne veut pas conserver le véhicule, peut-elle le vendre directement sans mettre la carte grise à son nom, sachant que le véhicule n'a pas roulé depuis le décès mais que le décès était il y a plus de 3 mois ?",
    theme: 'Immatriculation',
    operators: ['ANTS / France titres'],
    complexity: 'Complexe',
  },
  {
    question: "Quel cerfa dois-je fournir pour une demande d'aide au logement à la CAF ?",
    theme: 'Logement',
    operators: ['CAF'],
    complexity: 'Simple',
  },
  {
    question:
      "L'usagère, âgée de 57 ans, est en accident de travail depuis presque 6 mois suite à une mission d'intérim. Elle est par ailleurs reconnue travailleur handicapé. Elle va passer en longue maladie mais n'a pas d'employeur puisque sa mission d'intérim s'est terminée depuis. Elle vit seule et n'a pas d'enfant. Quels sont ses droits financiers ? A-t-elle droit au RSA ?",
    theme: 'RSA',
    operators: ['CAF'],
    complexity: 'Complexe',
  },
  {
    question:
      "Quelle est le montant maximum pour un couple qui souhaite bénéficier de l'ASPA ?",
    theme: 'ASPA',
    operators: ['CARSAT'],
    complexity: 'Simple',
  },
  {
    question: 'Combien faut-il de trimestres cotisés pour une retraite à taux plein ?',
    theme: 'Retraite',
    operators: ['CARSAT'],
    complexity: 'Simple',
  },
  {
    question:
      "Une usagère souhaite savoir si le fait d'être à mi-temps thérapeutique pour une durée de 6 mois engendre un changement dans la date de départ à la retraite ou sur le montant de sa retraite ?",
    theme: 'Retraite',
    operators: ['CARSAT'],
    complexity: 'Intermédiaire',
  },
  {
    question:
      "L'usager ne comprend pas pourquoi sa pension de retraite a diminué alors qu'il y a eu une revalorisation des retraites de 5,3% au premier janvier 2024. Pourquoi est-ce que sa pension de retraite diminue ?",
    theme: 'Retraite',
    operators: ['CARSAT'],
    complexity: 'Complexe',
  },
  {
    question:
      'Une usagère part en vacances au Maroc, elle souhaite savoir si les dépenses de santé au Maroc peuvent être prises en charge par la CPAM ?',
    theme: 'Aides financières',
    operators: ['CPAM'],
    complexity: 'Simple',
  },
  {
    question:
      "L'usager ne perçoit plus sa pension d'invalidité. La CPAM peut-elle arrêter le versement de la prestation après 2 ans de paiement alors que l'usager n'a jamais rencontré de médecin conseil ?",
    theme: "Pension d'invalidité",
    operators: ['CPAM'],
    complexity: 'Intermédiaire',
  },
  {
    question:
      'Un usager relevant de la MSA travaille maintenant dans le privé depuis 1 an. Comment doit-il faire pour que son dossier soit muté à la CPAM ?',
    theme: 'Droits',
    operators: ['CPAM'],
    complexity: 'Complexe',
  },
  {
    question: "Quelles sont les conditions d'exonération de taxe foncière ?",
    theme: 'Impôts',
    operators: ['DGFIP'],
    complexity: 'Simple',
  },
  {
    question:
      "Comment est calculé le montant de la taxe d'ordure ménagère pour des locations foncières ?",
    theme: 'Impôts',
    operators: ['DGFIP'],
    complexity: 'Simple',
  },
  {
    question:
      "Sur GMBI, est-ce qu'un bien apparaît sur les espaces des deux conjoints lorsque le bien est en indivision ?",
    theme: 'GMBI',
    operators: ['DGFIP'],
    complexity: 'Intermédiaire',
  },
  {
    question:
      "L'usager a-t-il le droit à des indemnités France travail après une démission ?",
    theme: 'Emploi',
    operators: ['France travail'],
    complexity: 'Simple',
  },
  {
    question: 'Quelle est la démarche pour demander son casier judiciaire ?',
    theme: 'Casier judiciaire',
    operators: ['Ministère de la Justice'],
    complexity: 'Simple',
  },
  {
    question:
      "L'usager est affilié à la MSA. Comment procéder au renouvellement de sa carte vitale ?",
    theme: 'Carte vitale',
    operators: ['MSA'],
    complexity: 'Simple',
  },
  {
    question: 'Comment recourir au médiateur de la Caf ou de la MSA ?',
    theme: 'Médiation',
    operators: ['MSA', 'CAF'],
    complexity: 'Intermédiaire',
  },
  {
    question: 'Comment demander un chèque énergie 2023 non reçu ?',
    theme: 'Chèque énergie',
    operators: ['MTE'],
    complexity: 'Simple',
  },
  {
    question:
      "Une usagère n'ayant pas fait sa déclaration de revenu fiscal depuis 2021 peut-elle avoir droit au chèque énergie ?",
    theme: 'Chèque énergie',
    operators: ['MTE'],
    complexity: 'Intermédiaire',
  },
]

export default function Evaluations() {
  const navigate = useNavigate()
  const location = useLocation()

  // Determine whether we're on the panel or the questions list
  const selectedCardIndex = location.state?.selectedCardIndex ?? null

  const handleBack = () => {
    navigate('/evaluations', { state: null })
  }

  return (
    <div className="flex flex-col gap-4 mt-8 min-h-screen fr-container">
      {selectedCardIndex === null ? (
        <>
          <h3>Sélectionnez une question pour évaluer Albert</h3>
          <p>
            Explorez et évaluez la pertinence des réponses générées par notre modèle IA à
            travers cet échantillon de questions prédéfinies. <br />
            Votre expertise nous aidera à mesurer la qualité de notre assistant
            conversationnel.
          </p>
          <Questions navigate={navigate} />
        </>
      ) : (
        <QuestionDetail
          question={questions[selectedCardIndex].question}
          operators={questions[selectedCardIndex].operators}
          theme={questions[selectedCardIndex].theme}
          complexity={questions[selectedCardIndex].complexity}
          onBack={handleBack}
        />
      )}
    </div>
  )
}

function Questions({ navigate }) {
  const [filteredQuestions, setFilteredQuestions] = useState([])
  const [evaluatedQuestions, setEvaluatedQuestions] = useState(
    JSON.parse(localStorage.getItem('evaluatedQuestions') || '[]'),
  )

  useEffect(() => {
    const unevaluatedQuestions = questions.filter(
      (q, index) => !evaluatedQuestions.includes(index),
    )
    const shuffledQuestions = unevaluatedQuestions
      .map((q, index) => ({ ...q, originalIndex: questions.indexOf(q) }))
      .sort(() => Math.random() - 0.5)
      .slice(0, 5)

    setFilteredQuestions(shuffledQuestions)
  }, [evaluatedQuestions])

  return (
    <div className="flex flex-col">
      {filteredQuestions.length > 0 ? (
        filteredQuestions.map((question, idx) => (
          <QuestionRow
            key={idx}
            index={question.originalIndex}
            question={question.question}
            theme={question.theme}
            operators={question.operators}
            complexity={question.complexity}
            onSelect={() =>
              navigate('/evaluations', {
                state: { selectedCardIndex: question.originalIndex },
              })
            }
          />
        ))
      ) : (
        <p className="font-bold fr-text--xl self-center justify-self-center fr-mt-4w">
          Il n'y a plus de questions à évaluer. Merci pour votre contribution !
        </p>
      )}
    </div>
  )
}

function QuestionRow({
  index,
  question,
  theme,
  operators,
  complexity,
  onSelect,
}: {
  index: number
  question: string
  theme: string
  operators: string[]
  complexity: string
  onSelect: () => void
}) {
  const handleClick = () => {
    onSelect()
  }

  return (
    <>
      <button
        type="button"
        className="min-h-[10vh] cursor-pointer p-6 hover:bg-gray-100 focus:bg-gray-200 transition flex flex-col text-left"
        onClick={handleClick}
        tabIndex={0}
      >
        <p className="text-left">{question}</p>
        <div className="flex gap-2 fr-mt-2w">
          <span
            className={
              'fr-tag fr-text-action-high--blue-france fr-background-action-low--blue-france'
            }
          >
            {theme}
          </span>
          {operators.map((operator, idx) => (
            <span
              key={idx}
              className={
                'fr-tag fr-text-action-high--blue-france fr-background-action-low--blue-france'
              }
            >
              {operator}
            </span>
          ))}
          <span
            style={{
              backgroundColor: fr.colors.decisions.background.alt.brownCafeCreme.default,
            }}
            className={'fr-tag fr-text-action-high--blue-france'}
          >
            {complexity}
          </span>
        </div>
      </button>
      <Separator />
    </>
  )
}

function QuestionDetail({ question, theme, operators, onBack, complexity }) {
  const [isStreamFinished, setIsStreamFinished] = useState(false)
  const [streamId, setStreamId] = useState(null)

  return (
    <div className="flex flex-col h-full flex-grow min-h-[800px] w-full">
      <div className="fr-text--lg fr-mb-4w">
        <h3>Évaluer Albert</h3>
      </div>
      {/* Flex container for main content and panel */}
      <div className="flex flex-grow h-full transition-all duration-500">
        <AnswerPannel
          question={question}
          setIsStreamFinished={setIsStreamFinished}
          setStreamId={setStreamId}
          theme={theme}
          operators={operators}
          complexity={complexity}
        />
        <EvaluationPannel
          isStreamFinished={isStreamFinished}
          onBack={onBack}
          streamId={streamId}
          question={question}
        />
      </div>
    </div>
  )
}

function EvaluationPannel({
  isStreamFinished,
  onBack,
  streamId,
  question,
}: {
  isStreamFinished: boolean
  onBack: () => void
  streamId: number | null
  question: string
}) {
  const [positiveFeedback, setPositiveFeedback] = useState<PositiveFeedbackArray>([])
  const [negativeFeedback, setNegativeFeedback] = useState<NegativeFeedbackArray>([])
  const [comments, setComments] = useState('')
  const [showNotice, setShowNotice] = useState(false)
  const [showErrorNotice, setShowErrorNotice] = useState(false)
  const [rating, setRating] = useState<number | null>(null)
  const [progress, setProgress] = useState(100)
  const addFeedback = useAddFeedback()

  const isSubmitDisabled = !(
    rating &&
    (positiveFeedback.length > 0 || negativeFeedback.length > 0) &&
    isStreamFinished
  )

  const handlePositiveTagClick = (tag: PositiveReason) => {
    setPositiveFeedback((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    )
  }
  const handleNegativeTagClick = (tag: NegativeReason) => {
    setNegativeFeedback((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    )
  }
  const addQuestionToLocalStorage = (questionIndex: number) => {
    const evaluatedQuestions = JSON.parse(
      localStorage.getItem('evaluatedQuestions') || '[]',
    )
    const updatedQuestions = [...evaluatedQuestions, questionIndex]
    localStorage.setItem('evaluatedQuestions', JSON.stringify(updatedQuestions))
  }
  const handleSubmit = () => {
    setShowErrorNotice(false)
    if (isSubmitDisabled) return
    if (!streamId) {
      setShowErrorNotice(true)
    }
    addFeedback.mutate(
      {
        feedback: {
          isGood: null,
          type: 'evaluations',
          message: comments,
          positives: positiveFeedback,
          negatives: negativeFeedback,
          note: rating,
          isConfirmed: true,
        },
        streamId: streamId,
      },
      {
        onSuccess: () => {
          setShowNotice(true)
          setRating(null)
          setPositiveFeedback([])
          setNegativeFeedback([])
          setComments('')
          setProgress(100)

          const totalDuration = 3000
          const intervalTime = 100
          const decrement = 100 / (totalDuration / intervalTime)

          const interval = setInterval(() => {
            setProgress((prevProgress) => {
              const newProgress = prevProgress - decrement
              if (newProgress <= 0) {
                clearInterval(interval)
                setShowNotice(false)
                onBack()
                return 0
              }
              return newProgress
            })
          }, intervalTime)
          const questionIndex = questions.findIndex((q) => q.question === question)
          addQuestionToLocalStorage(questionIndex)
        },
        onError: (error) => {
          setShowErrorNotice(true)
        },
      },
    )
  }
  return (
    <>
      {/* Evaluation Panel */}
      <div
        className={`transition-all duration-500 flex flex-col  
   w-full md:w-1/2 `}
      >
        <div className="flex flex-col px-4">
          <div className="h-full flex flex-col">
            <p className="font-bold fr-text--lg ">Qualifer la réponse</p>
            <div className="flex flex-col gap-8 ">
              {/* Global rating */}

              <div className="flex items-center gap-2">
                <p className="font-bold flex items-center">Note générale</p>
                <div className="flex items-center">
                  <HoverRating value={rating} setValue={setRating} />
                </div>
              </div>
              {/* Feedback tags*/}
              <div className="flex flex-col gap-8">
                {/* Positive tags */}
                <div className="flex gap-2 items-center">
                  <span className={'fr-icon-thumbs-up'} />
                  <div className="flex gap-2">
                    {Object.entries(positiveTags).map(([tagKey, tagValue]) => (
                      <button
                        key={tagKey}
                        type="button"
                        onClick={() => handlePositiveTagClick(tagValue)}
                        className="fr-tag"
                        aria-pressed={positiveFeedback.includes(tagValue)}
                      >
                        {tagKey}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Negative tags */}
                <div className="flex items-start gap-2">
                  <span className="fr-icon-thumbs-down mt-2.5" />
                  <div className="flex flex-1 flex-wrap gap-2">
                    {Object.entries(negativeTags).map(([tagKey, tagValue]) => (
                      <button
                        key={tagKey}
                        type="button"
                        onClick={() => handleNegativeTagClick(tagValue)}
                        className="fr-tag"
                        aria-pressed={negativeFeedback.includes(tagValue)}
                      >
                        {tagKey}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {/* Comments field */}
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold">Commentaires complémentaires</p>
                  <p className="text-xs fr-text-mention--grey">(optionnel)</p>
                </div>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="fr-input mt-2 w-full"
                  placeholder="la réponse proposée est..."
                />
              </div>
            </div>
          </div>

          {/* Submit button */}
          <div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitDisabled}
              className={`fr-btn fr-btn--secondary fr-mt-4w ${
                isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {addFeedback.isPending ? <LoadingSpinner /> : 'Évaluer'}
            </button>
          </div>
        </div>

        {/* Notification */}
        {showNotice && (
          <div className="fixed bottom-4 right-4 motion-preset-bounce ">
            <div className="relative">
              <Notice title="Votre évaluation a été envoyée" />
              {/* Progress bar over the Notice component */}
              <div className="absolute top-0 left-0 w-full">
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div
                    className="bg-blue-600 h-1 rounded-full"
                    style={{
                      width: `${progress}%`,
                      transition: 'width 100ms linear',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {showErrorNotice && (
          <div className="fixed bottom-4 right-4 motion-preset-bounce ">
            <div className="relative">
              <AlertNotice setShowErrorNotice={setShowErrorNotice} />
              {/* Progress bar over the Notice component */}
              <div className="absolute top-0 left-0 w-full">
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div
                    className="bg-red-600 h-1 rounded-full"
                    style={{
                      width: `${progress}%`,
                      transition: 'width 100ms linear',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
function AnswerPannel({
  theme,
  question,
  operators,
  setIsStreamFinished,
  complexity,
  setStreamId,
}: {
  theme: string
  question: string
  operators: string
  setIsStreamFinished: (value: boolean) => void
  complexity: string
  setStreamId: (value: number) => void
}) {
  const scrollRef = useRef(null)
  const [response, setResponse] = useState('')
  const [isUserScrolledUp, setIsUserScrolledUp] = useState(false)

  const prompt = {
    chat_type: 'evaluations',
    themes: [theme],
    operators: operators,
  }

  // Auto-scroll to bottom when new content is added
  useEffect(() => {
    if (!isUserScrolledUp && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [response, isUserScrolledUp])

  // Handle scroll events to detect user scrolling up
  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
      if (scrollTop + clientHeight < scrollHeight - 5) {
        setIsUserScrolledUp(true)
      } else {
        setIsUserScrolledUp(false)
      }
    }
  }, [])

  useEffect(() => {
    console.log('render response panel')
  }, [])

  async function askAlbert() {
    const headers = setHeaders(false)
    const stream_data = {
      model_name: modelName,
      mode: modelMode,
      query: question,
      limit: 7,
      context: undefined,
      institution: undefined,
      links: undefined,
      temperature: modelTemperature,
      sources: ['service-public', 'travail-emploi'],
      should_sids: [],
      must_not_sids: [],
    }
    const chat = await useFetch(chatUrl, 'POST', {
      data: JSON.stringify(prompt),
      headers,
    })
    const stream = await useFetch(`${streamUrl}/chat/${chat.id}`, 'POST', {
      data: JSON.stringify(stream_data),
      headers,
    })
    setStreamId(stream.id)
    const stream_chat = new EventSourcePolyfill(`${streamUrl}/${stream.id}/start`, {
      headers: setHeaders(true),
      withCredentials: true,
    })

    stream_chat.onmessage = (e) => {
      const jsonData = JSON.parse(e.data)
      setResponse((prev) => prev + jsonData.choices[0].delta.content)

      if (jsonData.choices[0].finish_reason === 'stop') {
        stream_chat.close()
        setIsUserScrolledUp(false)
        setIsStreamFinished(true)
      }
    }

    onCloseStream(() => {
      if (stream_chat) {
        stream_chat.close()
      }
    })
  }

  useEffect(() => {
    askAlbert()
  }, [])
  return (
    <>
      <div
        className={`flex flex-col flex-grow transition-all duration-500
      w-full md:w-1/2 h-full
    `}
      >
        <div className="fr-text--lg fr-mb-2w">
          <div className="flex gap-3">
            <p className="fr-text--lg font-bold">Question sélectionnée</p>
            <div className="flex gap-2 fr-mb-4w">
              <p className="fr-tag fr-tag--sm fr-background-contrast--blue-france">
                {theme}
              </p>
              <p className="fr-tag fr-tag--sm fr-background-contrast--blue-france">
                {operators}
              </p>
              <p
                style={{
                  backgroundColor:
                    fr.colors.decisions.background.alt.brownCafeCreme.default,
                }}
                className="fr-tag fr-tag--sm"
              >
                {complexity}
              </p>
            </div>
          </div>
          <div className="fr-px-2w fr-py-3v fr-text--md inline-flex w-full rounded fr-background-alt--blue-france">
            {question}
          </div>
        </div>
        <div>
          <p className="fr-text--lg m-0 p-0 font-bold">Réponse proposée par Albert</p>
          {/* Scrollable response container */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="shadow-inner fr-mt-1v rounded-lg fr-px-2w h-[50vh] overflow-y-scroll"
          >
            <p>
              <TextWithSources text={response} />
            </p>
          </div>
        </div>
        {/* <div className="flex gap-4 fr-my-2w">
            <button
              type="button"
              onClick={onBack}
              className="fr-btn fr-btn--secondary fr-btn--sm "
            >
              Retour
            </button>
          </div> */}
      </div>
      <div className="flex items-center mx-4">
        <div className="w-px h-40 bg-gray-500" />
      </div>
    </>
  )
}

const labels: { [index: string]: string } = {
  1: 'Inutile',
  2: 'Médiocre',
  3: 'Passable',
  4: 'Bon',
  5: 'Excellent',
}

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`
}

export function HoverRating({ value, setValue }) {
  const [hover, setHover] = useState(-1)

  return (
    <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
      <Rating
        name="hover-feedback"
        value={value}
        precision={1}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover)
        }}
        emptyIcon={
          <StarIcon
            style={{ opacity: 0.55, border: 2, borderColor: 'white' }}
            fontSize="inherit"
          />
        }
      />
      {value !== null && <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>}
    </Box>
  )
}

function AlertNotice({
  setShowErrorNotice,
}: { setShowErrorNotice: (value: boolean) => void }) {
  return (
    <div className="fr-notice fr-notice--warning">
      <div className="fr-container">
        <div className="fr-notice__body">
          <p>
            <span className="fr-notice__title">
              Erreur lors de l'envoi de votre évaluation
            </span>
          </p>
          <span className="fr-notice__desc">
            Vous pouvez nous contacter pour nous signaler le problème.
          </span>
          <a
            target="_blank"
            rel="noopener external noreferrer"
            title="Formulaire de contact"
            href="/contact"
            className="fr-notice__link"
          >
            Formulaire de contact
          </a>
          <button
            type="button"
            title="Masquer le message"
            onClick={() => setShowErrorNotice(false)}
            id="button-1305"
            className="fr-btn--close fr-btn"
          >
            Masquer le message
          </button>
        </div>
      </div>
    </div>
  )
}
