import evaluate from "../../icons/usertools/evaluate.svg"
import redo from "../../icons/usertools/redo.svg"
import bookmark from "../../icons/usertools/bookmark.svg"
import copy from "../../icons/usertools/copy.svg"

export const	chatbotProps = {
	mainTitle: "Chatbot administratif",
	subtitle: "Ce chat vous permet de trouver des informations de premier niveau à des questions de nature administrative que vous vous posez.",
}

export const	userChatToolsProps = [
	{
		image: evaluate,
		alt: "Evaluer la réponse",
		title: "Evaluer la réponse",
	},
	{
		image: redo,
		alt: "Re-générer la réponse",
		title: "Re-générer la réponse",
	},
	{
		image: bookmark,
		alt: "Enregistrer la réponse",
		title: "Enregistrer la réponse",
	},
	{
		image: copy,
		alt: "Copier la réponse",
		title: "Copier la réponse",
	},
]