import { useDispatch } from "react-redux";

export const	ConfirmationButton = ({ setIsConfirmed }) => {
	const	dispatch = useDispatch();

	const	handleConfirm = () => { 
		setIsConfirmed(true);
		dispatch({ type: 'CONFIRM_RESSOURCE' });
	}

	return (
		<button onClick={handleConfirm} className={`user-feedback-confirmation-button`}>
			Confirmer
		</button>
	)
}