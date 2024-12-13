import { chatUrl, streamUrl, useAddFeedback } from '@api'
import { Notice } from '@codegouvfr/react-dsfr/Notice'
import StarIcon from '@mui/icons-material/Star'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import { useFetch } from '@utils/hooks'
import { setHeaders } from '@utils/setData'
import { TextWithSources } from 'components/Sources/TextWithSources'
import { EventSourcePolyfill } from 'event-source-polyfill'
import { useCallback, useEffect, useRef, useState } from 'react'
import { onCloseStream } from '../utils/eventsEmitter'
import type {
  NegativeFeedbackArray,
  NegativeReason,
  PositiveFeedbackArray,
  PositiveReason,
} from '@types'
import { LoadingSpinner } from 'components/LoadingSpinner'
import { set } from 'valibot'
//import ShowError from 'components/Error/ShowError'

const questions = [
  {
    title: 'Titre de question',
    question:
      'Peut-on faire une saisie sur le RSA ?Peut-on faire une saisie sur le RSA ?',
    theme: 'RSA',
    operator: 'CAF',
    complexity: 'Facile',
  },
  {
    title: 'Titre de question',
    question: 'Peut-on faire une saisie sur le RSA ?',
    theme: 'RSA',
    operator: 'CAF',
    complexity: 'Facile',
  },
  {
    title: 'Titre de question',
    question: 'Peut-on faire une saisie sur le RSA ?',
    theme: 'RSA',
    operator: 'CAF',
    complexity: 'Facile',
  },
  {
    title: 'Titre de question',
    question: 'Peut-on faire une saisie sur le RSA ?',
    theme: 'RSA',
    operator: 'CAF',
    complexity: 'Facile',
  },
]

export default function Evaluations() {
  const [selectedCardIndex, setSelectedCardIndex] = useState(null)

  const handleBack = () => {
    setSelectedCardIndex(null)
  }

  return (
    <div className="flex flex-col gap-4  mt-8 min-h-screen fr-container">
      {selectedCardIndex === null ? (
        <>
          <h3>Sélectionnez une question</h3>
          <Questions setSelectedCardIndex={setSelectedCardIndex} />
        </>
      ) : (
        <QuestionDetail
          question={questions[selectedCardIndex].question}
          operator={questions[selectedCardIndex].operator}
          theme={questions[selectedCardIndex].theme}
          complexity={questions[selectedCardIndex].complexity}
          onBack={handleBack}
        />
      )}
    </div>
  )
}

function Questions({ setSelectedCardIndex }) {
  // const { data: questionList, error, isLoading } = useGetEvaluationQuestions()
  // if (error) {
  //   console.error(error)
  //   //@ts-expect-error
  //   return <ShowError message={error.message} errorNumber={error.status} />
  // }
  useEffect(() => {
    console.log('render')
  }, [])
  return (
    <div className="grid grid-cols-2 gap-4">
      {questions.map((question, index) => (
        <QuestionCard
          key={index}
          index={index}
          title={question.title}
          question={question.question}
          theme={question.theme}
          operator={question.operator}
          setSelectedCardIndex={setSelectedCardIndex}
        />
      ))}
    </div>
  )
}

function QuestionCard({
  index,
  question,
  theme,
  operator,
  title,
  setSelectedCardIndex,
}: {
  index: number
  question: string
  theme: string
  operator: string
  title: string
  setSelectedCardIndex: (index: number) => void
}) {
  const handleClick = () => {
    setSelectedCardIndex(index)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className={`motion-preset-fade motion-duration-1000 rounded-2xl hover:outline hover:outline-2  fr-p-2w min-w-64 min-h-24 transform transition-transform duration-200 ease-in-out cursor-pointer
        hover:scale-105 hover:fr-border-action--high-grey focus:scale-105 focus:fr-border-action--high-grey `}
    >
      <div className="fr-mb-2w">
        <p className="fr-text--lg font-bold">{title}</p>
        <p>{question}</p>
        <div className="flex gap-2 fr-mt-2w">
          <p className="fr-tag fr-background-alt--yellow-tournesol">Thème : {theme}</p>
          <p className="fr-tag fr-background-contrast--blue-france">
            Opérateur : {operator}
          </p>
        </div>
      </div>
    </button>
  )
}

const modelName: string = import.meta.env.VITE_MODEL_NAME as string
const modelMode: string = import.meta.env.VITE_MODEL_MODE as string
const modelTemperature: number = import.meta.env.VITE_MODEL_TEMPERATURE as number

function QuestionDetail({ question, theme, operator, onBack, complexity }) {
  const [isStreamFinished, setIsStreamFinished] = useState(false)

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
          theme={theme}
          operator={operator}
          complexity={complexity}
        />
        <EvaluationPannel isStreamFinished={isStreamFinished} onBack={onBack} />
      </div>
    </div>
  )
}

function EvaluationPannel({ isStreamFinished, onBack }) {
  const [positiveFeedback, setPositiveFeedback] = useState<PositiveFeedbackArray>([])
  const [negativeFeedback, setNegativeFeedback] = useState<NegativeFeedbackArray>([])
  const [comments, setComments] = useState('')
  const [showNotice, setShowNotice] = useState(false)
  const [showErrorNotice, setShowErrorNotice] = useState(false)
  const [rating, setRating] = useState<number | null>(null)
  const [progress, setProgress] = useState(100)
  const addFeedback = useAddFeedback()

  const positiveTags: {
    [index: string]: PositiveReason
  } = {
    Clair: 'clair',
    Synthétique: 'synthetique',
    Complet: 'complet',
    'Sources fiables': 'sources_fiables',
  }
  const negativeTags: {
    [index: string]: NegativeReason
  } = {
    Incorrect: 'incorrect',
    Incohérent: 'incoherent',
    'Manque de sources': 'manque_de_sources',
  }
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
  const handleSubmit = () => {
    setShowErrorNotice(false)
    // TODO: BACK END LOGIC
    //if (isSubmitDisabled) return

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
        streamId: 1,
      },
      {
        onSuccess: () => {
          setShowNotice(true)
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
            <p className="font-bold fr-text--lg ">Comment qualifiez-vous la réponse ?</p>
            <div className="flex flex-col gap-8 ">
              {/* Global rating */}

              <div className="flex items-center gap-2">
                <p className="font-bold flex items-center">Note générale</p>
                <div className="flex items-center">
                  <HoverRating value={rating} setValue={setRating} />
                </div>
              </div>
              {/* Feedback tags*/}
              <div className="flex flex-col gap-2">
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
                <div className="flex items-center gap-2">
                  <span className={'fr-icon-thumbs-down '} />
                  <div className="flex gap-2">
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
                  <p className="font-bold">Complétez votre évaluation</p>
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
              disabled={false}
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
function AnswerPannel({ theme, question, operator, setIsStreamFinished, complexity }) {
  const scrollRef = useRef(null)
  const [response, setResponse] = useState('')
  const [isUserScrolledUp, setIsUserScrolledUp] = useState(false)

  const prompt = {
    chat_type: 'evaluations',
    themes: [theme],
    operator: [operator],
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
            <p className="fr-text--lg font-bold">Votre séléction de question</p>
            <div className="flex gap-2 fr-mb-4w">
              <p className="fr-tag fr-tag--sm fr-background-contrast--blue-france">
                {theme}
              </p>
              <p className="fr-tag fr-tag--sm fr-background-contrast--blue-france">
                {operator}
              </p>
              <p className="fr-tag fr-tag--sm fr-background-contrast--blue-france">
                {complexity}
              </p>
            </div>
          </div>
          <div className="fr-px-2w fr-py-3v inline-flex w-full rounded fr-background-alt--blue-france">
            {question}
          </div>
        </div>
        <div>
          <p className="fr-text--lg m-0 p-0 font-bold">Réponse proposée par Albert</p>
          {/* Scrollable response container */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="shadow-inner fr-mt-1v rounded-lg fr-px-2w h-[50vh] overflow-scroll"
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
  0.5: 'Inutile',
  1: 'Inutile+',
  1.5: 'Médiocre',
  2: 'Médiocre+',
  2.5: 'Passable',
  3: 'Passable+',
  3.5: 'Bon',
  4: 'Bon+',
  4.5: 'Excellent',
  5: 'Excellent+',
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
            rel="noopener external"
            title="[À MODIFIER - Intitulé] - nouvelle fenêtre"
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
