import { GlobalColContainer } from 'components/Global/GlobalColContainer'
import { OneThirdScreenWidth } from 'components/Global/OneThirdScreenWidth'

export function FirstQuestionExample(setQuestionInput) {
  return (
    <>
      <h6>Première utilisation ?</h6>
      <p>Cliquez sur la question pour tester Albert</p>
      <button
        type="button"
        className="fr-mb-1w w-full"
        onClick={() => setQuestionInput('Peut-on faire une saisie sur le RSA ?')}
      >
        <div className="fr-px-2w fr-py-3v inline-flex h-full w-full rounded bg-[#F5F5FE]">
          Peut-on faire une saisie sur le RSA ?
        </div>
      </button>
    </>
  )
}
export function MeetingFirstQuestionHelper(setQuestionInput) {
  return (
    <OneThirdScreenWidth>
      <GlobalColContainer>
        <h5 className="fr-pb-2w">Conseils pour poser une question</h5>
        <h6 className="fr-text-md fr-pb-3v">À faire:</h6>
        {goodGuidelines.map((badge, index) => (
          <div
            key={badge.title}
            className={`${index !== goodGuidelines.length - 1 ? 'fr-mb-1w' : ''}`}
          >
            <QuestionsGuidelinesCard {...badge} />
          </div>
        ))}
        <h6 className="fr-text-md fr-pb-3v fr-pt-2w">À ne pas faire:</h6>
        {badGuidelines.map((badge, index) => (
          <div
            key={badge.title}
            className={`${index !== badGuidelines.length - 1 ? 'fr-mb-1w' : ''}`}
          >
            <QuestionsGuidelinesCard {...badge} />
          </div>
        ))}
        <FirstQuestionExample setQuestionInput={setQuestionInput} />
      </GlobalColContainer>
    </OneThirdScreenWidth>
  )
}

function QuestionsGuidelinesCard({
  title,
  description,
  good,
}: {
  title: string
  description?: string
  good: boolean
}) {
  const iconClass = good ? 'fr-icon-success-fill' : 'fr-icon-error-fill'

  return (
    <div
      className={`fr-grid-row fr-grid-row--middle   fr-badge--${
        good ? 'success' : 'error'
      } fr-p-1w rounded`}
    >
      <span className={`${iconClass} mr-2 fr-col-1 `} />

      <div className="fr-col-10 ">
        <strong>{title}</strong>
        <p className="italic ">{description}</p>
      </div>
    </div>
  )
}

const goodGuidelines = [
  {
    title: 'Utiliser des termes précis',
    description: 'Ex. "formulaire cerfa" au lieu de "demande papier"',
    good: true,
  },
  {
    title: 'Formuler une question',
    description:
      'Ex. "Quels sont les documents nécessaires pour renouveler une carte d\'identité ?"',
    good: true,
  },
  {
    title: 'Poser des questions seulements sur des thèmes traités en France Services',
    good: true,
  },
]

const badGuidelines = [
  {
    title: 'Entrer des informations personnelles',
    description: 'Ex. un nom et prénom, une date de naissance...',
    good: false,
  },
  {
    title: "N'utiliser que des mots clés",
    description: 'Ex. "carte d\'identité", "permis de conduire"',
    good: false,
  },
]
