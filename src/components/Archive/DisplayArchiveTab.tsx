import { useGetChats } from '@api'
import ShowError from 'components/Error/ShowError'
import { useRef, useState } from 'react'
import { ArchiveList } from './ArchiveList'
import { DisplayArchive } from './DisplayArchive'

export function DisplayArchiveTabs() {
  const [archiveTab, setArchiveTab] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const { data: chats, isLoading, isError, error } = useGetChats()

  if (isLoading) return <div></div>
  if (isError || !chats || !chats.length)
    return (
      <ShowError
        errorNumber={error && error.cause.status}
        message={"Nous n'avons pas réussi a trouver vos archives."}
      />
    )

  return (
    <div className="fr-container">
      {archiveTab === null ? (
        <ArchiveList chatList={chats} setArchiveTab={setArchiveTab} />
      ) : (
        <DisplayArchive
          ref={ref}
          selectedChat={chats[archiveTab]}
          setArchiveTab={setArchiveTab}
        />
      )}
    </div>
  )
}
