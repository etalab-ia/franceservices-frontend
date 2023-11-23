import Button from "@codegouvfr/react-dsfr/Button";
import { meetingGenerationPage } from "../../constants/meeting";
import { useDispatch, useSelector } from "react-redux";
import { usePost } from "../../utils/hooks";

export function MeetingButton({ isDisable, currQuestion, setGenerate }) {
	const	dispatch = useDispatch();
    const   auth = useSelector((state) => state.auth);
    const   user = useSelector((state) => state.user);

    const	handleClick = () => {
        dispatch({ type: 'SET_USER_TEXT', nextUserText: currQuestion, nextIsChat: false });
        usePost(auth, user.question, dispatch);
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