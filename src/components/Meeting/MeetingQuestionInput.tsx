import { chatUrl } from '@api'
import Button from '@codegouvfr/react-dsfr/Button'
import type { MeetingInputContext, RootState } from '@types'
import { emitCloseStream } from '@utils/eventsEmitter'
import { generateStream, useFetch } from '@utils/hooks'
import { addContextToQuestion, setHeaders } from '@utils/setData'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThemesAndAdminsInput } from './ThemesAndAdminsInput'
import { MeetingTags } from './MeetingTags'
import { FirstQuestionExample } from './MeetingFirstQuestionSidePanel'

export function MeetingQuestionInput({
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
    dispatch({ type: 'SET_IS_STREAMING', nextIsStreaming: true })
    trackChatEvent(
      true,
      'meeting',
      'search',
      context.administrations,
      context.themes,
      chatId,
      user.streamId,
    )

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
    <div>
      <div className=" flex fr-background-default--grey fr-mr-2v ">
        <div className="fr-col ">
          <textarea
            style={{ minHeight: '40px', maxHeight: '168px', overflow: 'hidden' }}
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
            <NewQuestionMeetingAdditionalInput
              context={context}
              setContext={setContext}
            />
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

export function trackChatEvent(
  new_chat,
  type,
  step,
  operateur_field,
  theme_field,
  id_chat,
  id_stream,
) {
  if (window._paq) {
    window._paq.push(['trackEvent', 'etst', 'test'])
  }
}
