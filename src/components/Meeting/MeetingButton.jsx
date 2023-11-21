import Button from "@codegouvfr/react-dsfr/Button";
import { meetingGenerationPage } from "../../constants/meeting";
import { useDispatch, useSelector } from "react-redux";
import { setNewQuestion } from "../../utils/newQuestion";

export function MeetingButton({ isDisable, currQuestion, setGenerate }) {
	const	dispatch = useDispatch();
	const	stream = useSelector((state) => state.stream);

    const	handleClick = () => {
        setNewQuestion(dispatch, currQuestion, stream.historyStream, false);
        setGenerate(true);
    }

    return <Button
        className="w-full flex justify-center fr-mt-3w"
        onClick={handleClick}
        disabled={isDisable}
    >
        {meetingGenerationPage}
    </Button>
}