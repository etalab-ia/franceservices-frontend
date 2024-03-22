import { Avatar } from './Avatar'

export const DisplaySingleMessage = ({ sender, text, isFirst }) => {
  const isUser = sender === 'user'
  const classNames = isUser
    ? isFirst
      ? 'fr-mt-5w user-message w-full'
      : `user-message w-full `
    : ''

  return (
    <div className={classNames}>
      <div className={`${isUser ? 'fr-mr-2w w-full' : 'fr-ml-2w'}`}>
        <p
          className={
            isUser
              ? 'rounded fr-mb-4w fr-p-2w fr-background-action-low--blue-france'
              : 'agent-chat fr-mb-4w fr-p-2w'
          }
        >
          {text}
        </p>
      </div>
      {isUser && <Avatar user={sender} />}
    </div>
  )
}
