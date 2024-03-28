import { Button } from '@codegouvfr/react-dsfr/Button'
import { defaultButtonChoice } from '@constants/chatbotProps'
import {
  defaultInputFields,
  meetingDefaultQuestionsIntroduction,
} from '@constants/meeting'
import { CurrQuestionContext } from '@utils/context/questionContext'
import { useContext } from 'react'
import { GlobalRowContainer } from '../Global/GlobalRowContainer'

export function MeetingDefaultQuestions({ setContext }) {
  const { currQuestion, updateCurrQuestion } = useContext(CurrQuestionContext)

  const handleClick = (field) => {
    updateCurrQuestion({
      ...currQuestion,
      query: field.question,
    })
    setContext({ themes: field.themes, administrations: field.administrations })
  }

  return (
    <GlobalRowContainer>
      <span className="fr-p-2w fr-background-alt--blue-france">
        {meetingDefaultQuestionsIntroduction}
        {defaultInputFields.map((field, index) => {
          return (
            <Button
              nativeButtonProps={{ role: defaultButtonChoice(field.title) }}
              key={index}
              priority="secondary"
              onClick={() => handleClick(field)}
              className="w-full fr-my-3v justify-center"
            >
              {field.title}
            </Button>
          )
        })}
      </span>
    </GlobalRowContainer>
  )
}
