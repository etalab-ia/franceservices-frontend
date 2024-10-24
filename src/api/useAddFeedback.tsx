import { feedbackUrl } from '@api'
import { useMutation } from '@tanstack/react-query'
import type { Feedback } from '@types'
import { setHeaders } from '@utils/setData'

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
  const data = {
    is_good: !feedback.isGood,
    message: feedback.message,
    reason:
      reasons[0] === 'other' ? (reasons[1]?.length ? reasons[1] : null) : reasons[0],
  }
  const res = await fetch(`${feedbackUrl}/${streamId}`, {
    method: 'POST',
    credentials: 'include',
    headers: setHeaders(false),

    body: JSON.stringify(data),
  })

  if (!res.ok) {
    console.error('error: response not ok', res)
    throw new Error("Impossible d'envoyer le feedback", { cause: res })
  }
  const result = await res.json()
  return result
}
