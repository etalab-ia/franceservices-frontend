export const	ConfirmationButton = ({ reasons, otherReason, feedback, dispatch, setIsConfirmed }) => {

	const	handleConfirm = () => {
		otherReason && !reasons.includes(otherReason) && dispatch({ type: 'SET_NEW_FEEDBACK', nextFeedback: otherReason });		
		setIsConfirmed(true);
	}
    const   classNames = feedback.reasons.length ? "border-[#000091] text-[#000091]" : "border-[grey] text-grey";

	return (
		<button onClick={handleConfirm} className={`user-feedback-confirmation-button ${classNames}`}>
			Confirmer
		</button>
	)
}