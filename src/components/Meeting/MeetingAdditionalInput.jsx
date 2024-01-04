import { useEffect, useState } from "react";
import { inputFields } from "../../constants/meetingInputFields";
import { MeetingTags } from "./MeetingTags";
import { MeetingInput } from "./MeetingInput";

export function MeetingAdditionalInput({ context }) {
    const [themes, setThemes] = useState([]);
    const [administrations, setAdministrations] = useState([]);

    useEffect(() => {
        setThemes(context.themes);
        setAdministrations(context.administrations);
    }, [context]);

    const handleSetTag = (tag, fieldName) => {
        const updateState = fieldName === "themes" ? setThemes : setAdministrations;
        updateState(currentTags => [...currentTags, tag]);
    };

    return (
        <div className="fr-mt-2w">
            {inputFields.map((field, index) => (
                <div className="fr-mb-4w" key={index}>
                    <MeetingInput
                        field={field}
                        onTagSelect={handleSetTag}
                        themes={themes}
                        administrations={administrations}
                    />
                    <MeetingTags
                        tags={field.name === "themes" ? themes : administrations}
                        setTags={field.name === "themes" ? setThemes : setAdministrations}
                        field={field}
                    />
                </div>
            ))}
        </div>
    );
}
