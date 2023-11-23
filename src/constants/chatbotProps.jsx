import redo from "../../icons/usertools/redo.svg"
import copy from "../../icons/usertools/copy.svg"
import archive from "../../icons/archives/archive.svg";

export const		chatbotProps = {
	mainTitle: "Chatbot administratif",
	subtitle: "Ce chat vous permet de trouver des informations de premier niveau à des questions de nature administrative que vous vous posez.",
}

async function		handleRedo(state, dispatch) {
	const	{ archive, feedback } = state;
	const	archiveIndex = archive.length - 1;
	let		newLimit = archive[archiveIndex].question.limit;
	let		newText = archive[archiveIndex].agentResponse;
	let		newMode = 'simple';
	
	if (feedback.reasons.includes('Trop long'))
	{
		newText = 'Résume ce texte : ' + newText;
		newLimit = 5;
	}
	else if (feedback.reasons.includes('Incohérent'))
		newText = 'Reformule ce texte : ' + newText;
	else if (feedback.reasons.includes('Manque de sources'))
	{
		newLimit += 2;
		newMode = 'rag';
		if (feedback.reasons.includes('Trop long'))
			newText = 'Résume ce texte : ' + newText;
		else
			newText = archive[archiveIndex].question.query;
	}
	else
		newText = archive[archiveIndex].question.query;
	// else if (feedback.reasons.includes('Les éléments sont faux'))
	// {
	// 		TODO: ask user to underline errors ?
	// }

	dispatch({ type: 'SET_USER_MODEL_NAME_CHOICE', nextModelName: 'albert-light', nextMode: newMode, nextLimit: newLimit });
	dispatch({ type: 'SET_USER_TEXT', nextUserText: newText });
	dispatch({ type: 'SET_ARCHIVE_LIMIT', nextLimit: newLimit });
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
			name: "redo",
			image: redo,
			alt: "Re-générer la réponse",
			title: "Re-générer la réponse",
			onClick: () => handleRedo(state, dispatch),
		},
		{
			name: "copy",
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

export const	robotAvatarDescription = `Avatar du robot.`;
export const	userAvatarDescription = `Avatar de l'utilisateur / utilisatrice.`;
export const	previousImgDescription = `Bouton d'accès au message précédent généré par le robot.`;
export const	nextImgDescription = `Bouton d'accès au message suivant généré par le robot.`;

// TODO: improve bot messages
export const	initialEditorMessage = `Bonjour, je suis Albert, un outil d’intelligence artificielle dont le but est de vous aider à répondre à des avis SP+. Merci de renseigner l'avis auquel répondre :`;
export const	initialChatbotMessage = `Bonjour, je suis Albert, l'outil d’intelligence artificielle interministériel prêt à répondre à vos questions administratives. Quelle est votre question aujourd'hui?

Notez que je suis toujours en plein développement, et ne demande qu'à m'améliorer!`;
