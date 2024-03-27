import Input from '@codegouvfr/react-dsfr/Input'
import { meetingSubtitle } from '@constants/meeting'
import { CurrQuestionContext } from '@utils/context/questionContext'
import { handleTextareaResize } from '@utils/manageEffects'
import { useContext } from 'react'
import { GlobalColContainer } from '../Global/GlobalColContainer'
import { GlobalSubtitle } from '../Global/GlobalSubtitle'
import { MeetingPromptAdvice } from './MeetingPromptAdvice'

/*
 * Meeting user's question input
 */
export function MeetingMainInformations() {
  const { currQuestion, updateCurrQuestion } = useContext(CurrQuestionContext)

  const handleChange = (e) => {
    e.preventDefault()

    updateCurrQuestion({
      ...currQuestion,
      query: e.target.value,
    })
  }

  return (
    <GlobalColContainer>
      <GlobalSubtitle>{meetingSubtitle}</GlobalSubtitle>
      <Input
        id="text-area"
        textArea
        className="fr-mt-2w"
        nativeTextAreaProps={{
          onChange: handleChange,
          onInputCapture: handleTextareaResize,
          value: currQuestion.query,
          style: { minHeight: 300 },
        }}
        label=""
      />
      <MeetingPromptAdvice />
    </GlobalColContainer>
  )
}
