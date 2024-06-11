import { askingQuality, redoAskingQuality } from '@constants/feedback'
import type { Feedback as FeedbackType, RootState } from '@types'
import { useSelector } from 'react-redux'
import { Avatar } from '../Chat/Avatar'
import { GlobalRowContainer } from '../Global/GlobalRowContainer'
import { Feedback } from './Feedback'
const AskingResponseQuality = ({ tabsLen }) => {
  return (
    <div className="streaming fr-p-3v fr-ml-3v">
      <div>{tabsLen > 1 ? redoAskingQuality : askingQuality}</div>
    </div>
  )
}

export function UserExperience({
  feedback,
  setFeedback,
}: { feedback: FeedbackType; setFeedback: (feedback: FeedbackType) => void }) {
  const stream = useSelector((state: RootState) => state.stream)
  const tabsLen = stream.historyStream.length

  return (
    <>
      {stream.activeTab === tabsLen && (
        <div className="fr-mb-3w">
          <GlobalRowContainer>
            <div className="hide-on-smallscreen">
              <Avatar user="agent" />
            </div>
            <AskingResponseQuality tabsLen={tabsLen} />
          </GlobalRowContainer>
          <div className="flex justify-center">
            <div className="w-5/6">
              <Feedback feedback={feedback} setFeedback={setFeedback} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
