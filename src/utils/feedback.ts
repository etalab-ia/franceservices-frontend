export interface Feedback {
  reasons: string[]
  isConfirmed: boolean
  isGood: number | undefined
  message: ''
}

export const InitialFeedback: Feedback = {
  reasons: [],
  isConfirmed: false,
  isGood: undefined,
  message: '',
}
