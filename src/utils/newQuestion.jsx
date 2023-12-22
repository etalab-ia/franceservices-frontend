import { usePost } from "./hooks";

export function	postNewQuestion(dispatch, auth, question, isNewQuestion) {
	usePost(auth, question, dispatch);
	dispatch({ type: 'RESET_FEEDBACK'});
	isNewQuestion !== 0 && dispatch({ type: 'RESET_QUESTION_FIELDS' });
}

export function setNewQuestion(dispatch, newQuestion, agentResponse) {
    dispatch({ type: 'SET_USER_QUERY', nextUserQuery: newQuestion });
	agentResponse.length && dispatch({ type: 'SET_MESSAGES', nextMessage: { text: agentResponse, sender: 'agent' } });
    dispatch({ type: 'RESET_STREAM_HISTORY' });
	dispatch({ type: 'RESET_USER_CHOICES' });
	dispatch({ type: 'SET_MESSAGES', nextMessage: { text: newQuestion, sender: 'user' } });
}