import { useState } from "react";
import { inputFields } from "../../constants/meetingInputFields";
import { MeetingTags } from "./MeetingTags";
import { MeetingInput } from "./MeetingInput";

export function MeetingAdditionalInput() {
	const	[themes, setThemes] = useState([]);
	const	[administrations, setAdministrations] = useState([]);

	return <div className="fr-mt-2w">
		{inputFields.map((field, index) => {
			const	tags = field.name === "themes" ? themes : administrations;
			const	setTags = field.name === "themes" ? setThemes : setAdministrations;

			return <div className="fr-mb-3w" key={index}>
				<MeetingInput field={field}/>
				<MeetingTags tags={tags} setTags={setTags} field={field}/>
			</div>
		})}
	</div>
}