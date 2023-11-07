import { ressourceButtons } from "../../constants/ressources";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NOT_SET } from "../../constants/status";

export function	RessourceOptions({ archive }) {
	const	[ressource, setRessource] = archive !== NOT_SET ? useState(archive.source) : useState();
    const   dispatch = useDispatch();

    const	handleClick = (index) => {
		const	mode = ressourceButtons[index].model_name === 'albert-light' ? 'rag' : 'simple';
		const	limit = mode === 'rag' ? 3 : 0;
		
		dispatch({ type: 'SET_USER_MODEL_NAME_CHOICE', nextModelName: ressourceButtons[index].model_name, nextMode: mode, nextLimit: limit });
		setRessource(ressourceButtons[index]);
	}

	return (
		<div className="wrap-message">
			{ressourceButtons.map((button, index) => {
				const	isSelected = (archive === NOT_SET && ressource === button || ressource === button.name);
				const	classNames = isSelected ? "bg-purple" : "bg-[white]";

				return <div key={index}>
					<button
						disabled={archive !== NOT_SET}
						className={`user-feedback-buttons ${classNames}`}
						onClick={() => handleClick(index)}
					>
						<p className={isSelected ? "text-white" : "text-purple"}>
							{button.name}
						</p>
					</button>
				</div>
			})}
		</div>	
	);
}