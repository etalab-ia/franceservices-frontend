import { Avatar } from './Avatar'

// User's message
export const DisplaySingleMessage = ({
  sender,
  text,
  isFirst,
}: {
  sender: 'user' | 'agent'
  text: string[]
  isFirst: boolean
}) => {
  const isUser = sender === 'user'
  const classNames = isFirst ? 'fr-mt-5w user-message w-full' : 'user-message w-full'

  return (
    <div className={`${classNames}`}>
      <div className="fr-col-1 hide-on-smallscreen" />
      <div className="fr-col fr-col-md-10 w-full">
        <p
          className={
            isUser
              ? 'fr-mb-4w fr-p-2w fr-background-action-low--blue-france text-wrap rounded'
              : 'agent-chat fr-mb-4w fr-p-2w text-wrap'
          }
          style={{
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            whiteSpace: 'pre-wrap',
          }}
        >
          {text}
        </p>
      </div>
      <div className="fr-col-1 fr-pl-2w hide-on-smallscreen">
        {isUser && <Avatar user={sender} />}
      </div>
    </div>
  )
}
