import { Tile } from "@codegouvfr/react-dsfr/Tile";

export const    SheetsTiles = ({ tiles, isModifiable, removedSheets, setRemovedSheets }) => {

	const	handleClick = (key) => {
		setRemovedSheets([...removedSheets, key]);
	}

	return (
		<>
		  {tiles.map((tile, key) => (
			!removedSheets.includes(key) && (
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
						X Supprimer
				  	</div>
				)}
			  </div>
			)
		  ))}
		</>
	  );
	  
	}