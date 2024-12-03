import { evaluationsUrl } from '@api'
import { useMutation } from '@tanstack/react-query'

export function usePostEvaluations() {
  return useMutation({
    mutationKey: ['postEvaluations'],
    mutationFn: (params) => postEvaluations(params),
  })
}

function postEvaluations(params) {
  const authToken = localStorage.getItem('authToken')

  const data = {
    question: params.question,
    themes: params.themes,
    operators: params.operators,
    title: params.title,
    rating: params.rating,
    positiveFeedback: params.positiveFeedback,
    negativeFeedback: params.negativeFeedback,
    comments: params.comments,
  }

  return fetch(`${evaluationsUrl}/evaluations`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}
