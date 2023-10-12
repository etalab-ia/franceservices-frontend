import thumbsUp from "../../icons/feedbacks/thumbsUp.svg";
import thumbsDown from "../../icons/feedbacks/thumbsDown.svg";

export const	primaryButtons = [
	{
		type: 'satisfaisant',
		img: thumbsUp,
		name: 'Bon',
	},
	{
		type: 'insatisfaisant',
		img: thumbsDown,
		name: 'Mauvais',
	}
]

export const	satisfiedButtons = [
	'Apporte un nouveau vocabulaire',
	'Clair',
	'Synthétique',
	'Argument n°x',
	'Argument n°y',
	'Autre raison'
]

export const	unsatisfiedButtons = [
	'Les éléments sont faux',
	'Trop long',
	'Incohérent',
	'Fautes de grammaire',
	'Argument n°y',
	'Autre raison'
]

export const	askingQuality = `Quelle est la qualité de ce message ?`;
export const	askingReason = (type) => `Pour quelles raisons trouvez-vous ce résultat ${type} ?`;
export const	thankFeedback = `Merci pour votre retour ! Il permettra d’améliorer les futurs résultats.`;