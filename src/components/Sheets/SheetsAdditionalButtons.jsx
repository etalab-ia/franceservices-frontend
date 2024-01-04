import { ModifyButton } from "../Global/ModifyButton";
import { GlobalRowContainer } from "../Global/GlobalRowContainer";
import { sheetsTitle } from "../../constants/sheets";
import { GlobalSecondaryTitle } from "../Global/GlobalSecondaryTitle";
import { GlobalColContainer } from "../Global/GlobalColContainer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePost } from "../../utils/hooks";
import { emitCloseStream } from "../../utils/eventsEmitter";
import { getIndexes, setQuestionFromRegeneration } from "../../utils/setData";

/*****************************************************************************************
	
	USEEFFECT [isModifiable]: set deleted sheets:
		- if a new deleted sheet has been added from initial main sheets
		- no regeneration on archive view
		- user was on edition mode and has saved his/her changes

	USEEFFECT [deletedSheets]: regenerate stream

 *****************************************************************************************/

export const    SheetsAdditionalButtons = ({ isModifiable, setIsModifiable, archive }) => {
	const	buttonTitle = isModifiable ? "Enregistrer" : "Modifier la section";
	const	buttonIcon = isModifiable ? "fr-icon-save-3-fill fr-icon--sm flex justify-end items-center" : "fr-icon-settings-5-fill fr-icon--sm flex justify-end items-center";
	const	user = useSelector((state) => state.user);
	const	auth = useSelector((state) => state.auth);
	const	[deletedSheets, setDeletedSheets] = useState([]);
	const	dispatch = useDispatch();

	const	handleClick = () => {
		setIsModifiable(!isModifiable);
	}

	useEffect(() => {
		if (!archive && !isModifiable && JSON.stringify(deletedSheets) !== JSON.stringify(user.question.must_not_sids))
			setDeletedSheets(user.question.must_not_sids);
	}, [isModifiable])

	useEffect(() => {
		const	question = setQuestionFromRegeneration(
			'rag', 
			user.originQuestion, 
			7, 
			user.question.must_not_sids
		);
		
		const	body = {
			question: question.query,
			must_not_sids: user.question.must_not_sids
		}

		emitCloseStream(false);
		usePost(auth, question, dispatch);
		getIndexes(body, auth.userToken, dispatch, 'chunks', user.question.limit);
	}, [deletedSheets])

	return (
		<GlobalRowContainer>
			<GlobalSecondaryTitle>{sheetsTitle}</GlobalSecondaryTitle>
			<GlobalColContainer>
				<ModifyButton
					handleClick={handleClick}
					text={buttonTitle}
					extraClass={buttonIcon}
				/>
			</GlobalColContainer>
		</GlobalRowContainer>
	);
}