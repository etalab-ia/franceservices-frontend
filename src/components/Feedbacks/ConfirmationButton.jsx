import { feedbackConfirmationButton } from "../../constants/feedback"

export const ConfirmationButton = ({ reasons, otherReason, feedback, setFeedback }) => {
	const handleConfirm = () => {
		otherReason &&
			!reasons.includes(otherReason) &&
			setFeedback({
				...feedback,
				reasons: [...feedback.reasons, otherReason]
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
