import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postNewQuestion } from "../../utils/newQuestion";
import { GlobalRowContainer } from "../Global/GlobalRowContainer";
import { GlobalDiv } from "../Global/GlobalDiv";
import { GlobalSubtitle } from "../Global/GlobalSubtitle";
import { meetingAppointmentInformations } from "../../constants/meeting";
import { GlobalParagraph } from "../Global/GlobalParagraph";
import { MeetingSeparator } from "./MeetingSeparator";
import { MeetingResponse } from "./MeetingResponse";

export function MeetingPage() {
	const	user = useSelector((state) => state.user);
	const	archive = useSelector((state) => state.archive);
	const	auth = useSelector((state) => state.auth);
	const	userQuestion = user.question.query.length !== 0 ? user.question.query : archive[archive.length - 1].question.query;
	const	dispatch = useDispatch();
	
	useEffect(() => {
		if (!user.question.query.length || user.isChat)
			return ;
		postNewQuestion(dispatch, auth, user.question, user.choices.newQuestion);
	}, [user.question]);

	return <GlobalRowContainer>
		<GlobalDiv>
			<GlobalSubtitle>{meetingAppointmentInformations}</GlobalSubtitle>
			<div className="fr-pb-3w"><GlobalParagraph>{userQuestion}</GlobalParagraph></div>
			<MeetingResponse />
		</GlobalDiv>
	</GlobalRowContainer>
}