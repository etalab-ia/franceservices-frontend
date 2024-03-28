import { botQuestionRole } from '@constants/global'
import { NOT_SET } from '@constants/status'
import type { RootState } from '@types'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalRowContainer } from './GlobalRowContainer'

export function BotQuestion({ id, choice }) {
  const user = useSelector((state: RootState) => state.user)
  const buttons = ['Oui', 'Non']
  const [buttonChoice, setButtonChoice] =
    choice === NOT_SET ? useState(NOT_SET) : useState(choice)
  const dispatch = useDispatch()

  const handleClick = async (index) => {
    // @ts-expect-error TS(2339) FIXME: Property 'choices' does not exist on type 'User'.
    if (user.choices[id] === index) {
      setButtonChoice(NOT_SET)
      dispatch({ type: 'SET_USER_CHOICES', nextKey: id, nextValue: NOT_SET })
    } else {
      setButtonChoice(index)
      dispatch({ type: 'SET_USER_CHOICES', nextKey: id, nextValue: index })
    }
  }

  return (
    <div className="fr-ml-10w">
      <GlobalRowContainer>
        {buttons.map((button, index) => {
          const classNames = index === buttonChoice ? `bg-purple` : `bg-[white]`
          const cursor =
            buttonChoice !== NOT_SET ? 'cursor-not-allowed' : 'cursor-pointer'

          return (
            <button
              role={botQuestionRole}
              disabled={buttonChoice !== NOT_SET}
              onClick={() => handleClick(index)}
              key={index}
              className={`user-feedback-buttons ${classNames} ${cursor}`}
            >
              <p
                className={
                  index === buttonChoice
                    ? `text-white text-center`
                    : `text-purple text-center`
                }
              >
                {button}
              </p>
            </button>
          )
        })}
      </GlobalRowContainer>
    </div>
  )
}
