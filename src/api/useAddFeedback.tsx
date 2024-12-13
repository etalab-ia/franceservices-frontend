import { feedbackUrl } from '@api'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { Feedback } from '@types'

export function useAddFeedback() {
  return useMutation({
    mutationKey: ['addFeedback'],
    mutationFn: (params: AddFeedbackParams) => addFeedback(params),
  })
}

interface AddFeedbackParams {
  feedback: Feedback
  streamId: number
}

const addFeedback = async ({ feedback, streamId }: AddFeedbackParams) => {
  console.log('addFeedback', feedback, streamId)
  const authToken = localStorage.getItem('authToken')
  const data = {
    is_good: !feedback.isGood,
    message: feedback.message,
    positives: feedback.positives ? feedback.positives : [],
    negatives: feedback.negatives ? feedback.negatives : [],
    note: feedback.note,
    is_confirmed: feedback.isConfirmed,
    type: feedback.type,
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
    console.error('error: response not ok', res)
    throw new Error("Impossible d'envoyer le feedback", { cause: res })
  }
  const result = await res.json()
  return result
}
