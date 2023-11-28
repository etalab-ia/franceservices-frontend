import Button from "@codegouvfr/react-dsfr/Button";
import { meetingGenerationPage } from "../../constants/meeting";
import { useDispatch, useSelector } from "react-redux";
import { usePost } from "../../utils/hooks";
import { useEffect } from "react";
import { setQuestionWithContext } from "../../utils/setData";

export function MeetingButton({ isDisable, currQuestion, setGenerate, context }) {
	const	dispatch = useDispatch();
    const   auth = useSelector((state) => state.auth);
    const   user = useSelector((state) => state.user);

    const	handleClick = () => {
        const   questionWithContext = setQuestionWithContext(currQuestion, context);

        dispatch({ type: 'SET_USER_TEXT', nextUserText: questionWithContext, nextIsChat: false });
    }

    useEffect(() => { dispatch({ type: 'RESET_QUESTION_FIELDS' }) }, []);

    useEffect(() => {
        if (!user.question.user_text.length)
            return ;
        usePost(auth, user.question, dispatch);
        setGenerate(true);
        dispatch({ type: 'RESET_QUESTION_FIELDS' });
    }, [user.question])

    return <Button
        className="w-full flex justify-center fr-mt-3w"
        onClick={handleClick}
        disabled={isDisable}
    >
        {meetingGenerationPage}
    </Button>
}