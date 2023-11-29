import { useDispatch } from "react-redux";
import { MeetingPage } from "../components/Meeting/MeetingPage";
import { MeetingSettings } from "../components/Meeting/MeetingSettings";
import { useEffect, useState } from "react";

export function	Meeting() {
	const	[generate, setGenerate] = useState(false);
	const	[currQuestion, setCurrQuestion] = useState('');
	const	dispatch = useDispatch();
	const	[context, setContext] = useState({
		administrations: [],
		themes: [],
	});
	
	useEffect(() => { dispatch({ type: 'SET_INITIAL_STREAM' }) }, []);
	
	return <>
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
			/>
		}
	</>
}