import type { Question } from '@types'
import { useFetch } from './hooks'

/*
 * isEventSource is true when fetching for a stream
 */
export const setHeaders = (isEventSource: boolean) => {
  const token = localStorage.getItem('authToken')

  const headers = isEventSource
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }

  return headers
}

/***************************
		USER QUESTION
 **************************/

export const setContactData = (subject: string, text: string, institution: string) => {
  const data = {
    subject: subject,
    text: text,
    institution: institution,
  }

  return JSON.stringify(data)
}

export const setUserQuestion = (question: Question) => {
  const data = {
    model_name: question.model_name,
    mode: question.mode,
    query: question.query,
    limit: question.limit,
    context: question.context,
    institution: question.institution,
    links: question.links,
    temperature: question.temperature,
    sources: question.sources,
    must_not_sids: question.must_not_sids,
    with_history: true,
  }

  return data
}

export const addContextToQuestion = (question: string, context) => {
  const administrations = context.administrations.length
    ? `Les administrations concernées par cette question sont : ${context.administrations.map(
        (adminstration) => adminstration,
      )}`
    : ''
  const themes = context.themes.length
    ? `La question porte sur les thèmes suivants : ${context.themes.map(
        (theme) => theme,
      )}`
    : ''
  const questionWithContext = `${question}\n${administrations}\n${themes}`

  return questionWithContext
}
export const rmContextFromQuestion = (str: string) => {
  const context = [
    'Les administrations concernées par cette question sont : ',
    'La question porte sur les thèmes suivants : ',
  ]

  let newStr = str

  for (const c of context) {
    const start = newStr.indexOf(c)

    if (start !== -1) {
      newStr = newStr.substring(0, start).trim()
    }
  }

  return newStr
}
/***************************
		SP SHEETS
 **************************/

const setIndexesBody = (data, limit: number, streamId: string) => {
  const body = JSON.stringify({
    name: 'chunks',
    query: data.question,
    limit: limit,
    similarity: 'e5',
    institution: '',
    must_not_sids: data.must_not_sids,
    stream_id: streamId,
  })

  return body
}

/* retrieve chunks or sheets */
export const getIndexes = async (
  data,
  dispatch,
  chunkSize: number,
  streamId: string,
  indexesUrl: string,
) => {
  try {
    const res = await useFetch(indexesUrl, 'POST', {
      data: setIndexesBody(data, chunkSize, streamId),
      headers: setHeaders(false),
    })
    dispatch({ type: 'SET_CHUNKS', chunks: res })
  } catch (error) {
    console.error('An error occurred: ', error)
  }
}
