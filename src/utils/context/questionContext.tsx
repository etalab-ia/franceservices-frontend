import { createContext } from 'react'
import { InitialQuestion, Question } from '../../../types'

export const CurrQuestionContext = createContext({
  currQuestion: InitialQuestion,
  updateCurrQuestion: (question: Question) => {},
})
