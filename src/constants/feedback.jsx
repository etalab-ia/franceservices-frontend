import thumbsUp from "../../icons/feedbacks/thumbsUp.svg";
import thumbsDown from "../../icons/feedbacks/thumbsDown.svg";
import equal from "../../icons/feedbacks/equal.svg";

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

export const	secondaryButtons = [
	{
		type: 'satisfaisant',
		img: thumbsUp,
		name: 'Meilleure',
	},
	{
		type: 'insatisfaisant',
		img: thumbsDown,
		name: 'Moins bonne',
	},
	{
		type: 'équivalent',
		img: equal,
		name: 'Equivalente',
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
export const	redoAskingQuality = `Cette réponse est-elle mieux ou moins bien ?`;
export const	askingQualityPrecisions = (type) => `Pour quelles raisons trouvez-vous ce résultat ${type} ?`;
export const	askingReasons = `Donner d’autres raisons, autant que vous le souhaitez.`;
export const	thankFeedback = `Merci pour votre retour ! Il permettra d’améliorer les futurs résultats.`;