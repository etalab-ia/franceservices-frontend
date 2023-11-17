import { GlobalColContainer } from "../Global/GlobalColContainer";
import { GlobalDiv } from "../Global/GlobalDiv";
import { GlobalParagraph } from "../Global/GlobalParagraph";
import { GlobalRowContainer } from "../Global/GlobalRowContainer";
import { GlobalSubtitle } from "../Global/GlobalSubtitle";
import { GlobalTitle } from "../Global/GlobalTitle";
import { meetingGenerationPage, meetingInformations, meetingParagraph, meetingSubtitle, meetingTitle } from "../../constants/meeting";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { useEffect, useState } from "react";
import { setNewQuestion, postNewQuestion } from "../../utils/newQuestion";
import { useDispatch, useSelector } from "react-redux";

export function	MeetingSettings({ setGenerate }) {
	const	dispatch = useDispatch();
	const	auth = useSelector((state) => state.auth);
	const	stream = useSelector((state) => state.stream);
	const	user = useSelector((state) => state.user);
	const	[currQuestion, setCurrQuestion] = useState('');

	const	handleChange = (e) => {
		e.preventDefault();

		setCurrQuestion(e.target.value);
	}

	const	handleClick = () => {
		setNewQuestion(dispatch, currQuestion, stream.historyStream);
        setGenerate(true);
	}

	useEffect(() => {
		if (!user.question.query.length)
			return ;
		postNewQuestion(dispatch, auth, user.question, user.choices.newQuestion);
	}, [user.question]);

	return <GlobalRowContainer>
		<GlobalDiv>
			<GlobalTitle>{meetingTitle}</GlobalTitle>
			<GlobalRowContainer>
				<GlobalColContainer>
					<GlobalSubtitle>{meetingSubtitle}</GlobalSubtitle>
				</GlobalColContainer>
				<GlobalColContainer>
					<GlobalSubtitle>{meetingInformations}</GlobalSubtitle>
				</GlobalColContainer>
			</GlobalRowContainer>
			<GlobalRowContainer>
				<GlobalColContainer>
					<GlobalParagraph>{meetingParagraph}</GlobalParagraph>
				</GlobalColContainer>
				<GlobalColContainer>
					<Input className="fr-mb-2w" label="Thèmes associés"/>
				</GlobalColContainer>
			</GlobalRowContainer>
			<GlobalRowContainer>
				<GlobalColContainer>
					<Input
						textArea
						nativeTextAreaProps={{
							onChange: handleChange,
							style: {height: 300}
						}}
					/>
				</GlobalColContainer>
				<GlobalColContainer>
					<Input label="Administrations concernées"/>
				</GlobalColContainer>
			</GlobalRowContainer>
			<Button className="w-full flex justify-center fr-mt-3w" onClick={handleClick}>
				{meetingGenerationPage}
			</Button>
		</GlobalDiv>
	</GlobalRowContainer>
}