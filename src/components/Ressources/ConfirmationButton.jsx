import { useDispatch } from "react-redux";
import { ressourcesConfirmationButton } from "../../constants/ressources";

export const	ConfirmationButton = ({ setIsConfirmed }) => {
	const	dispatch = useDispatch();

	const	handleConfirm = () => { 
		setIsConfirmed(true);
		dispatch({ type: 'CONFIRM_RESSOURCE' });
	}

	return (
		<button role={ressourcesConfirmationButton} onClick={handleConfirm} className={`user-feedback-confirmation-button`}>
			Confirmer
		</button>
	)
}