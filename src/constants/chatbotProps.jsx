import evaluate from "../../icons/usertools/evaluate.svg"
import redo from "../../icons/usertools/redo.svg"
import bookmark from "../../icons/usertools/bookmark.svg"
import copy from "../../icons/usertools/copy.svg"
import { usePost } from "../utils/hooks";

export const	chatbotProps = {
	mainTitle: "Chatbot administratif",
	subtitle: "Ce chat vous permet de trouver des informations de premier niveau à des questions de nature administrative que vous vous posez.",
}

function handleEvaluate(state, dispatch) {

	return alert('evaluate');
}

async function handleRedo(state, dispatch) {
	usePost(state, dispatch);

	return dispatch({ type: 'REDO_AGENT_STREAM' });
}

function handleSaved(state, dispatch) {

	return alert('saved');
}

function handleCopy(state, dispatch) {
	const	joinedRes = state.response.join('')

	return navigator.clipboard.writeText(joinedRes);
}

export const	userChatToolsProps = [
	{
		image: evaluate,
		alt: "Evaluer la réponse",
		title: "Evaluer la réponse",
		onClick: handleEvaluate,
	},
	{
		image: redo,
		alt: "Re-générer la réponse",
		title: "Re-générer la réponse",
		onClick: handleRedo,
	},
	{
		image: bookmark,
		alt: "Enregistrer la réponse",
		title: "Enregistrer la réponse",
		onClick: handleSaved,
	},
	{
		image: copy,
		alt: "Copier la réponse",
		title: "Copier la réponse",
		onClick: handleCopy,
	},
]