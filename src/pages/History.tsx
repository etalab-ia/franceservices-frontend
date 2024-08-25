import { useGetChatArchiveById, useGetChats } from '@api'
import Button from '@codegouvfr/react-dsfr/Button'
import Separator from 'components/Global/Separator'

import { fr } from '@codegouvfr/react-dsfr'
import ShowError from 'components/Error/ShowError'
import { LoadingSpinner } from 'components/LoadingSpinner'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useNavigate } from 'react-router-dom'

export function History() {
  return (
    <div className="fr-container fr-mb-12w flex flex-col gap-4">
      <HomeHeader />
      <ChatList />
    </div>
  )
}

function HomeHeader() {
  const navigate = useNavigate()

  const handleNewQuestion = () => {
    navigate('/meeting')
  }
  return (
    <div className="fr-mt-5w ">
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

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  if (error) {
    console.log(error)
    return <ShowError message={error.message} errorNumber={error.status} />
  }

  const chats = data?.pages.flatMap((page) => page.chats) ?? []
  type TestChatType = {
    name: string
    numberOfMessages?: number
    themes?: string[]
    updatedDate: string | null
    id: number
  }

  return (
    <div className={'fr-mt-2w fr-grid-row w-full'}>
      <div className="fr-col-6 overflow-y-auto h-[66vh]">
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
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
      <div className="fr-col-6">
        {selectedChatId && <QuestionsSidePanel selectedChatId={selectedChatId} />}
      </div>
    </div>
  )
}

function QuestionsSidePanel({ selectedChatId }: { selectedChatId: number }) {
  const navigate = useNavigate()

  const handleButtonClick = () => {
    navigate(`/meeting/${selectedChatId}`)
  }
  return (
    <div className="fr-pl-3w fade-in-left">
      <div className="flex flex-wrap justify-between items-center fr-mb-2w">
        <h6>Les questions de cet échange</h6>
        <button type="button" className="mt-2 sm:mt-0" onClick={handleButtonClick}>
          <span className="fr-icon-arrow-right-line fr-text-action-high--blue-france">
            Accéder à cet échange
          </span>
        </button>
      </div>
      <QuestionList selectedChatId={selectedChatId} />
    </div>
  )
}

function QuestionList({ selectedChatId }) {
  const { data: archive, error } = useGetChatArchiveById(selectedChatId)
  if (error) {
    console.log(error)
  }

  if (!archive || !archive.streams) {
    return null
  }

  return (
    <>
      {archive.streams.map((stream, index) => (
        <div
          key={index}
          className="fr-mb-1v fade-in-left"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="fr-mb-1w w-full">
            <div
              style={{
                backgroundColor: fr.colors.decisions.background.alt.blueFrance.default,
              }}
              className="fr-px-2w fr-py-3v inline-flex h-full w-full rounded"
            >
              <p className="block overflow-hidden text-ellipsis whitespace-nowrap">
                {stream.query}
              </p>
            </div>
          </div>
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
        className={`fr-grid-row fr-grid-row--center text-left fr-py-1w w-full ${
          selectedChatId === id ? 'fr-background-action-low--blue-france' : ''
        } `}
      >
        <div className="fr-col-6 fr-px-1w">
          <p className={`${selectedChatId === id ? 'font-semibold' : ''}`}>{name}</p>
          <p>{dateFormatted === today ? 'Aujourd’hui' : dateFormatted}</p>
        </div>
        {/*         <div className="ml-auto fr-col-6 fr-px-1w">
          <div className="flex flex-wrap gap-2">
            <p
              className={`fr-tag fr-tag--sm fr-text-action-high--blue-france ${
                selectedChatId !== id
                  ? 'fr-background-action-low--blue-france'
                  : 'bg-white'
              }`}
            >
              {numberOfMessages} message{numberOfMessages > 1 ? 's' : ''}
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
        </div> */}
      </button>
    </>
  )
}
