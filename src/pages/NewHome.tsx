import { useGetChatArchiveById, useGetChats } from '@api'
import { MFStoolsTiles, generalistRessourcesTiles } from '@constants/inputFields'
import { isMFSContext } from '@utils/context/isMFSContext'
import { GlobalParagraph } from 'components/Global/GlobalParagraph'
import Separator from 'components/Global/Separator'
import Button from '@codegouvfr/react-dsfr/Button'

import {
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'
import { useInView } from 'react-intersection-observer'
import { useNavigate } from 'react-router-dom'
import ShowError from 'components/Error/ShowError'
import { TextWithSources } from 'components/Sources/TextWithSources'

export function NewHome() {
  return (
    <div className="fr-container fr-mb-12w flex flex-col gap-4">
      <TextWithSources text={testText} />
      <HomeHeader />
      <ChatList />
    </div>
  )
}

const testText = `Pour obtenir la caf, il est possible de solliciter un prêt à l'amélioration
 de l'habitat si vous êtes propriétaire ou locataire et que vous réalisez des travaux
  dans votre résidence principale. Selon la Caisse d'Allocations Familiales (Caf) 
  <ref title="Prêts à l'amélioration de l'habitat de la Caf" text="Votre caisse d'allocations familiales 
  (Caf) peut vous accorder un prêt à l'amélioration de l'habitat pour faire des travaux 
  (rénovation, isolation...) dans votre résidence principale. Ce prêt est également accordé
   si vous êtes assistante maternelle (assistant maternel) et que vous gardez des enfants à
    votre domicile." >[https://www.service-public.fr/particuliers/vosdroits/F1616]</ref>, 
    vous pouvez vous adresser à votre Caf pour demander ce prêt.
    ref2: <ref title="Un salarié peut-il faire plusieurs périodes d'essai chez le même employeur ?" 
    text="La période d'essai d'un CDD n'est pas renouvelable." >https://www.service-public.fr/particuliers/vosdroits/F13919</ref> `

function HomeHeader() {
  const navigate = useNavigate()
  const isMFS = useContext(isMFSContext)

  const handleNewQuestion = () => {
    if (isMFS) {
      navigate('/meeting')
    } else navigate('/chat')
  }
  return (
    <div className="fr-mt-5w">
      <div className="fr-grid-row">
        <h3 className="fr-text-title--blue-france">Mes échanges</h3>
        <Button onClick={handleNewQuestion} className="ml-auto" iconId="fr-icon-add-line">
          Poser une nouvelle question
        </Button>
      </div>
    </div>
  )
}
function ChatList() {
  const { ref, inView } = useInView()
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null)
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error } = useGetChats()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  if (error) {
    console.log(error)
    return <ShowError message={error.message} errorNumber={error.status} />
  }

  //const chats = data?.pages.flatMap((page) => page.chats) ?? [] TODO: remove when back fixed skip argument
  const chats = [
    {
      name: 'Allocations sociales: la CAD peut-elle faire une saisie sur le RSA ?',
      numberOfMessages: 3,
      themes: ['Allocation sociale', 'RSA', 'CAF', 'Aides financieres'],
      updatedDate: '2024-06-04T09:41:16.446431',
      id: 1255,
    },
    {
      name: 'Allocations sociales: la CAD peut-elle faire une saisie sur le RSA ?',
      numberOfMessages: 3,
      themes: ['Allocation sociale', 'RSA', 'CAF', 'Aides financieres'],
      updatedDate: '2024-08-04T09:41:16.446431',
      id: 1256,
    },
    {
      name: 'Allocations sociales: la CAD peut-elle faire une saisie sur le RSA ?',
      numberOfMessages: 3,
      themes: ['Allocation sociale', 'RSA', 'CAF', 'Aides financieres'],
      updatedDate: '2024-08-04T09:41:16.446431',
      id: 1253,
    },
    {
      name: 'Allocations sociales: la CAD peut-elle faire une saisie sur le RSA ?',
      numberOfMessages: 3,
      themes: ['Allocation sociale', 'RSA', 'CAF', 'Aides financieres'],
      updatedDate: '2024-08-04T09:41:16.446431',
      id: 1254,
    },
  ]

  type TestChatType = {
    name: string
    numberOfMessages?: number
    themes?: string[]
    updatedDate: string | null
    id: number
  }

  return (
    <div className={`fr-mt-2w fr-grid-row w-full ${isMounted ? 'slideInLeft' : ''}`}>
      <div className="fr-col-6" style={{ height: '500px', overflowY: 'auto' }}>
        {chats.map((chat: TestChatType, index) => (
          <div key={index}>
            <ChatListRow
              selectedChatId={selectedChatId}
              setSelectedChatId={setSelectedChatId}
              {...chat}
            />
            <Separator />
          </div>
        ))}
        <div ref={ref} style={{ height: 1 }} />
        {isFetchingNextPage && <p>Loading more...</p>}
      </div>
      <div className="fr-col-6">
        {selectedChatId && <QuestionsSidePanel selectedChatId={selectedChatId} />}
      </div>
    </div>
  )
}

function QuestionsSidePanel({ selectedChatId }: { selectedChatId: number }) {
  return (
    <div className="fr-pl-3w">
      <div className="flex flex-wrap justify-between items-center">
        <h6>Les questions de cet échange</h6>
        <button type="button" className="mt-2 sm:mt-0">
          <span className="fr-icon-arrow-right-line fr-text-action-high--blue-france">
            Accéder à cet échange
          </span>
        </button>
      </div>
      <QuestionList selectedChatId={selectedChatId} />
    </div>
  )
}

function QuestionList({ selectedChatId }: { selectedChatId: number }) {
  const { data: archive, error } = useGetChatArchiveById(selectedChatId)

  if (error) {
    console.log(error)
  }

  if (!archive) {
    return null
  }
  return (
    <>
      {archive.streams.map((stream, index) => (
        <div className="fr-mb-1v" key={index}>
          <button
            type="button"
            className="fr-mb-1w w-full"
            key={index}
            onClick={() => {}}
          >
            <div className="fr-px-2w fr-py-3v inline-flex h-full w-full rounded bg-[#F5F5FE]">
              {stream.query}
            </div>
          </button>
        </div>
      ))}
    </>
  )
}

function ChatListRow({
  name,
  numberOfMessages,
  themes,
  updatedDate,
  selectedChatId,
  id,
  setSelectedChatId,
}: {
  name: string
  numberOfMessages?: number
  themes?: string[]
  updatedDate: string | null
  selectedChatId: number
  setSelectedChatId: Dispatch<SetStateAction<number | null>>
  id: number
}) {
  const dateFormatted = updatedDate
    ? new Date(updatedDate).toLocaleDateString('fr-FR')
    : null
  const today = new Date().toLocaleDateString('fr-FR')

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setSelectedChatId(id)
        }}
        tabIndex={0}
        className={`fr-grid-row fr-grid-row--center fr-py-2w w-full ${
          selectedChatId === id ? 'fr-background-action-low--blue-france' : ''
        } `}
      >
        <div className="fr-col-6 fr-px-1w">
          <p className={`${selectedChatId === id ? 'font-semibold' : ''}`}>{name}</p>
          <p>{dateFormatted === today ? 'Aujourd’hui' : dateFormatted}</p>
        </div>
        <div className="ml-auto fr-col-6 fr-px-1w">
          <div className="flex flex-wrap gap-2">
            <p
              className={`fr-tag fr-tag--sm fr-text-action-high--blue-france ${
                selectedChatId !== id
                  ? 'fr-background-action-low--blue-france'
                  : 'bg-white'
              }`}
            >
              {numberOfMessages} messages
            </p>
            {themes?.map((theme: string, index) => (
              <p
                key={index}
                className={`fr-tag fr-tag--sm fr-text-action-high--blue-france ${
                  selectedChatId !== id
                    ? 'fr-background-action-low--blue-france'
                    : 'bg-white'
                }`}
              >
                {theme}
              </p>
            ))}
          </div>
        </div>
      </button>
    </>
  )
}
