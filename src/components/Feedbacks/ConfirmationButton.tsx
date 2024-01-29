import { useApiUrls } from "../../constants/api"
import { feedbackConfirmationButton } from "../../constants/feedback"
import { useFetch } from "../../utils/hooks"
import { setHeaders } from "../../utils/setData"
import { useSelector } from "react-redux"
import { RootState } from "types"

export const ConfirmationButton = ({ reasons, otherReason, feedback, setFeedback }) => {
	const streamId = useSelector((state: RootState) => state.user.streamId)
	const { feedbackUrl } = useApiUrls()

	const handleConfirm = () => {
		otherReason &&
			!reasons.includes(otherReason) &&
			setFeedback({
				...feedback,
				message: otherReason,
			})

		const data = {
			is_good: !feedback.isGood ? 1 : 0,
			message: feedback.message,
			reasons: feedback.reasons,
		}
		useFetch(`${feedbackUrl}/${streamId}`, "POST", {
			data: JSON.stringify(data),
			headers: setHeaders(false),
		})

		setFeedback({
			...feedback,
			isConfirmed: true,
		})
	}
	const classNames = feedback.reasons.length ? `text-dark-purple` : `text-[#929292]`

	return (
		<button
			role={feedbackConfirmationButton}
			onClick={handleConfirm}
			className={`user-feedback-confirmation-button ${classNames}`}
		>
			Confirmer
		</button>
	)
}
