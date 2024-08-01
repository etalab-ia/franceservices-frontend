import type { RootState } from '@types'
import { GlobalColContainer } from 'components/Global/GlobalColContainer'
import { OneThirdScreenWidth } from 'components/Global/OneThirdScreenWidth'
import { useSelector } from 'react-redux'

export function FirstQuestionExample({
  setQuestionInput,
}: { setQuestionInput: (question: string) => void }) {
  return (
    <div className="fr-mb-2w">
      <h6 style={{ lineHeight: 1 }} className="fr-mb-3v">
        Première utilisation ?
      </h6>
      <p className="fr-mb-3v">Cliquez sur la question pour tester Albert</p>
      <button
        type="button"
        className="fr-mb-1w "
        onClick={() => setQuestionInput('Peut-on faire une saisie sur le RSA ?')}
      >
        <div className="fr-px-2w fr-py-3v inline-flex h-full w-full rounded fr-background-alt--blue-france">
          Peut-on faire une saisie sur le RSA ?
        </div>
      </button>
    </div>
  )
}
export function MeetingFirstQuestionHelper(setQuestionInput) {
  return (
    <OneThirdScreenWidth>
      <GlobalColContainer>
        <h5 className="fr-mb-2w ">Conseils pour échanger avec Albert</h5>
        <p className=" font-bold fr-text-md fr-mb-3v">À faire:</p>
        {goodGuidelines.map((badge, index) => (
          <div
            key={badge.title}
            className={`${index !== goodGuidelines.length - 1 ? 'fr-mb-1w' : ''}`}
          >
            <QuestionsGuidelinesCard {...badge} />
          </div>
        ))}
        <p className=" font-bold fr-text-md fr-mb-3v fr-pt-2w">À ne pas faire:</p>
        {badGuidelines.map((badge, index) => (
          <div
            key={badge.title}
            className={`${index !== badGuidelines.length - 1 ? 'fr-mb-1w' : ''}`}
          >
            <QuestionsGuidelinesCard {...badge} />
          </div>
        ))}
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
      className={`fr-grid-row fr-grid-row--middle fr-badge--${
        good ? 'success' : 'error'
      } fr-p-1w rounded`}
    >
      <span className={`${iconClass} fr-mr-3v fr-col-1`} />

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
    title:
      'Poser des questions relevant uniquement des démarches incluses dans le bouquet de services national de France services',
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
