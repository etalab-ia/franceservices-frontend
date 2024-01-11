import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setIndexesData } from "../../utils/setData"
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

		setIndexesData(data, setTiles, dispatch, streamId)
	}, [currQuestion])

	const getSheets = async () => {
		const token = localStorage.getItem("authToken")

		const sheets = await useFetch(getSheetsUrl + `/${archive.search_sids}`, "POST", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
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
