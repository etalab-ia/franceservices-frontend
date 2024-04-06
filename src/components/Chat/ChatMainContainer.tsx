import type { RootState } from '@types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Display } from './Display'

/*
 * ChatMainContainer: chat div between user & agent
 * Display: display messages
 */
export function ChatMainContainer({ archive }: { archive: boolean }) {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    !archive && dispatch({ type: 'RESET_USER' })
  }, [])

  return (
    <>
      <div className="flex flex-col justify-items-center">
        {archive ? (
          <Display messages={[]} archive={true} />
        ) : (
          <Display messages={user.messages} archive={false} />
        )}
      </div>
    </>
  )
}
