import { feedbackUrl } from '@api'
import { thankFeedback } from '@constants/feedback'
import type { RootState } from '@types'
import { useFetch } from '@utils/hooks'
import { setHeaders } from '@utils/setData'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import thumbsDown from '../../../icons/feedbacks/thumbsDown.svg'
import { GlobalParagraph } from '../Global/GlobalParagraph'

/*
 * User can select thumps up / down to give feedback
 */
export const MeetingFeedback = () => {
  const streamId = useSelector((state: RootState) => state.user.streamId)
  const [isClicked, setIsClicked] = useState<boolean | null>(null)

  const handleClick = (isGood: boolean | null) => {
    const data = {
      is_good: isGood,
      message: '',
    }
    useFetch(`${feedbackUrl}/${streamId}`, 'POST', {
      data: JSON.stringify(data),
      headers: setHeaders(false),
    })

    setIsClicked(isGood)
  }

  return (
    <div className="fr-mt-2w">
      <button
        onClick={() => handleClick(true)}
        className={`fr-mr-1w border border-[#DDD] ${
          isClicked === true ? 'bg-purple' : 'bg-white'
        }`}
      >
        <span
          className={`${
            isClicked ? 'text-white' : 'fr-text-action-high--blue-france'
          } fr-icon-thumbs-up `}
        />
      </button>
      <button
        onClick={() => handleClick(false)}
        className={`fr-mr-1w border border-[#DDD] ${
          isClicked === false ? 'bg-purple' : 'bg-white'
        }`}
      >
        <img
          className={`fr-m-1w ${
            isClicked === false ? 'mr-2 brightness-0 invert-[1]' : 'mr-2'
          }`}
          src={thumbsDown}
          alt="Feedback négatif"
        />
      </button>
      {isClicked !== null && (
        <GlobalParagraph extraClass="fr-text--xs">{thankFeedback}</GlobalParagraph>
      )}
    </div>
  )
}
