import { UserHistory } from '@types'

export function concatQueries(
  currentQuery: string,
  previousQueries: UserHistory[]
): string {
  let result = ''
  if (!previousQueries.length) return currentQuery
  for (let i = previousQueries.length; i > 0; i--) {
    if (i === previousQueries.length) {
      if (previousQueries[i - 1].query.length + currentQuery.length + 1 > 12500)
        return currentQuery
      result = previousQueries[i - 1].query + '\n' + currentQuery
    } else {
      if (previousQueries[i - 1].query.length + result.length + 1 > 12500) return result
      result = previousQueries[i - 1].query + '\n' + result
    }
  }
  return result
}
