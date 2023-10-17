export const	ConfirmationButton = ({ reasons, otherReason, feedback, dispatch, setIsConfirmed }) => {

	const	handleConfirm = () => {
		otherReason && !reasons.includes(otherReason) && dispatch({ type: 'SET_NEW_FEEDBACK', nextFeedback: otherReason });		
		setIsConfirmed(true);
	}
    const   classNames = feedback.reasons.length ? `text-[#000091]` : `text-[#929292]`;

	return (
		<button onClick={handleConfirm} className={`user-feedback-confirmation-button ${classNames}`}>
			Confirmer
		</button>
	)
}