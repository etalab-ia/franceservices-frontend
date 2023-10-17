import { ressourceButtons } from "../../constants/ressources";
import { useState } from "react";
import { animated } from "@react-spring/web";
import { useDispatch } from "react-redux";

export function	RessourceOptions() {
	const	[ressources, setRessources] = useState([]);
    const   dispatch = useDispatch();

    const	handleClick = (index) => {
		if (ressources.includes(ressourceButtons[index]))
		{
			setRessources(ressources.filter(ressource => ressource !== ressourceButtons[index]));
			dispatch({ type: 'RM_RESSOURCE', rmRessource: ressourceButtons[index] });
		}
		else
		{
			setRessources([...ressources, ressourceButtons[index]]);
			dispatch({ type: 'SET_NEW_RESSOURCE', nextRessource: ressourceButtons[index] });
		}
	}

	return (
		<div className="wrap-message">
			{ressourceButtons.map((button, index) => {
				const classNames = ressources.includes(ressourceButtons[index]) ? "bg-[#6A6AF4]" : "bg-[white]";
				
				return <div key={index}>
					<animated.button
						className={`user-feedback-buttons ${classNames}`}
						onClick={() => handleClick(index)}
					>
						<p className={ressources.includes(ressourceButtons[index]) ? "text-white" : "text-#6A6AF4"}>
							{button}
						</p>
					</animated.button>
				</div>
			})}
		</div>	
	);
}