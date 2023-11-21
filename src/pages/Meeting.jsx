import { MeetingPage } from "../components/Meeting/MeetingPage";
import { MeetingSettings } from "../components/Meeting/MeetingSettings";
import { useState } from "react";

export function	Meeting() {
	const	[generate, setGenerate] = useState(false);
	
	return <>
		{!generate ?
			<MeetingSettings setGenerate={setGenerate}/>
			:
			<MeetingPage />
		}
	</>
}