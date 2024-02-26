import { Button } from '@codegouvfr/react-dsfr/Button'
import { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ArchiveType, MeetingInputContext, RootState } from 'types'
import { CurrQuestionContext } from '../../utils/context/questionContext'
import { GlobalColContainer } from '../Global/GlobalColContainer'
import { GlobalSecondaryTitle } from '../Global/GlobalSecondaryTitle'
import { DisplaySourceCards } from './MeetingOutputs'
import { MeetingQR } from './MeetingQR'
import { MeetingStream } from './MeetingStream'
import { MeetingTags } from './MeetingTags'
import { ThemesAndAdminsInput } from './ThemesAndAdminsInput'
/*****************************************************************************************************
	
	COMPONENTS:

		**	MeetingStream: display stream & chunks from GET /indexes chunks used to generate response

		**	MeetingQR: set related questions cards from sheets informations

 *****************************************************************************************************/

export function MeetingMainResponse({ archive }: { archive: ArchiveType | undefined }) {
  const [question, setQuestion] = useState('')
  /*   const [feedback, setFeedback] = useState<FeedbackType>(InitialFeedback)
   */
  const user = useSelector((state: RootState) => state.user)
  return (
    <>
      <DisplaySourceCards chunks={user.chunks} />
      <GlobalColContainer>
        <MeetingStream archive={archive} />
        {/*         <Feedback isFirst={true} feedback={feedback} setFeedback={setFeedback} />
         */}{' '}
        {!archive && (
          <NewQuestionInput questionInput={question} setQuestionInput={setQuestion} />
        )}
        <MeetingQR archive={archive} setQuestion={setQuestion} />
      </GlobalColContainer>
    </>
  )
}

export function NewQuestionInput({ questionInput, setQuestionInput }) {
  const stream = useSelector((state: RootState) => state.stream)
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const { currQuestion, updateCurrQuestion } = useContext(CurrQuestionContext)
  const [isAdditionalInputOpened, setIsAdditionalInputOpened] = useState(false)
  const [context, setContext] = useState<MeetingInputContext>({
    administrations: [],
    themes: [],
  })

  const handleChange = (e) => {
    e.preventDefault()

    setQuestionInput(e.target.value)
  }

  const handleSubmit = async () => {
    setIsAdditionalInputOpened(false)
    updateCurrQuestion({ ...currQuestion, query: questionInput })
    dispatch({
      type: 'ADD_HISTORY',
      newItem: {
        query: currQuestion.query,
        response: stream.historyStream[0],
        sheets: user.sheets,
        chunks: user.chunks,
        webservices: user.webservices,
      },
    })
    dispatch({
      type: 'SET_USER_QUERY',
      nextUserQuery: questionInput,
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
      handleSubmit()
    }
  }

  return (
    <div>
      <div className=" w-full ">
        <GlobalSecondaryTitle extraClass="fr-mt-4w fr-mb-2w">
          Poser une question complémentaire
        </GlobalSecondaryTitle>
        <textarea
          style={{ minHeight: '10px' }}
          placeholder="Poser une nouvelle question"
          rows={1}
          onChange={handleChange}
          value={questionInput}
          onKeyDown={handleKeyDown}
          className="fr-input justify-end"
          id="textarea"
          name="textarea"
        ></textarea>
      </div>
      {isAdditionalInputOpened && (
        <NewQuestionMeetingAdditionalInput context={context} setContext={setContext} />
      )}
      <div className="flex justify-between">
        <Button
          onClick={() => setIsAdditionalInputOpened(!isAdditionalInputOpened)}
          disabled={stream.isStreaming}
          className="fr-btn"
          title="Rechercher"
          iconId={
            isAdditionalInputOpened ? 'fr-icon-arrow-up-s-line' : 'fr-icon-add-line'
          }
        ></Button>
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
    </div>
  )
}

export function NewQuestionMeetingAdditionalInput({
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

export const inputFields = [
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
