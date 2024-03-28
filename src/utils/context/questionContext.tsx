import { InitialQuestion, type Question } from '@types'
import { createContext } from 'react'

export const CurrQuestionContext = createContext({
  currQuestion: InitialQuestion,
  updateCurrQuestion: (question: Question) => {},
})
