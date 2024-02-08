import { SearchBar } from '@codegouvfr/react-dsfr/SearchBar'
import { useContext, useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { RootState } from 'types'
import { chatUrl, streamUrl } from '../../constants/api'
import { CurrQuestionContext } from '../../utils/context/questionContext'
import { generateStream, useFetch } from '../../utils/hooks'
import { setHeaders } from '../../utils/setData'

/*
 **
 */
export function UserMessage({ setGenerate, chatType }) {
  const stream = useSelector((state: RootState) => state.stream)
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const [questionInput, setQuestionInput] = useState('')
  const { currQuestion, updateCurrQuestion } = useContext(CurrQuestionContext)

  const handleChange = (e) => {
    e.preventDefault()

    /*   useEffect(() => {
    if (!user.question.query.length || !user.chatId) return
    console.log("JE SERS A QUOI ???!!!")
   // generateStream(user.question, dispatch, user.chatId, true)
    dispatch({ type: 'RESET_FEEDBACK' })
  }, [user.question]) */

    useEffect(() => {
      if (!user.question.query.length || !user.chatId) return
      console.log('generate stream from usermessage')
      generateStream(user.question, dispatch, user.chatId, true)
      dispatch({ type: 'RESET_FEEDBACK' })
    }, [user.question])

    const handleRenderInput = (params) => {
      const newParams = { maxLength: 800 }
      const updatedParams = { ...params, ...newParams }

      return <input {...updatedParams} />
    }

    return (
      <div className="flex justify-center">
        <SearchBar
          label="Poser votre question"
          className="w-5/6"
          onButtonClick={handleClick}
          //@ts-expect-error
          onChange={handleChange}
          renderInput={handleRenderInput}
        />
      </div>
    )
  }
}
