import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setIndexesData } from "../../utils/setData"
import { setTilesFromSheets } from "../../utils/setData"
import { SheetsTiles } from "./SheetsTiles"
import { SheetsAdditionalTilesTitle } from "./SheetsAdditionalTilesTitle"
import { CurrQuestionContext } from "../../utils/context/questionContext"

/****************************************************************************************
	
	USEEFFECT [currQuestion]: set user.sheets & user.additionalSheets from GET /indexes 
		sheets data OR from archive

*****************************************************************************************/

export const SheetsTilesContainer = ({
	archiveSheets,
	archiveAdditionalSheets,
	archiveWebservices,
	isModifiable,
}) => {
	const user = useSelector((state) => state.user)
	const [tiles, setTiles] = useState([])
	const [additionalTiles, setAdditionalTiles] = useState([])
	const { currQuestion } = useContext(CurrQuestionContext)
	const dispatch = useDispatch()

	useEffect(() => {
		const data = {
			question: currQuestion.query,
			must_not_sids: user.question.must_not_sids,
		}

		!archiveSheets && setIndexesData(data, setTiles, dispatch)
		archiveSheets &&
			dispatch({
				type: "SET_SHEETS_FROM_ARCHIVE",
				sheets: archiveSheets,
				additionalSheets: archiveAdditionalSheets,
				webservices: archiveWebservices,
			})
	}, [currQuestion])

	useEffect(() => {
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
