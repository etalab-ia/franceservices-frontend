import { MeetingSettings } from "../components/Meeting/MeetingSettings";
import { useState } from "react";

export function	Meeting() {
	const	[generate, setGenerate] = useState(false);
	
	return <>
		{!generate ?
			<MeetingSettings setGenerate={setGenerate}/>
			:
			<div>coucou</div>
		}
	</>
}