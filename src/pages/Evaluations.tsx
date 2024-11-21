import { chatUrl, streamUrl } from '@api'
import { ChatCompletion, Question } from '@types'
import { useFetch } from '@utils/hooks'
import { setHeaders } from '@utils/setData'
import { EventSourcePolyfill } from 'event-source-polyfill'
import { useEffect, useState, useRef, useCallback } from 'react'
import { onCloseStream } from '../utils/eventsEmitter'
import { TextWithSources } from 'components/Sources/TextWithSources'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import { Notice } from '@codegouvfr/react-dsfr/Notice'
import StarIcon from '@mui/icons-material/Star'

const questions = [
  {
    title: 'TItre de question',
    question: 'Peut-on faire une saisie sur le RSA ?',
    theme: 'RSA',
    operator: 'CAF',
  },
  {
    title: 'TItre de question',
    question: 'Peut-on faire une saisie sur le RSA ?',
    theme: 'RSA',
    operator: 'CAF',
  },
  {
    title: 'TItre de question',
    question: 'Peut-on faire une saisie sur le RSA ?',
    theme: 'RSA',
    operator: 'CAF',
  },
  {
    title: 'TItre de question',
    question: 'Peut-on faire une saisie sur le RSA ?',
    theme: 'RSA',
    operator: 'CAF',
  },
]

export default function Evaluations() {
  const [selectedCardIndex, setSelectedCardIndex] = useState(null)

  const handleBack = () => {
    setSelectedCardIndex(null)
  }

  return (
    <div className="flex flex-col gap-4 items-center mt-8 min-h-screen fr-container">
      <div className="fr-text--lg fr-mb-4w">
        <h1>Évaluations</h1>
      </div>
      {selectedCardIndex === null ? (
        <>
          <h3>Sélectionnez une question à évaluer</h3>
          <Questions setSelectedCardIndex={setSelectedCardIndex} />
        </>
      ) : (
        <QuestionDetail
          question={questions[selectedCardIndex].question}
          operator={questions[selectedCardIndex].operator}
          title={questions[selectedCardIndex].title}
          theme={questions[selectedCardIndex].theme}
          onBack={handleBack}
        />
      )}
    </div>
  )
}

function Questions({ setSelectedCardIndex }) {
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
  const lightOrDark = localStorage.getItem('scheme')
  const border = lightOrDark === 'dark' ? 'hover:border-white' : 'hover:border-black'

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className={`motion-preset-fade motion-duration-1000 rounded-2xl fr-border-action-high-grey border-2 fr-p-2w min-w-64 min-h-24 transform transition-transform duration-200 ease-in-out cursor-pointer
        hover:scale-105 hover:fr-border-action--high-grey focus:scale-105 focus:fr-border-action--high-grey ${border}`}
    >
      <div className="fr-mb-2w">
        <h4>{title}</h4>
        <p>{question}</p>
        <div className="flex gap-2 fr-mt-2w">
          <p className="fr-tag fr-background-alt--yellow-tournesol">Thème : {theme}</p>
          <p className="fr-tag fr-background-contrast--blue-france">
            Opérateur : {operator}
          </p>
        </div>
      </div>
    </div>
  )
}

const modelName: string = import.meta.env.VITE_MODEL_NAME as string
const modelMode: string = import.meta.env.VITE_MODEL_MODE as string
const modelTemperature: number = import.meta.env.VITE_MODEL_TEMPERATURE as number

function QuestionDetail({ question, theme, operator, title, onBack }) {
  const [response, setResponse] = useState('')
  const [isUserScrolledUp, setIsUserScrolledUp] = useState(false)
  const [isStreamFinished, setIsStreamFinished] = useState(false)
  const scrollRef = useRef(null)

  const prompt = {
    chat_type: 'evaluations',
    themes: [theme],
    operator: [operator],
  }

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
        setIsStreamFinished(true) // Set to true when stream finishes
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
        // User has scrolled up
        setIsUserScrolledUp(true)
      } else {
        // User is at the bottom
        setIsUserScrolledUp(false)
      }
    }
  }, [])

  return (
    <div className="flex flex-col h-full flex-grow min-h-[800px] w-full">
      {/* Flex container for main content and panel */}
      <div className="flex flex-grow transition-all duration-500">
        {/* Main Content */}
        <div
          className={`flex flex-col flex-grow transition-all duration-500
          w-full md:w-1/2
        `}
        >
          <div className="fr-text--lg fr-mb-2w">
            <h3>{title}</h3>
          </div>
          <div className="fr-text--lg fr-mb-2w">
            <p>{question}</p>
          </div>
          <div className="flex gap-4 fr-mb-4w">
            <p className="fr-tag fr-background-alt--yellow-tournesol">Thème: {theme}</p>
            <p className="fr-tag fr-background-contrast--blue-france">
              Opérateur: {operator}
            </p>
          </div>
          <h4>Réponse</h4>
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="shadow-inner fr-mt-2w rounded-lg fr-p-2w h-[50vh] overflow-scroll"
          >
            <p>
              <TextWithSources text={response} />
            </p>
          </div>
          <div className="flex gap-4 fr-my-2w">
            <button
              type="button"
              onClick={onBack}
              className="fr-btn fr-btn--secondary fr-btn--sm "
            >
              Retour
            </button>
          </div>
        </div>
        <div className="flex items-center mx-4">
          <div className="w-px h-40 bg-gray-500" />
        </div>
        {/* Sliding Panel */}
        <div
          className={`transition-all duration-500 overflow-hidden w-full md:w-1/2 bg-red-200
          `}
        >
          <div className="px-4 h-full bg-red-200">
            <h3>Évaluation</h3>
            <h4>Note globale</h4>
            <HoverRating />
          </div>
        </div>
      </div>
    </div>
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

export function HoverRating() {
  const [value, setValue] = useState<number | null>(2)
  const [hover, setHover] = useState(-1)

  return (
    <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover)
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>}
    </Box>
  )
}
