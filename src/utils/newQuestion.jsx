import { NOT_SET } from "../constants/status";
import { usePost } from "./hooks";
import { getSheets } from "./setData";

export function postNewQuestion(dispatch, auth, question, isNewQuestion) {
    dispatch({ type: 'SET_INPUT_VISIBILITY', nextVisibility: 'hidden' });
	usePost(auth, question, dispatch);
	dispatch({ type: 'RESET_FEEDBACK'});
	getSheets(question, auth, dispatch);
	isNewQuestion !== 0 && dispatch({ type: 'SET_ARCHIVE_QUESTION', nextQuestion: question });
	isNewQuestion !== 0 && dispatch({ type: 'RESET_QUESTION_FIELDS' });
}

export function setNewQuestion(dispatch, newQuestion, agentResponse, isChat) {
    dispatch({ type: 'SET_USER_TEXT', nextUserText: newQuestion, nextIsChat: isChat });
	agentResponse.length && dispatch({ type: 'SET_MESSAGES', nextMessage: { text: agentResponse, sender: 'agent' } });
    dispatch({ type: 'RESET_STREAM_HISTORY' });
	dispatch({ type: 'RESET_USER_CHOICES' });
	dispatch({ type: 'RESET_RESSOURCE'});
	dispatch({ type: 'SET_MESSAGES', nextMessage: { text: newQuestion, sender: 'user' } });
}