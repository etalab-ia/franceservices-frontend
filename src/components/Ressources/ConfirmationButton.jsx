import { useSelector } from "react-redux";

export const	ConfirmationButton = ({ setIsConfirmed }) => {
	const	ressources = useSelector((state) => state.ressources);
	const   classNames = ressources.choices.length ? `text-[#000091]` : `text-[#929292]`;

	const	handleConfirm = () => { setIsConfirmed(true); }

	return (
		<button onClick={handleConfirm} className={`user-feedback-confirmation-button ${classNames}`}>
			Confirmer
		</button>
	)
}