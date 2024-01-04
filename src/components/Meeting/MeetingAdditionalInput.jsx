import { inputFields } from "../../constants/meetingInputFields";
import { MeetingTags } from "./MeetingTags";
import { MeetingInput } from "./MeetingInput";
import { useEffect } from "react";

export function MeetingAdditionalInput({ context, setContext }) {
    const handleSetTag = (tag, fieldName) => {
        console.log("fieldname ", fieldName);
        if (fieldName === "administrations")
        {
            setContext((prevContext) =>  ({...prevContext, administrations: [...prevContext.administrations, tag]}));
            console.log("administration");
        }    
};
useEffect(() => {
    console.log(context);
}
, [context]);
return <div className="fr-mt-2w">
		{inputFields.map((field, index) => {
            
            const	tags = field.name === "themes" ? context.themes : context.administrations;
			return <div className="fr-mb-4w" key={index}>
				<MeetingInput
					field={field}
                    onTagSelect={(tag) => handleSetTag(tag,field.name)}
                    themes={context.themes}
                    administrations={context.administrations}
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
