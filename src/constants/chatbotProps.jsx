import evaluate from "../../icons/usertools/evaluate.svg"
import redo from "../../icons/usertools/redo.svg"
import bookmark from "../../icons/usertools/bookmark.svg"
import copy from "../../icons/usertools/copy.svg"
import history from "../../icons/chatbotTabs/history.svg"
import { usePost } from "../utils/hooks";
import archive from "../../icons/archives/archive.svg";

export const		chatbotProps = {
	mainTitle: "Chatbot administratif",
	subtitle: "Ce chat vous permet de trouver des informations de premier niveau à des questions de nature administrative que vous vous posez.",
}

function			handleEvaluate() {
	return alert('evaluate');
}

async function		handleRedo(auth, user, dispatch) {
	usePost(auth, user, dispatch);

	return dispatch({ type: 'REDO_AGENT_STREAM' });
}

function			handleSaved() {
	return alert('saved');
}

function			handleCopy(stream) {
	const	joinedRes = stream.response.join('')

	return navigator.clipboard.writeText(joinedRes);
}

export	function	userChatToolsFunc(state, dispatch, type) {

	const	userChatToolsProps = [
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
			onClick: () => handleRedo(state.auth, state.user, dispatch),
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
			onClick: () => handleCopy(state.stream),
		},
	]
	const typeToButtonsMap = {
		default: [0, 1, 2, 3],
		quality: [1],
		sheets: [2],
	};

	const	visibleButtonIndices = typeToButtonsMap[type] || typeToButtonsMap.default;
	const	visibleButtonsProps = userChatToolsProps.filter((button, index) => visibleButtonIndices.includes(index));

	return visibleButtonsProps;
}

export const	redoUserQuestion = `Voulez-vous poser une nouvelle question ?`;
export const	notifyArchiving = (title) => (
	<p className="row-message ml-[114px] flex justify-center text-[#929292]">Cette conversation a été archivée <img src={archive} alt="Logo associé à l'archivage"/> comme {title}</p>
);