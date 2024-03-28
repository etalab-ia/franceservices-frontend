import { archiveNotificationRole } from '@constants/archive'
import { notifyArchiving } from '@constants/chatbotProps'
import type { RootState } from '@types'
import { useSelector } from 'react-redux'

export function NotifyArchiving() {
  const user = useSelector((state: RootState) => state.user)
  const title =
    user.messages[user.messages.length - 1].text.length > 40
      ? user.messages[user.messages.length - 1].text.slice(0, 40) + '...'
      : user.messages[user.messages.length - 1].text

  return (
    <div role={archiveNotificationRole}>
      <div className="archive-notification-text fr-ml-7w fr-mb-2w">
        {notifyArchiving(`« ${title} »`)}
      </div>
    </div>
  )
}
