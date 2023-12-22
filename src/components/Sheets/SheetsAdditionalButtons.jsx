import { ModifyButton } from "../Global/ModifyButton";
import { GlobalRowContainer } from "../Global/GlobalRowContainer";
import { sheetsTitle } from "../../constants/sheets";
import { GlobalSecondaryTitle } from "../Global/GlobalSecondaryTitle";
import { GlobalColContainer } from "../Global/GlobalColContainer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePost } from "../../utils/hooks";
import { emitCloseStream } from "../../utils/eventsEmitter";
import { getIndexes, setQuestionFromRegeneration } from "../../utils/setData";

export const    SheetsAdditionalButtons = ({ isModifiable, setIsModifiable, archive }) => {
	const	buttonTitle = isModifiable ? "Enregistrer" : "Modifier la section";
	const	buttonIcon = isModifiable ? "fr-icon-save-3-fill fr-icon--sm flex justify-end items-center" : "fr-icon-settings-5-fill fr-icon--sm flex justify-end items-center";
	const	user = useSelector((state) => state.user);
	const	auth = useSelector((state) => state.auth);
	const	dispatch = useDispatch();

	const	handleClick = () => {
		setIsModifiable(!isModifiable);
	}

	useEffect(() => {
		// TODO: error: redo even if must not / should sids do not have changed
		if (!archive && !isModifiable && (user.question.must_not_sids.length || user.question.should_sids.length))
		{
			const	question = setQuestionFromRegeneration(
				'rag', 
				user.originQuestion, 
				7, 
				user.question.should_sids, 
				user.question.must_not_sids
			);
			const	body = {
				question: question.query,
				should_sids: question.should_sids,
				must_not_sids: question.must_not_sids
			}

			emitCloseStream(false);
			usePost(auth, question, dispatch);
			getIndexes(body, auth.userToken, dispatch, 'chunks', user.question.limit);
			dispatch({ type: 'RESET_SIDS_CHOICES'});
		}
		
	}, [isModifiable])

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