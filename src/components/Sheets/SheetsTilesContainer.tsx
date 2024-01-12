import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setHeaders, setIndexesData } from "../../utils/setData"
import { setTilesFromSheets } from "../../utils/setData"
import { SheetsTiles } from "./SheetsTiles"
import { SheetsAdditionalTilesTitle } from "./SheetsAdditionalTilesTitle"
import { CurrQuestionContext } from "../../utils/context/questionContext"
import { ArchiveType, RootState } from "types"
import { useFetch } from "../../utils/hooks"
import { getSheetsUrl } from "../../constants/api"

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
		if (!streamId || user.sheets.length) return

		setIndexesData(data, setTiles, dispatch, JSON.stringify(streamId))
	}, [user.streamId])

	const getSheets = async () => {
		const data = {
			uids: archive.search_sids,
		}
		const sheets = await useFetch(getSheetsUrl, "POST", {
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
					<SheetsTiles tiles={additionalTiles} isModifiable={isModifiable} type="additional" />
				</>
			)}
		</>
	)
}
