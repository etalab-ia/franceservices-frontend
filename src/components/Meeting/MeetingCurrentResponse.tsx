import type { RootState } from '@types'
import { GlobalColContainer } from 'components/Global/GlobalColContainer'
import { OneThirdScreenWidth } from 'components/Global/OneThirdScreenWidth'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { GlobalRowContainer } from '../Global/GlobalRowContainer'
import { MeetingAdditionalResponse } from './MeetingAdditionalResponse'
import { MeetingMainResponse } from './MeetingMainResponse'

/*
 *	Contains text response from the bot and additional informations like sheets and chunks, useful links
 */
export function MeetingCurrentResponse() {
  const user = useSelector((state: RootState) => state.user)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (ref.current === null) return
    ref.current.scrollIntoView({ behavior: 'smooth' })
  }, [user.messages])
  return (
    <>
      {user.question.query && (
        <>
          <h5 ref={ref} className="fr-mt-5w fr-mb-1w">
            {`Votre question ${user.history.length ? 'complémentaire' : ''}`}
          </h5>
          <div className="fr-mb-2w fr-background-alt--blue-france fr-p-2w flex min-h-12 items-center">
            <p>{user.question.query}</p>
          </div>
        </>
      )}

      <GlobalRowContainer extraClass="fr-grid-row--center">
        <MeetingMainResponse />
        {user.chatId !== 0 && <MeetingAdditionalResponse />}
        {!user.chatId && <MeetingFirstQuestionHelper />}
      </GlobalRowContainer>
    </>
  )
}

function MeetingFirstQuestionHelper() {
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
