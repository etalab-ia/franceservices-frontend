import { GlobalDiv } from "../Global/GlobalDiv";
import { GlobalRowContainer } from "../Global/GlobalRowContainer";
import { useState } from "react";
import { MeetingInformations } from "./MeetingInformations";
import { MeetingButton } from "./MeetingButton";

export function	MeetingSettings({ setGenerate, currQuestion, setCurrQuestion }) {
	return <GlobalRowContainer>
		<GlobalDiv>
			<MeetingInformations
				setCurrQuestion={setCurrQuestion}
			/>
			<MeetingButton
				isDisable={currQuestion.length === 0}
				currQuestion={currQuestion}
				setGenerate={setGenerate}
			/>
		</GlobalDiv>
	</GlobalRowContainer>
}