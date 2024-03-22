import archive from '../../icons/archives/archive.svg'

export const defaultButtonChoice = (choice) =>
  'Bouton de sélection de la question par défaut ${choice}'
export const notifyArchiving = (title) => (
  <>
    Cette conversation a été archivée{' '}
    <img src={archive} alt="Logo associé à l'archivage" /> comme {title}
  </>
)
export const redoUserQuestion = (
  <p className="streaming fr-p-3v fr-ml-3v">Voulez-vous archiver cette conversation ?</p>
)
export const defaultQuestions = [
  'Comment obtenir une carte famille nombreuse ?',
  "Quels sont les critères à remplir pour obtenir l'AAH ?",
]
export const robotAvatarDescription = 'Avatar du robot.'
export const userAvatarDescription = "Avatar de l'utilisateur / utilisatrice."
export const previousImgDescription =
  "Bouton d'accès au message précédent généré par le robot."
export const nextImgDescription = "Bouton d'accès au message suivant généré par le robot."
