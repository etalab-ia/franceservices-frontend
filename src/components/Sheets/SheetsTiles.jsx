import { Tile } from "@codegouvfr/react-dsfr/Tile";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const    SheetsTiles = ({ tiles, isModifiable, type }) => {
	const	text = type === 'main' ? "X Supprimer" : "+ Ajouter";
	const	user = useSelector((state) => state.user);
	const	dispatch = useDispatch();

	const	handleClick = (key) => {
		if (type === 'main')
			dispatch({ type: 'REMOVE_SHEETS', indexToRemove: key});
		else
			dispatch({ type: 'ADD_SHEETS', indexToAdd: key});
	}

	return (
		<>
			{tiles.map((tile, key) => (
				<div key={key} className='flex w-full fr-mb-3v'>
					<Tile
						horizontal
						className='w-full fr-pl-2w font-bold fr-text--xs cursor-pointer'
						desc={tile.desc}
						linkProps={tile.linkProps}
						title={tile.title}
					/>
					{isModifiable && (
						<div
							className="fr-pl-2w font-bold fr-text--xs cursor-pointer"
							onClick={() => handleClick(key)}
						>
							{text}
						</div>
					)}
				</div>))
			}
		</>
	  ); 
	}