import { usePost } from "./hooks";
import { getSheets } from "./setData";

export function postNewQuestion(dispatch, auth, question) {
    dispatch({ type: 'SET_INPUT_VISIBILITY', nextVisibility: 'hidden' });
	usePost(auth, question, dispatch);
	dispatch({ type: 'RESET_FEEDBACK'});
	getSheets(question, auth, dispatch);
	dispatch({ type: 'SET_ARCHIVE_QUESTION', nextQuestion: question });
	dispatch({ type: 'RESET_QUESTION_FIELDS' });
}

export function setNewQuestion(dispatch, newQuestion, agentResponse, choices) {
    dispatch({ type: 'SET_USER_TEXT', nextUserText: newQuestion });
	agentResponse.length && dispatch({ type: 'SET_MESSAGES', nextMessage: { text: agentResponse, sender: 'agent' } });
    dispatch({ type: 'RESET_STREAM_HISTORY' });
	dispatch({ type: 'SET_ARCHIVE_CHOICES', nextChoices: choices });
	dispatch({ type: 'RESET_USER_CHOICES' });
	dispatch({ type: 'SET_MESSAGES', nextMessage: { text: newQuestion, sender: 'user' } });
}