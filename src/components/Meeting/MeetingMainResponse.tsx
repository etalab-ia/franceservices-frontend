import { Button } from '@codegouvfr/react-dsfr/Button'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { MeetingInputContext, RootState } from 'types'
import { emitCloseStream } from 'utils/eventsEmitter'
import { generateStream } from 'utils/hooks'
import { addContextToQuestion } from 'utils/setData'
import { GlobalColContainer } from '../Global/GlobalColContainer'
import { MeetingRelatedQuestions } from './MeetingRelatedQuestions'
import { MeetingStream } from './MeetingStream'
import { MeetingTags } from './MeetingTags'
import { ThemesAndAdminsInput } from './ThemesAndAdminsInput'
/*****************************************************************************************************
	
	COMPONENTS:

		**	MeetingStream: display stream & chunks from GET /indexes chunks used to generate response

		**	MeetingRelatedQuestions: set related questions cards from sheets informations

 *****************************************************************************************************/

export function MeetingMainResponse() {
  const [question, setQuestion] = useState('')

  return (
    <>
      <GlobalColContainer extraClass="fr-mt-5w">
        <MeetingStream />
        <MeetingRelatedQuestions setQuestion={setQuestion} />
        <NewQuestionInput questionInput={question} setQuestionInput={setQuestion} />
      </GlobalColContainer>
    </>
  )
}

function NewQuestionInput({
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
    e.preventDefault()

    setQuestionInput(e.target.value)
  }

  useEffect(() => {
    emitCloseStream()
    generateStream(user.question, dispatch, user.chatId, false)
  }, [user.question])

  const handleSubmit = async () => {
    setIsAdditionalInputOpened(false)
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
    dispatch({
      type: 'SET_USER_QUERY',
      nextUserQuery: addContextToQuestion(questionInput, context),

      nextChatId: user.chatId,
    })
    stream.historyStream.length &&
      dispatch({
        type: 'SET_MESSAGES',
        nextMessage: { text: stream.historyStream, sender: 'agent' },
      })
    dispatch({ type: 'RESET_STREAM_HISTORY' })
    dispatch({
      type: 'SET_MESSAGES',
      nextMessage: { text: questionInput, sender: 'user' },
    })

    setQuestionInput('')
  }

  function handleKeyDown(e: any) {
    if (e.key === 'Enter' && questionInput !== '' && !stream.isStreaming) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="fr-mt-2w fr-pb-2w  sticky right-0 bottom-0 left-0 z-10 bg-white">
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
      ></textarea>

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
          disabled={questionInput === '' || stream.isStreaming}
          className="fr-btn"
          title="Rechercher"
          iconId="fr-icon-search-line"
        >
          Rechercher
        </Button>
      </div>
      <p className="fr-my-3v text-xs">
        Vous pouvez affiner la réponse proposée par Albert en posant une nouvelle question
        relative à la situation de l’usager. Albert utilisera les échanges précédents pour
        formuler une nouvelle réponse.
      </p>
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
    if (fieldName === 'administrations')
      setContext((prevContext) => ({
        ...prevContext,
        administrations: [...prevContext.administrations, tag],
      }))
    else if (fieldName === 'themes')
      setContext((prevContext) => ({
        ...prevContext,
        themes: [...prevContext.themes, tag],
      }))
  }

  return (
    <div className="fr-mt-2w fr-grid-row gap-8">
      {inputFields.map((field, index) => {
        const tags = field.name === 'themes' ? context.themes : context.administrations
        return (
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
              tags={tags}
            />
          </div>
        )
      })}
    </div>
  )
}

const inputFields = [
  {
    label: 'Thèmes associés',
    name: 'themes',
    className: 'fr-mr-1w',
  },
  {
    label: 'Opérateurs concernés',
    name: 'administrations',
    className: 'fr-mr-1w',
  },
]
