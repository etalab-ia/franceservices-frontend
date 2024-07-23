import type { Question, Sheet, Tile } from '@types'
import { useFetch } from './hooks'
import { useAuth } from 'react-oidc-context'
import getHeader from 'api/utils/getHeader'

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

/***************************
		SP SHEETS
 **************************/

const setIndexesBody = (data, name, limit: number, streamId: string) => {
  const body = JSON.stringify({
    name: name,
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
  indexType: 'sheets' | 'chunks',
  chunkSize: number,
  streamId: string,
  indexesUrl: string,
) => {
  const actionType = indexType === 'sheets' ? 'SET_SHEETS' : 'SET_CHUNKS'
  const auth = useAuth()
  if (indexType === 'sheets' && data.must_not_sids.length !== 0) return
  try {
    const res = await useFetch(indexesUrl, 'POST', {
      data: setIndexesBody(data, indexType, chunkSize, streamId),
      headers: getHeader(auth.user.access_token, auth.user.refresh_token),
    })
    dispatch({ type: actionType, [indexType]: res })
  } catch (error) {
    console.error('An error occurred: ', error)
  }
}
