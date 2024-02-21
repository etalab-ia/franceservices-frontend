import { useSelector } from 'react-redux'
import { RootState } from 'types'
import { askingQuality, redoAskingQuality } from '../../constants/feedback'
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

export function UserExperience({ feedback, setFeedback }) {
  const stream = useSelector((state: RootState) => state.stream)
  const tabsLen = stream.historyStream.length

  return (
    <>
      {stream.activeTab === tabsLen && (
        <div>
          <GlobalRowContainer>
            <Avatar user="agent" />
            <AskingResponseQuality tabsLen={tabsLen} />
          </GlobalRowContainer>
          <Feedback />
        </div>
      )}
    </>
  )
}
