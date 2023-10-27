import { ressourceButtons } from "../../constants/ressources";
import { useState } from "react";
import { useDispatch } from "react-redux";

export function	RessourceOptions() {
	const	[ressource, setRessource] = useState();
    const   dispatch = useDispatch();

    const	handleClick = (index) => {
		dispatch({ type: 'SET_USER_MODEL_NAME_CHOICE', nextModelName: ressourceButtons[index].model_name });
		setRessource(ressourceButtons[index]);
	}

	return (
		<div className="wrap-message">
			{ressourceButtons.map((button, index) => {
				const classNames = ressource === button ? "bg-purple" : "bg-[white]";
				
				return <div key={index}>
					<button
						className={`user-feedback-buttons ${classNames}`}
						onClick={() => handleClick(index)}
					>
						<p className={ressource === button ? "text-white" : "text-purple"}>
							{button.name}
						</p>
					</button>
				</div>
			})}
		</div>	
	);
}