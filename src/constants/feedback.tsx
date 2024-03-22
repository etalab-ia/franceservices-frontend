import equal from '../../icons/feedbacks/equal.svg'
import thumbsDown from '../../icons/feedbacks/thumbsDown.svg'
import thumbsUp from '../../icons/feedbacks/thumbsUp.svg'

export const primaryButtons = [
  {
    type: 'satisfaisant',
    img: thumbsUp,
    name: 'La réponse est pertinente',
  },
  {
    type: 'insatisfaisant',
    img: thumbsDown,
    name: "La réponse n'est pas pertinente",
  },
]

export const secondaryButtons = [
  {
    type: 'meilleure',
    img: thumbsUp,
    name: 'Meilleure',
  },
  {
    type: 'moins bonne',
    img: thumbsDown,
    name: 'Moins bonne',
  },
  {
    type: 'équivalente',
    img: equal,
    name: 'Equivalente',
  },
]

export const satisfiedButtons = [
  { 'Clair ': 'clear' },
  { 'Synthétique ': 'concise' },
  { 'Sources fiables': 'reliable_sources' },
  { 'Autre raison': 'other' },
] as const

export const unsatisfiedButtons = [
  { 'Les éléments sont faux': 'hallucinations' },
  { 'Manque de sources': 'lack_of_sources' },
  { 'Trop long': 'too_long' },
  { 'Incohérent ': 'inconsistent' },
  { Imprécis: 'imprecise' },
  { 'Fautes de grammaire': 'grammar_errors' },
  { 'Autre raison': 'other' },
] as const

export const askingQuality = `Quelle est la qualité de ce message ?`
export const redoAskingQuality = `Cette réponse est-elle mieux ou moins bien ?`
export const askingQualityPrecisions = (type) =>
  `Pour quelles raisons trouvez-vous ce résultat ${type} ?`
export const askingReasons = `Donnez-nous d’autres raisons, autant que vous le souhaitez.`
export const thankFeedback = `Merci pour votre retour ! Il permettra d’améliorer les futurs résultats.`
export const feedbackButtonsChoice = (button) =>
  `Bouton permettant de sélectionner le retour d'expérience "${button}".`
export const feedbackConfirmationButton = `Bouton de confirmation des retours d'expérience de la conversation.`
export const feedbackAdditionalInput = `Champ de saisie permettant de rajouter des retours d'expérience non proposés.`
export const feedbackResume = `Résumé des retours d'expérience.`
export const satisfactionButton = (type) =>
  `Bouton pour indiquer que la réponse générée est ${type}`
export const thankFeedbackRole = `Message de remerciement pour le retour d'expérience.`
