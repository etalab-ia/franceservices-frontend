import { chatUrl } from '@api'
import { Button } from '@codegouvfr/react-dsfr/Button'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { MeetingInputContext, RootState } from 'types'
import { emitCloseStream } from 'utils/eventsEmitter'
import { generateStream, useFetch } from 'utils/hooks'
import { addContextToQuestion, setHeaders } from 'utils/setData'
import { GlobalColContainer } from '../Global/GlobalColContainer'
import { MeetingRelatedQuestions } from './MeetingRelatedQuestions'
import { MeetingStream } from './MeetingStream'
import { MeetingTags } from './MeetingTags'
import { ThemesAndAdminsInput } from './ThemesAndAdminsInput'

export function MeetingMainResponse() {
  const [question, setQuestion] = useState('')
  const user = useSelector((state: RootState) => state.user)

  return (
    <GlobalColContainer extraClass="fr-mt-5w flex flex-col justify-between bg-red-400 ">
      <div>
        {user.chatId !== 0 && (
          <>
            <MeetingStream />
            <MeetingRelatedQuestions setQuestion={setQuestion} />
          </>
        )}
      </div>
      <QuestionInput questionInput={question} setQuestionInput={setQuestion} />
    </GlobalColContainer>
  )
}

function QuestionInput({
  questionInput,
  setQuestionInput,
}: {
  questionInput: string
  setQuestionInput: React.Dispatch<React.SetStateAction<string>>
}) {
  const stream = useSelector((state: RootState) => state.stream)
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const [isAdditionalInputOpened, setIsAdditionalInputOpened] = useState(false)
  const [context, setContext] = useState<MeetingInputContext>({
    administrations: [],
    themes: [],
  })

  const handleChange = (e) => {
    setQuestionInput(e.target.value)
  }

  useEffect(() => {
    emitCloseStream()
    if (user.chatId && user.question.query) {
      generateStream(user.question, dispatch, user.chatId, false)
    }
  }, [user.question, user.chatId])

  const handleSubmit = async () => {
    let chatId = user.chatId
    if (!chatId) {
      const headers = setHeaders(false)
      const chat = await useFetch(chatUrl, 'POST', {
        data: JSON.stringify({ chat_type: 'meeting' }),
        headers,
      })
      chatId = chat.id
      dispatch({ type: 'SET_CHAT_ID', nextChatId: chatId })
    }

    setIsAdditionalInputOpened(false)

    if (stream.historyStream.length) {
      dispatch({
        type: 'ADD_HISTORY',
        newItem: {
          query: user.question.query,
          response: stream.historyStream[0],
          sheets: user.sheets,
          chunks: user.chunks,
          webservices: user.webservices,
        },
      })
    }

    dispatch({
      type: 'SET_USER_QUERY',
      nextUserQuery: addContextToQuestion(questionInput, context),
      nextChatId: chatId,
    })

    if (stream.historyStream.length) {
      dispatch({
        type: 'SET_MESSAGES',
        nextMessage: { text: stream.historyStream, sender: 'agent' },
      })
    }

    dispatch({ type: 'RESET_STREAM_HISTORY' })
    dispatch({
      type: 'SET_MESSAGES',
      nextMessage: { text: questionInput, sender: 'user' },
    })

    setQuestionInput('')
  }

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' && questionInput && !stream.isStreaming) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="fr-mt-2v sticky right-0 bottom-0 left-0 z-10 bg-white">
      <textarea
        style={{ minHeight: '10px', overflow: 'hidden' }}
        placeholder="Poser une nouvelle question"
        rows={1}
        onChange={handleChange}
        value={questionInput}
        onKeyDown={handleKeyDown}
        className="fr-input justify-end"
        id="textarea"
        name="textarea"
      />

      {isAdditionalInputOpened && (
        <NewQuestionMeetingAdditionalInput context={context} setContext={setContext} />
      )}
      <div className="flex justify-between">
        <Button
          onClick={() => setIsAdditionalInputOpened(!isAdditionalInputOpened)}
          disabled={stream.isStreaming}
          className="fr-btn"
          title="Recherche avancée"
          iconId={
            isAdditionalInputOpened ? 'fr-icon-arrow-up-s-line' : 'fr-icon-add-line'
          }
        />
        <Button
          onClick={handleSubmit}
          disabled={!questionInput || stream.isStreaming}
          className="fr-btn"
          title="Rechercher"
          iconId="fr-icon-search-line"
        >
          Rechercher
        </Button>
      </div>
    </div>
  )
}

function NewQuestionMeetingAdditionalInput({
  context,
  setContext,
}: {
  context: MeetingInputContext
  setContext: React.Dispatch<React.SetStateAction<MeetingInputContext>>
}) {
  const handleSetTag = (tag, fieldName) => {
    setContext((prevContext) => ({
      ...prevContext,
      [fieldName]: [...prevContext[fieldName], tag],
    }))
  }

  return (
    <div className="fr-mt-2w fr-grid-row gap-8">
      {inputFields.map((field, index) => (
        <div className="fr-col-5" key={index}>
          <ThemesAndAdminsInput
            field={field}
            onTagSelect={(tag) => handleSetTag(tag, field.name)}
            themes={context.themes}
            administrations={context.administrations}
          />
          <MeetingTags
            setContext={setContext}
            context={context}
            field={field}
            tags={context[field.name]}
          />
        </div>
      ))}
    </div>
  )
}

const inputFields = [
  { label: 'Thèmes associés', name: 'themes', className: 'fr-mr-1w' },
  { label: 'Opérateurs concernés', name: 'administrations', className: 'fr-mr-1w' },
]
