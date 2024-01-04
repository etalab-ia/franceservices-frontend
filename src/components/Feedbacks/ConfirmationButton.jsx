import { feedbackConfirmationButton } from "../../constants/feedback"

export const ConfirmationButton = ({ reasons, otherReason, feedback, dispatch }) => {
	const handleConfirm = () => {
		otherReason &&
			!reasons.includes(otherReason) &&
			dispatch({ type: "SET_NEW_FEEDBACK", nextFeedback: otherReason })
		dispatch({ type: "CONFIRM_FEEDBACKS" })
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
