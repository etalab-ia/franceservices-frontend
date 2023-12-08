import { MeetingPage } from "../components/Meeting/MeetingPage";
import { MeetingSettings } from "../components/Meeting/MeetingSettings";
import { useEffect, useState } from "react";
import { emitCloseStream } from "../utils/eventsEmitter";

export function	Meeting() {
	const	[generate, setGenerate] = useState(false);
	const	[currQuestion, setCurrQuestion] = useState('');
	const	[context, setContext] = useState({
		administrations: [],
		themes: [],
	});
	
	useEffect(() => {
		!generate && emitCloseStream(false);
	}, [generate])
	
	return (
		<>
			{!generate ?
				<MeetingSettings
					setGenerate={setGenerate}
					currQuestion={currQuestion}
					setCurrQuestion={setCurrQuestion}
					context={context}
					setContext={setContext}
				/>
				:
				<MeetingPage
					currQuestion={currQuestion}
					setGenerate={setGenerate}
					archive={false}
				/>
			}
		</>
	);
}