import { feedbackUrl } from '@api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Chat, Feedback } from '@types'

export function useAddFeedback() {
  return useMutation({
    mutationKey: ['addFeedback'],
    mutationFn: (params: AddFeedbackParams) => addFeedback(params),
  })
}

interface AddFeedbackParams {
  feedback: Feedback
  streamId: number
  reasons: string[]
}

const addFeedback = async ({ feedback, streamId, reasons }: AddFeedbackParams) => {
  const authToken = localStorage.getItem('authToken')
  const data = {
    is_good: !feedback.isGood ? true : false,
    message: feedback.message,
    reason: reasons[0],
  }
  const res = await fetch(`${feedbackUrl}/${streamId}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    console.log('error: response not ok', res)
    throw new Error("Impossible d'envoyer le feedback", { cause: res })
  }
  const result = await res.json()
  return result
}
