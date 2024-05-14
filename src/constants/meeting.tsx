import thumbsDown from '../../icons/feedbacks/thumbsDown.svg'
import thumbsUp from '../../icons/feedbacks/thumbsUp.svg'
import { GlobalRowContainer } from '../components/Global/GlobalRowContainer'

export const meetingTitle = 'Échanger avec Albert'
export const meetingSubtitle = 'Description de la situation de l’usager'
export const meetingInputGuidelines = (
  <>
    <p className="fr-text-mention--grey fr-text--xs ">
      Quelques bonnes pratiques pour décrire la situation d’un usager
    </p>
    <div className="  flex">
      <span
        className="fr-icon-info-fill fr-icon--sm fr-text-default--info fr-mr-2v"
        aria-hidden="true"
      ></span>
      <p className="fr-text-default--info fr-text--xs" style={{ margin: 0 }}>
        Utiliser des termes précis (eg. parler de « formulaire cerfa » au lieu de «
        demande papier »)
      </p>
    </div>
    <div className="  flex ">
      <span
        className="fr-icon-info-fill fr-icon--sm fr-text-default--info fr-mr-2v"
        aria-hidden="true"
      ></span>
      <p className="fr-text-default--info fr-text--xs" style={{ margin: 0 }}>
        Formuler une question à la fin de la description pour orienter la recherche
        d’Albert.
      </p>
    </div>
    <div className="flex justify-center">
      <span
        className="fr-icon-info-fill fr-icon--sm fr-text-default--info fr-mr-2v"
        aria-hidden="true"
      ></span>
      <p className="fr-text-default--info fr-text--xs" style={{ margin: 0 }}>
        Éviter d’indiquer des informations personnelles, notamment celles trouvées sur un
        compte administratif de l’usager.
      </p>
    </div>
    <div className="flex ">
      <span
        className="fr-icon-info-fill fr-icon--sm fr-text-default--info fr-mr-2v"
        aria-hidden="true"
      ></span>
      <p className="fr-text-default--info fr-text--xs">
        Éviter d’utiliser seulement des mots clés pour décrire la situation de l’usager.
      </p>
    </div>
  </>
)

export const meetingPromptExamples = [
  {
    img: thumbsUp,
    alt: "Pouce en l'air",
    title: (
      <p
        className=" fr-text-default--info fr-text-default--info fr-text--xs"
        style={{ margin: '0' }}
      >
        Exemple de bonne description
      </p>
    ),
    description: (
      <p className="fr-text-mention--grey fr-text--xs">
        L'usagère ne comprend pas son allocation RSA ait diminué.
        <br className="fr-my-1w" />
        Après étude de son compte, il semble que la CAF opère une retenue sur son
        allocation.
        <br className="fr-mb-1w" />
        La CAF peut-elle faire une saisie sur le RSA et sous quelles conditions ?
      </p>
    ),
  },
  {
    img: thumbsDown,
    alt: 'Pouce vers le bas',
    title: (
      <p
        className=" fr-text-default--info fr-text-default--info fr-text--xs"
        style={{ margin: '0' }}
      >
        Exemple de mauvaise description
      </p>
    ),
    description: (
      <p className="fr-text-mention--grey fr-text--xs">
        [Monsieur Durant] ne comprend pas que son allocation RSA ait diminué.
        <br className="fr-my-1w" />
        Après avoir saisi ses [identifiants n°XXX mot de passe XXX], il semble que la CAF
        opère une retenue sur son allocation.
        <br className="fr-mb-1w" />
        [Pas de question de fin]
      </p>
    ),
  },
]

export const meetingContextualInfosTitle = 'Informations contextuelles'
export const meetingGenerateButton = 'Échanger avec Albert'
export const meetingAppointmentInformations =
  'Votre question sur la situation de l’usager'
export const meetingAppointmentTitle = 'Échanger avec Albert'

export const meetingDefaultQuestionsIntroduction = (
  <GlobalRowContainer>
    <h6 className="text-xl font-bold text-[##3A3A3A]">Tester Albert</h6>
    <p className="text-[##3A3A3A] fr-mt-3v fr-mb-1v">
      Ceci est votre première utilisation d’Albert et vous souhaitez comprendre simplement
      son fonctionnement ? Nous vous avons préparé deux scénarios de tests pour cela. Il
      suffit de cliquer sur l’une des options ci-dessous.
    </p>
  </GlobalRowContainer>
)

export const defaultInputFields = [
  {
    title: 'Comprendre une saisie RSA par la CAF',
    question:
      'Une usagère ne comprend par le montant d’allocations sociales qu’elle touche ce mois-ci. En effet, le montant a été divisé par deux par rapport aux mois précédents et elle n’a plus que 150€. Elle cherche à comprendre pourquoi le montant a ainsi diminué.\n\nAprès avoir consulté le compte CAF de l’usagère avec son accord, il semble que la CAF opère une retenue sur le montant du RSA allouée à l’usagère suite à une déclaration erronée par le passé.\n\nLa CAF peut-elle faire une saisie sur le RSA et sous quelles conditions ? Comment débloquer la situation ?',
    themes: ['Allocation sociale', 'RSA'],
    administrations: ['CAF'],
  },
]

export const resultMeetingTitle = 'Réponse proposée par Albert'
export const MeetingRelatedQuestionsTitle =
  'Des questions posées fréquemment pour des situations similaires :'
