import redo from "../../icons/usertools/redo.svg"
import copy from "../../icons/usertools/copy.svg"
import archive from "../../icons/archives/archive.svg";
import { usePost } from "../utils/hooks";

export const		chatbotProps = {
	mainTitle: "Chatbot administratif",
	subtitle: "Ce chat vous permet de trouver des informations de premier niveau à des questions de nature administrative que vous vous posez.",
}

async function		handleRedo(state, dispatch) {
	const	{ archive, feedback, auth, user } = state;
	const	archiveIndex = archive.length - 1;
	let		newLimit = archive[archiveIndex].question.limit;
	let		newText = archive[archiveIndex].agentResponse;
	let		newMode = feedback.reasons.length ? 'simple' : 'rag';

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
	{
		newText = user.originQuestion;
		newMode = 'rag';
	}
	// else if (feedback.reasons.includes('Les éléments sont faux'))
	// {
	// 		TODO: ask user to underline errors ?
	// }

	const question = {
		model_name: 'albert-light',
		mode: newMode,
		query: newText,
		limit: newLimit,
		user_text: newText,
		context: '',
		institution: '',
		links: '',
		temperature: 20,
	}

	// dispatch({ type: 'SET_USER_MODEL_NAME_CHOICE', nextModelName: 'albert-light', nextMode: newMode, nextLimit: newLimit });
	usePost(auth, question, dispatch);
	// dispatch({ type: 'SET_USER_TEXT', nextUserText: newText, nextIsChat: true });
	dispatch({ type: 'SET_ARCHIVE_LIMIT', nextLimit: newLimit });
	dispatch({ type: 'RESET_FEEDBACK' });

	return dispatch({ type: 'REDO_AGENT_STREAM' });
}

function			handleCopy(stream) {
	const	joinedRes = stream.historyStream[stream.historyStream.length - 1];

	return navigator.clipboard.writeText(joinedRes);
}

export	function	userChatToolsFunc(state, dispatch) {

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

	return userChatToolsProps;
}

export const	redoUserQuestion = `Voulez-vous archiver cette conversation ?`;

export const	notifyArchiving = (title) => (
	<>Cette conversation a été archivée <img src={archive} alt="Logo associé à l'archivage"/> comme {title}</>
);

export const	defaultButtonChoice = (choice) => `Bouton de sélection de la question par défaut ${choice}`;

export const	defaultQuestions = ["Comment obtenir une carte famille nombreuse ?", "Quels sont les critères à remplir pour obtenir l'AAH ?"];
export const	robotAvatarDescription = `Avatar du robot.`;
export const	userAvatarDescription = `Avatar de l'utilisateur / utilisatrice.`;
export const	previousImgDescription = `Bouton d'accès au message précédent généré par le robot.`;
export const	nextImgDescription = `Bouton d'accès au message suivant généré par le robot.`;
export const	initialChatbotMessage = [`Bonjour, je suis Albert, l'outil d’intelligence artificielle interministériel prêt à répondre à vos questions administratives. Quelle est votre question aujourd'hui ?

Notez que je suis toujours en plein développement, et ne demande qu'à m'améliorer !`];
