import { chatUrl } from '@api'
import Button from '@codegouvfr/react-dsfr/Button'
import type { Chunk, MeetingInputContext, RootState } from '@types'
import { emitCloseStream } from '@utils/eventsEmitter'
import { generateStream, useFetch } from '@utils/hooks'
import { addContextToQuestion, setHeaders } from '@utils/setData'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { MeetingTags } from './MeetingTags'
import { ThemesAndAdminsInput } from './ThemesAndAdminsInput'
import { createSelector } from 'reselect'

export function MeetingQuestionInput({
  isNewChat,
  questionInput,
  setQuestionInput,
  context,
  setContext,
}: {
  isNewChat: boolean
  questionInput: string
  setQuestionInput: React.Dispatch<React.SetStateAction<string>>
  context: MeetingInputContext
  setContext: React.Dispatch<React.SetStateAction<MeetingInputContext>>
}) {
  const { historyStream, isStreaming } = useSelector(selectMeetingQuestionInput)
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const location = useLocation()
  const [showError, setShowError] = useState(false)
  const [isAdditionalInputOpened, setIsAdditionalInputOpened] = useState(
    !historyStream.length && location.pathname === '/meeting',
  )
  useEffect(() => {
    return () => {
      setContext({
        administrations: [],
        themes: [],
      })
    }
  }, [])
  const [messageCount, setMessageCount] = useState(0)
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
    if (context.themes.length === 0 || context.administrations.length === 0) {
      setShowError(true)
      setIsAdditionalInputOpened(true)
    } else {
      setShowError(false)
      let chatId = user.chatId
      dispatch({ type: 'SET_IS_STREAMING', nextIsStreaming: true })

      //TODO: Make it possible to send multiple administrations
      if (!chatId) {
        const chat = await useFetch(chatUrl, 'POST', {
          data: JSON.stringify({
            chat_type: 'meeting',
            themes: context.themes,
            operator: context.administrations[0],
          }),
          headers: setHeaders(false),
        })
        chatId = chat.id
        dispatch({ type: 'SET_CHAT_ID', nextChatId: chatId })
      }

      setIsAdditionalInputOpened(false)

      if (historyStream.length) {
        dispatch({
          type: 'ADD_HISTORY',
          newItem: {
            query: user.question.query,
            response: historyStream[0],
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

      if (historyStream.length) {
        dispatch({
          type: 'SET_MESSAGES',
          nextMessage: { text: historyStream, sender: 'agent' },
        })
      }

      dispatch({ type: 'RESET_STREAM_HISTORY' })
      dispatch({
        type: 'SET_MESSAGES',
        nextMessage: { text: questionInput, sender: 'user' },
      })

      setMessageCount((prevCount) => prevCount + 1)

      trackChatEvent(
        isNewChat,
        questionType(questionInput, user.chunks),
        messageCount + 1, // Use messageCount + 1 to track the correct step
        context.administrations.length > 0,
        context.themes.length > 0,
        chatId,
        user.lastStreamId,
      )

      setQuestionInput('')
    }
  }

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' && questionInput && !isStreaming) {
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
              showError={showError}
            />
          )}
          <div className="flex justify-between">
            <Button
              onClick={() => setIsAdditionalInputOpened(!isAdditionalInputOpened)}
              disabled={isStreaming}
              className="fr-btn"
              title="Recherche avancée"
              iconId={
                isAdditionalInputOpened ? 'fr-icon-arrow-up-s-line' : 'fr-icon-add-line'
              }
            />
            <Button
              onClick={handleSubmit}
              disabled={!questionInput || isStreaming}
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
  showError,
}: {
  context: MeetingInputContext
  setContext: React.Dispatch<React.SetStateAction<MeetingInputContext>>
  showError: boolean
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
        <div className="fr-col-5 fr-mb-2w" key={index}>
          <ThemesAndAdminsInput
            field={field}
            onTagSelect={(tag) => handleSetTag(tag, field.name)}
            themes={context.themes}
            administrations={context.administrations}
            showError={showError}
          />
          <MeetingTags setContext={setContext} field={field} tags={context[field.name]} />
        </div>
      ))}
    </div>
  )
}

const inputFields = [
  { label: 'Opérateurs concernés', name: 'administrations', className: 'fr-mr-1w' },
  { label: 'Thèmes associés', name: 'themes', className: 'fr-mr-1w' },
]

function questionType(question: string, chunks: Chunk[]) {
  let updatedQuestions = []

  let count = 0

  for (const chunk of chunks) {
    if (count >= 3) break

    if (chunk.related_questions) {
      for (const qr of chunk.related_questions) {
        const objectExists = updatedQuestions.some((obj) => obj.sid === qr.sid)

        if (!objectExists) {
          updatedQuestions = [
            ...updatedQuestions,
            { question: qr.question, sid: qr.sid, url: qr.url },
          ]
        }
      }
    }
    count++
  }

  if (question === 'Peut-on faire une saisie sur le RSA ?') return 'first_question'
  if (updatedQuestions.some((item) => item.question.includes(question)))
    return 'suggested_question'
  return 'auto'
}

function trackChatEvent(
  isNewChat: boolean,
  type: 'auto' | 'first_question' | 'suggested_question',
  step: number,
  isOperatorsFilled: boolean,
  isThemesFilled: boolean,
  chat_id: number,
  id_stream: number,
) {
  const chatData = {
    is_new_chat: isNewChat,
    type,
    step,
    operateur_field: isOperatorsFilled,
    theme_field: isThemesFilled,
    chat_id,
    id_stream,
  }
  const eventData = JSON.stringify(chatData)

  window._paq.push(['trackEvent', 'Chat', 'NewMessage', eventData])
}

const selectStreamData = (state: RootState) => state.stream

export const selectMeetingQuestionInput = createSelector(
  [selectStreamData],
  (stream) => ({
    historyStream: stream.historyStream,
    isStreaming: stream.isStreaming,
  }),
)
