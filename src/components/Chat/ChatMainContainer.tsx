import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@types'
import { scrollToBottom } from '@utils/manageEffects'
import { UserMessage } from '../User/UserMessage'
import { ChatHeightContainer } from './ChatHeightContainer'
import { ChatOverflowManagementContainer } from './ChatOverflowManagementContainer'
import { Display } from './Display'
import { set } from 'valibot'

// TODO WHEN BACK IS READY: change archive type
/*
 * ChatMainContainer: chat div between user & agent
 * ChatAdditionalContainer: additional informations given to user as sheets
 * ChatOverflowManagementContainer: manage overflow of chat
 * ChatHeightContainer: manage height of chat
 * UserMessage: input for user
 * Display: display messages
 */
export function ChatMainContainer({
  archive,
  setQuestionInput,
}: { archive: boolean; setQuestionInput: any }) {
  const user = useSelector((state: RootState) => state.user)
  const stream = useSelector((state: RootState) => state.stream)

  const dispatch = useDispatch()

  useEffect(() => {
    !archive && dispatch({ type: 'RESET_USER' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [user, stream, dispatch])
  return (
    <>
      <ChatHeightContainer>
        {user.messages.length <= 0 && (
          <QuestionsSuggestionList
            setQuestionInput={setQuestionInput}
            questions={['test', 'test2', 'test3']}
          />
        )}
        <ChatOverflowManagementContainer>
          {archive ? (
            <Display messages={[]} archive={true} />
          ) : (
            <Display messages={user.messages} archive={false} />
          )}
        </ChatOverflowManagementContainer>
      </ChatHeightContainer>
      {/*       {!archive && (
        <UserMessage
          setGenerate={setGenerate}
          questionInput={questionInput}
          setQuestionInput={setQuestionInput}
        />
      )} */}
    </>
  )
}

function QuestionsSuggestionList({
  questions,
  setQuestionInput,
}: {
  questions: string[]
  setQuestionInput: React.Dispatch<React.SetStateAction<string>>
}) {
  return (
    <div className="flex gap-2">
      {questions.map((q, index) => {
        return (
          <div
            onClick={() => setQuestionInput(q)}
            key={index}
            className=" fr-background-alt--blue-france rounded bg-contain fr-p-2w fr-text--lg cursor-pointer"
          >
            {q}
          </div>
        )
      })}
    </div>
  )
}
