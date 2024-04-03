import type { RootState } from '@types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Display } from './Display'

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

  return (
    <>
      <div className=" flex flex-col justify-items-center  ">
        {/*         {user.messages.length <= 0 && (
          <QuestionsSuggestionList
            setQuestionInput={setQuestionInput}
            questions={['test', 'test2', 'test3']}
          />
        )} */}
        {archive ? (
          <Display messages={[]} archive={true} />
        ) : (
          <Display messages={user.messages} archive={false} />
        )}
      </div>
    </>
  )
}
