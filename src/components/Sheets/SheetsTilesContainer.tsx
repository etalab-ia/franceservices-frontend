import { getSheetsUrl, indexesUrl } from '@api'
import type { ArchiveType, RootState, Sheet } from '@types'
import { CurrQuestionContext } from '@utils/context/questionContext'
import { useFetch } from '@utils/hooks'
import { setHeaders, setIndexesData, setTilesFromSheets } from '@utils/setData'
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SheetsAdditionalTilesTitle } from './SheetsAdditionalTilesTitle'
import { SheetsTiles } from './SheetsTiles'

/****************************************************************************************
	
	USEEFFECT [currQuestion]: set user.sheets & user.additionalSheets from GET /indexes 
		sheets data OR from archive

*****************************************************************************************/

export const SheetsTilesContainer = ({
  archive,
  isModifiable,
}: {
  archive: ArchiveType
  isModifiable: boolean
}) => {
  const user = useSelector((state: RootState) => state.user)
  const [tiles, setTiles] = useState([])
  const [additionalTiles, setAdditionalTiles] = useState([])
  const { currQuestion } = useContext(CurrQuestionContext)
  const dispatch = useDispatch()
  useEffect(() => {
    const data = {
      question: currQuestion.query,
      must_not_sids: user.question.must_not_sids,
    }
    const streamId = archive ? archive.id : user.streamId
    if (!streamId) return

    setIndexesData(data, setTiles, dispatch, JSON.stringify(streamId), indexesUrl)
  }, [user.streamId, currQuestion])

  const getSheets = async () => {
    const data = {
      uids: archive.search_sids,
    }
    const sheets: Sheet[] = await useFetch(getSheetsUrl, 'POST', {
      headers: setHeaders(false),
      data: JSON.stringify(data),
    })
    setTilesFromSheets(sheets, setTiles)
  }

  useEffect(() => {
    if (!archive || !archive.search_sids) return

    getSheets()
  }, [])

  useEffect(() => {
    if (archive) return
    setTilesFromSheets(user.sheets, setTiles)
    setTilesFromSheets(user.additionalSheets, setAdditionalTiles)
  }, [user.additionalSheets])

  return (
    <>
      <SheetsTiles tiles={tiles} isModifiable={isModifiable} type="main" />
      {isModifiable && additionalTiles.length !== 0 && (
        <>
          <SheetsAdditionalTilesTitle />
          <SheetsTiles
            tiles={additionalTiles}
            isModifiable={isModifiable}
            type="additional"
          />
        </>
      )}
    </>
  )
}
