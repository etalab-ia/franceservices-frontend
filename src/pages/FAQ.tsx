import { Accordion } from '@codegouvfr/react-dsfr/Accordion'
import { CallOut } from '@codegouvfr/react-dsfr/CallOut'
import { GlobalTitle } from '../components/Global/GlobalTitle'

export function FAQ() {
  return (
    <div className="fr-container fr-p-4w">
      <GlobalTitle>Aide</GlobalTitle>
      <p className="fr-pb-2w">Des réponses aux questions fréquemment posées sur Albert</p>
      <div className="flex accordion-container accordion">
        <div className="flex flex-col accordion">
          <h6 className="font-bold text-2xl fr-pb-2w">{faq.albertInfo.categoryName}</h6>
          {faq.albertInfo.questions.map((question, index) => (
            <Accordion key={index} label={question.label}>
              {question.content}
            </Accordion>
          ))}
          <CallOut className="fr-mt-3w">
            <>
              Pour plus d’informations, des supports de formation sont disponibles sur le{' '}
              <a href="https://osmose.numerique.gouv.fr" target="_blank" rel="noreferrer">
                groupe Osmose
              </a>{' '}
              dédié à l’expérimentation.
            </>
          </CallOut>
        </div>
        <div className="flex flex-col accordion">
          <h6 className="font-bold text-2xl fr-pb-2w">{faq.albertUsage.categoryName}</h6>
          {faq.albertUsage.questions.map((question, index) => (
            <Accordion key={index} label={question.label}>
              {question.content}
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  )
}

const faq = {
  albertInfo: {
    categoryName: 'Informations concernant le modèle Albert France services',
    questions: [
      {
        label: 'Qu’est-ce qu’Albert ?',
        content:
          'Albert est un outil d’aide à la recherche d’information développé par la Direction Interministérielle du Numérique (DINUM). Il repose sur Llama2-chat, un grand modèle de langue ouvert et développé par Meta.',
      },
      {
        label: 'A quel usage est destiné Albert ?',
        content:
          'Albert a été conçu pour aider les conseillers et conseillères France services à trouver des informations administratives pertinentes pour une situation ou question donnée. Pour le moment, seuls les conseillères et conseillers participant à l’expérimentation y ont accès. Les autres structures ne peuvent pas utiliser l’outil en phase de test. ',
      },
      {
        label: 'Sur quelles ressources documentaires a été entraîné Albert ?',
        content: (
          <div>
            <p>
              Trois bases de connaissances ont été mobilisées pour entraîner (fine-tuning)
              Albert :
            </p>
            <ul>
              <li>&bull; service-public.fr ;</li>
              <li>&bull; code.travail.gouv.fr ;</li>
              <li>&bull; les supports de formation France services.</li>
            </ul>
            <p>
              Llama2-chat, le grand modèle de langue initial sur lequel repose Albert, a
              été pré-entraîné sur des sources d’information publiquement accessibles.
            </p>
          </div>
        ),
      },
      {
        label: 'Des mises à jour régulières sont-elles prévues dans la base de données ?',
        content:
          "Les bases de données sont très régulièrement mises à jour. Par exemple, les nouvelles fiches publiées sur le site service-public.fr sont intégrées en moins d'une semaine au modèle.",
      },
      {
        label: 'Comment fonctionne Albert ?',
        content:
          'Albert analyse la situation ou question qu’on lui soumet puis identifie les informations probablement pertinentes qu’il « connaît » de par son entraînement. Il génère ensuite une synthèse écrite de ces sources d’information.',
      },
      {
        label: 'Comment est évalué Albert ?',
        content: (
          <div>
            <p>
              Les performances d’Albert sont régulièrement évaluées : à chaque nouvelle
              version de l’outil, Albert doit passer un QCM, établi sur le périmètre des
              France services. Ce QCM permet de donner une note au modèle, qui permet de
              suivre l’évolution des performances des différentes versions d’Albert.
            </p>
            <p style={{ paddingTop: 15 }}>
              De plus, des campagnes d’évaluation seront fréquemment menées avec les
              agents publics utilisant l’outil avant de comprendre précisément les forces
              et faiblesses d’Albert, et l’améliorer le modèle en conséquence.
            </p>
          </div>
        ),
      },
    ],
  },
  albertUsage: {
    categoryName: "Informations concernant l'utilisation d’Albert France services",
    questions: [
      {
        label: 'Comment me créer un compte pour accéder à Albert ?',
        content:
          'Le tutoriel “Comment se créer un compte” partagé sur Osmose vous guide dans la création de votre compte.',
      },
      {
        label: 'Comment utiliser Albert ?',
        content: (
          <div>
            <p className="fr-mb-3w">
              A partir de la page d’accueil, cliquer sur “Échanger avec Albert”. Sur cette
              page, vous êtes invité à décrire la situation de l’usager que vous recevez.
              Veillez à respecter les bonnes pratiques pour décrire la situation indiquée
              sous le champ associé. Vous pouvez également indiquer les thèmes associés à
              la situation et les opérateurs concernés.{' '}
            </p>
            <p className="fr-mb-3w">
              Une fois la situation de l’usager décrite, cliquez sur le bouton “générer la
              page rendez-vous” pour accéder aux informations répondant à la situation et
              votre question.
            </p>
            <p>
              Le tutoriel “Comment utiliser la fonction "Préparer un RDV” partagé sur
              Osmose vous guide pas à pas.
            </p>
          </div>
        ),
      },
      {
        label: 'Quelles sont les règles d’or d’utilisation d’Albert ?',
        content: (
          <div>
            <p className="fr-mb-3w">
              Les règles d’or sont disponibles dans la formation “Utiliser Albert dans son
              quotidien” disponible sur le groupe Osmose.
            </p>
            <p className="fr-mb-2w">Pour mémoire, éviter :</p>
            <ul>
              <li className="fr-mb-1w">
                &bull; D’utiliser de données personnelles : ces informations ne sont pas
                utiles pour permettre à Albert de vous apporter une réponse
              </li>
              <li className="fr-mb-1w">
                &bull; D’utiliser seulement des mots clés : Albert ne fonctionne pas comme
                un moteur de recherche plus traditionnel
              </li>
              <li>
                &bull; Préciser sa demande : Albert a besoin d’informations précises pour
                apporter une réponse pertinente
              </li>
              <li className="fr-mb-1w">
                &bull; Formuler une question : Albert a besoin que vous lui formuliez une
                question claire
              </li>
              <li className="fr-mb-1w">
                &bull; En tout temps, garder un esprit critique et croiser les sources
                d’information.
              </li>
            </ul>
          </div>
        ),
      },
      {
        label: 'Quelles informations sont remontées par Albert ?',
        content: (
          <div>
            <p>Albert vous donne accès à plusieurs types d’information :</p>
            <ul>
              <li>
                &bull; Résultat : une synthèse de différentes sources d’information
                probablement pertinentes par rapport à la situation que vous avez décrite.
              </li>
              <li>
                &bull; Sources du résultat : les sources d’information utilisées pour
                générer le résultat. Les textes apparaissant ici sont directement tirés
                des sources documentaires associées.
              </li>
              <li>
                &bull; Pour aller plus loin : les fiches service-public.fr les plus
                pertinentes par rapport à la situation que vous avez décrite.
              </li>
              <li>
                &bull; Liens pratiques : des liens vers des outils, simulateurs ou
                téléservices en lien avec la situation que vous avez décrite.
              </li>
              <li>
                &bull; Questions fréquentes : des questions fréquemment posées en lien
                avec la situation que vous avez décrite.
              </li>
            </ul>
          </div>
        ),
      },
      {
        label: 'Quel niveau de confiance accorder à Albert ?',
        content:
          'Albert fonctionne sur un modèle probabiliste pouvant inclure des erreurs ou hallucinations. Il est important de garder un œil critique et vérifier les informations via les sources utilisées et les fiches service-public.fr.',
      },
      {
        label: 'Comment vérifier les informations données par Albert ?',
        content:
          'Vérifier les informations en consultant les sources utilisées pour la réponse et les liens vers les fiches service-public.fr.',
      },
      {
        label: 'Comment faire des retours ou poser des questions sur Albert ?',
        content:
          'Faire des retours via les boutons de qualité sous les fiches rendez-vous ou via le formulaire de contact. Ces retours sont cruciaux pour améliorer Albert.',
      },
      {
        label: 'Comment personnaliser les informations sur une fiche rendez-vous ?',
        content:
          "Modifier la section 'Aller plus loin' en ajoutant ou supprimant des éléments. La personnalisation met à jour le résultat généré par Albert.",
      },
      {
        label: 'Comment accéder à des fiches rendez-vous déjà générées ?',
        content:
          "Accéder via 'Consulter mon historique' sur la page d’accueil, puis cliquer sur une ligne pour être redirigé vers la fiche correspondante.",
      },
      {
        label: 'Peut-on regénérer un résultat ?',
        content:
          "Si insatisfait, cliquer sur 'pouce vers le bas' sous le résultat pour demander un nouveau résultat. Modifier la section 'Aller plus loin' peut aussi entraîner la régénération d'un résultat.",
      },
      {
        label: 'Que faire si un bug/incident est identifié sur Albert ?',
        content:
          'Signaler les bugs via le formulaire de contact. Les bugs critiques sont corrigés sous 24 heures.',
      },
      {
        label:
          'Quelles sont les données collectées par Albert et comment sont-elles utilisées ?',
        content: (
          <div>
            <p className="fr-mb-1w">Albert collecte plusieurs types de données :</p>
            <ul className="fr-mb-3w">
              <li>
                &bull; Des données documentaires servant à l’entraînement d’Albert. Elles
                comprennent des données officielles que sont les fiches service-public.fr,
                les fiches travail-emploi, et la documentation France services.
              </li>
              <li>&bull; Des données d’utilisation :</li>
              <ul>
                <li>
                  &bull; Les fiches rendez-vous déjà générées sont conservées sur le
                  compte où elles ont été saisies afin de pouvoir être retrouvées
                  facilement par l’agent qui les a préparées,
                </li>
                <li>
                  &bull; Les questions saisies dans l’outil, à des fins d’archivage par
                  l’agent et d’amélioration des performances de l’outil via un
                  réentraînement.
                </li>
                <li>
                  &bull; Les retours “Positif/Négatif” que vous saisissez sont conservés
                  dans les serveurs de l’outil afin de pouvoir l’améliorer.
                </li>
              </ul>
            </ul>
            <p className="fr-mb-3w">
              Albert collecte-t-il les données personnelles des usagers reçus par les
              France services ?
            </p>
            <p className="fr-mb-3w">
              La seule façon dont des données personnelles d’usagers reçus par les France
              services peuvent être collectées par Albert est si elles sont entrées dans
              le champ de description de la situation de l’usager.
            </p>
            <p className="fr-mb-3w">
              A ce titre, il est fortement déconseillé d’utiliser des données personnelles
              pour décrire la situation de l’usager. Celles-ci ne sont en effet pas utiles
              pour le fonctionnement et l’efficacité d’Albert. Par exemple, si une
              allocation familiale requiert une condition d’âge (eg. avoir plus de 25 ans)
              pour y avoir accès, il est plus judicieux d’indiquer dans la description que
              la personne a plus de 25 ans plutôt que sa date de naissance précise.
            </p>
            <p className="fr-mb-3w">Qui est responsable de l’utilisation des données ?</p>
            <p>
              La Direction Interministérielle du Numérique (DINUM) est l’organisme
              responsable des traitements de données associés à Albert.
            </p>
          </div>
        ),
      },
    ],
  },
}
