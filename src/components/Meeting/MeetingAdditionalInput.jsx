import { inputFields } from "../../constants/meetingInputFields";
import { MeetingTags } from "./MeetingTags";
import { MeetingInput } from "./MeetingInput";

export function MeetingAdditionalInput({ context, setContext }) {
	return <div className="fr-mt-2w">
		{inputFields.map((field, index) => {
			const	tags = field.name === "themes" ? context.themes : context.administrations;

			return <div className="fr-mb-4w" key={index}>
				<MeetingInput
					field={field}
				/>
				<MeetingTags
					setContext={setContext}
					context={context}
					field={field}
					tags={tags}
				/>
			</div>
		})}
	</div>
}