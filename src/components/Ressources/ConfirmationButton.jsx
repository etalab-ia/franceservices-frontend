import { useDispatch, useSelector } from "react-redux";

export const	ConfirmationButton = ({ setIsConfirmed }) => {
	const	ressources = useSelector((state) => state.ressources);
	const	dispatch = useDispatch();
	const   classNames = ressources.choices.length ? `text-dark-purple` : `text-[#929292]`;

	const	handleConfirm = () => { 
		setIsConfirmed(true);
		dispatch({ type: 'CONFIRM_RESSOURCE' });
		// dispatch({ type: 'SET_SOURCE', newSource: true});
	}

	return (
		<button onClick={handleConfirm} className={`user-feedback-confirmation-button ${classNames}`}>
			Confirmer
		</button>
	)
}