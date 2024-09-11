export const satisfiedButtons = [
  { text: 'Clair ', type: 'clear' },
  { text: 'Synthétique ', type: 'concise' },
  { text: 'Sources fiables', type: 'reliable_sources' },
] as const

export const unsatisfiedButtons = [
  { text: 'Les éléments sont faux', type: 'hallucinations' },
  { text: 'Manque de sources', type: 'lack_of_sources' },
  { text: 'Trop long', type: 'too_long' },
  { text: 'Incohérent ', type: 'inconsistent' },
  { text: 'Imprécis', type: 'imprecise' },
  { text: 'Fautes de grammaire', type: 'grammar_errors' },
] as const

export const thankFeedback =
  'Merci pour votre retour ! Il permettra d’améliorer les futurs résultats.'
export const feedbackButtonsChoice = (button) =>
  `Bouton permettant de sélectionner le retour d'expérience "${button}".`
export const feedbackConfirmationButton = `Bouton de confirmation des retours d'expérience de la conversation.`
export const feedbackResume = `Résumé des retours d'expérience.`
const satisfactionButton = (type) =>
  `Bouton pour indiquer que la réponse générée est ${type}`
export const thankFeedbackRole = `Message de remerciement pour le retour d'expérience.`
