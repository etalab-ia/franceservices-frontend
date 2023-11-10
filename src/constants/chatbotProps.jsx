import redo from "../../icons/usertools/redo.svg"
import copy from "../../icons/usertools/copy.svg"
import archive from "../../icons/archives/archive.svg";

export const		chatbotProps = {
	mainTitle: "Chatbot administratif",
	subtitle: "Ce chat vous permet de trouver des informations de premier niveau à des questions de nature administrative que vous vous posez.",
}

async function		handleRedo(state, dispatch) {
	const	{ stream, archive, feedback, user } = state;
	const	archiveIndex = archive.length - 1;
	const	streamIndex = stream.historyStream.length - 1;
	let		newLimit = stream.historyStream.length ? user.question.limit : archive[index].question.limit;
	let		newText = stream.historyStream.length ? stream.historyStream[streamIndex] : archive[archiveIndex].agentResponse;
	let		newMode = 'simple';
	
	if (feedback.reasons.includes('Trop long'))
	{
		newText = 'Résume ce texte : ' + newText;
	}
	else if (feedback.reasons.includes('Incohérent'))
	{
		newText = 'Reformule ce texte : ' + newText;
	}
	else if (feedback.reasons.includes('Manque de sources'))
	{
		newLimit = newLimit === 0 ? 5 : newLimit + 2;
		newText = archive[archiveIndex].question.query;
		newMode = 'rag';
	}
	else
		newText = archive[archiveIndex].question.query;
	// else if (feedback.reasons.includes('Les éléments sont faux'))
	// {
	// 		TODO: ask user to underline errors ?
	// }

	dispatch({ type: 'SET_USER_MODEL_NAME_CHOICE', nextModelName: 'albert-light', nextMode: newMode, nextLimit: newLimit });
	dispatch({ type: 'SET_USER_TEXT', nextUserText: newText });
	dispatch({ type: 'RESET_FEEDBACK' });

	return dispatch({ type: 'REDO_AGENT_STREAM' });
}

function			handleCopy(stream) {
	const	joinedRes = stream.response.join('')

	return navigator.clipboard.writeText(joinedRes);
}

export	function	userChatToolsFunc(state, dispatch, type) {

	const	userChatToolsProps = [
		{
			image: redo,
			alt: "Re-générer la réponse",
			title: "Re-générer la réponse",
			onClick: () => handleRedo(state, dispatch),
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
	<>Cette conversation a été archivée <img src={archive} alt="Logo associé à l'archivage"/> comme {title}</>
);