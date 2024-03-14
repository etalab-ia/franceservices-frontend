import { feedbackUrl } from '@api'
import { useQuery } from '@tanstack/react-query'
import { Chat, Feedback } from '@types'

export function useAddFeedback(feedback: Feedback, streamId: number, reasons: string[]) {
  return useQuery({
    queryKey: ['addFeedback'],
    queryFn: () => addFeedback(feedback, streamId, reasons),
    enabled: false,
  })
}

const addFeedback = async (
  feedback: Feedback,
  streamId: number,
  reasons: string[]
): Promise<any> => {
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
