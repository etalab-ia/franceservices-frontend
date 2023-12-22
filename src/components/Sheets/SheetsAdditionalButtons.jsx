import { ModifyButton } from "../Global/ModifyButton";
import { GlobalRowContainer } from "../Global/GlobalRowContainer";
import { sheetsTitle } from "../../constants/sheets";
import { GlobalSecondaryTitle } from "../Global/GlobalSecondaryTitle";
import { GlobalColContainer } from "../Global/GlobalColContainer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePost } from "../../utils/hooks";
import { emitCloseStream } from "../../utils/eventsEmitter";
import { getIndexes, setQuestionFromRegeneration, setSidsSelection } from "../../utils/setData";

export const    SheetsAdditionalButtons = ({ isModifiable, setIsModifiable, archive }) => {
	const	buttonTitle = isModifiable ? "Enregistrer" : "Modifier la section";
	const	buttonIcon = isModifiable ? "fr-icon-save-3-fill fr-icon--sm flex justify-end items-center" : "fr-icon-settings-5-fill fr-icon--sm flex justify-end items-center";
	const	user = useSelector((state) => state.user);
	const	auth = useSelector((state) => state.auth);
	const	dispatch = useDispatch();
	const	[sids, setSids] = useState({
		should: [],
		must_not: []
	});

	const	handleClick = () => {
		setIsModifiable(!isModifiable);
	}

	useEffect(() => {
		if (!archive && !isModifiable && (user.question.must_not_sids.length !== 0 || user.question.should_sids.length !== 0))
			setSidsSelection(user.sheets, user.additionalSheets, setSids);
	}, [isModifiable])

	useEffect(() => {
		if ((user.question.must_not_sids.length === 0 && user.question.should_sids.length === 0))
			return ;

		const	question = setQuestionFromRegeneration(
			'rag', 
			user.originQuestion, 
			7, 
			sids.should, 
			sids.must_not
		);
		
		const	body = {
			question: question.query,
			should_sids: sids.should, 
			must_not_sids: sids.must_not
		}

		emitCloseStream(false);
		usePost(auth, question, dispatch);
		getIndexes(body, auth.userToken, dispatch, 'chunks', user.question.limit);
		dispatch({ type: 'RESET_SIDS_CHOICES'});
	}, [sids])

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