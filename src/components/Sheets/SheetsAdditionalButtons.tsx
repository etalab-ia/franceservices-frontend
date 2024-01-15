import { ModifyButton } from "../Global/ModifyButton"
import { GlobalRowContainer } from "../Global/GlobalRowContainer"
import { sheetsTitle } from "../../constants/sheets"
import { GlobalSecondaryTitle } from "../Global/GlobalSecondaryTitle"
import { GlobalColContainer } from "../Global/GlobalColContainer"
import { useEffect, useState, useContext, Dispatch } from "react"
import { useDispatch, useSelector } from "react-redux"
import { generateStream } from "../../utils/hooks"
import { emitCloseStream } from "../../utils/eventsEmitter"
import { getIndexes } from "../../utils/setData"
import { CurrQuestionContext } from "../../utils/context/questionContext"
import { ArchiveType, RootState } from "types"
import { useApiUrls } from "../../constants/api"

/*****************************************************************************************
	
	USEEFFECT [isModifiable]: set deleted sheets:
		- if a new deleted sheet has been added from initial main sheets
		- no regeneration on archive view
		- user was on edition mode and has saved his/her changes

	USEEFFECT [deletedSheets]: regenerate stream

 *****************************************************************************************/

export const SheetsAdditionalButtons = ({
	isModifiable,
	setIsModifiable,
	archive,
}: {
	isModifiable: boolean
	setIsModifiable: React.Dispatch<React.SetStateAction<boolean>>
	archive: ArchiveType | undefined
}) => {
	const buttonTitle = isModifiable ? "Enregistrer" : "Modifier la section"
	const buttonIcon = isModifiable
		? "fr-icon-save-3-fill fr-icon--sm flex justify-end items-center"
		: "fr-icon-settings-5-fill fr-icon--sm flex justify-end items-center"
	const user = useSelector((state: RootState) => state.user)
	const [deletedSheets, setDeletedSheets] = useState([])
	const dispatch = useDispatch()
	const { currQuestion, updateCurrQuestion } = useContext(CurrQuestionContext)
	const { streamUrl } = useApiUrls()

	const handleClick = () => {
		setIsModifiable(!isModifiable)
	}

	useEffect(() => {
		if (
			!archive &&
			!isModifiable &&
			JSON.stringify(deletedSheets) !== JSON.stringify(user.question.must_not_sids)
		)
			setDeletedSheets(user.question.must_not_sids)
	}, [isModifiable])

	useEffect(() => {
		if (archive) return

		if (!deletedSheets.length && !currQuestion.must_not_sids.length) return

		updateCurrQuestion({
			...currQuestion,
			must_not_sids: deletedSheets,
		})
	}, [deletedSheets])

	useEffect(() => {
		if (archive) return

		emitCloseStream()
		generateStream(currQuestion, dispatch, user.chatId, streamUrl)
	}, [currQuestion])

	useEffect(() => {
		if (!user.streamId || archive) return

		const data = {
			question: currQuestion.query,
			must_not_sids: user.question.must_not_sids,
		}

		getIndexes(data, dispatch, "chunks", currQuestion.limit, JSON.stringify(user.streamId))
	}, [user.streamId])

	return (
		<GlobalRowContainer>
			<GlobalSecondaryTitle>{sheetsTitle}</GlobalSecondaryTitle>
			<GlobalColContainer>
				{!archive && (
					<ModifyButton handleClick={handleClick} text={buttonTitle} extraClass={buttonIcon} />
				)}
			</GlobalColContainer>
		</GlobalRowContainer>
	)
}
