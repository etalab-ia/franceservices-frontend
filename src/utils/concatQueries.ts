import { UserHistory } from '@types'

export function concatQueries(
  currentQuery: string,
  previousQueries: UserHistory[]
): string {
  let result = ''

  for (let i = previousQueries.length - 1; i >= 0; i--) {
    //console.log('concatQueries', i, previousQueries[i].query)
    if (i === previousQueries.length - 1) {
      if (previousQueries[i].query.length + currentQuery.length + 1 > 12500)
        return currentQuery
      result = previousQueries[i].query + '\n' + currentQuery
    } else {
      if (previousQueries[i].query.length + result.length + 1 > 12500) return result
      result = previousQueries[i].query + '\n' + result
    }
  }
  return result
}
