import { Tile } from "@codegouvfr/react-dsfr/Tile";
import { Checkbox } from "@codegouvfr/react-dsfr/Checkbox";

export const    SheetsTiles = ({ tiles, isModifiable, selectedSheets, setSelectedSheets, removedSheets }) => {

	const	handleChange = (e) => {
		const updatedSelectedSheets = selectedSheets.includes(parseInt(e.target.name)) ?
			selectedSheets.filter(key => key !== parseInt(e.target.name))
			: [...selectedSheets, parseInt(e.target.name)];

		setSelectedSheets(updatedSelectedSheets);
	}

	return <>
		{tiles.map((tile, key) => {
			return <div key={key}>
				{!removedSheets.includes(key) && <div className="flex">
					<Tile
						horizontal
						className="fr-mb-3v w-full"
						desc={tile.desc}
						linkProps={tile.linkProps}
						title={tile.title}
					/>
					{isModifiable && <Checkbox
						className="items-start justify-items-end fr-pl-2w"
						options={[
							{
								nativeInputProps: {
									onChange: handleChange,
									name: key,
									checked: selectedSheets.includes(key)
								}
							},
						]}
						small
					/>}
				</div>}
			</div>
		})}
	</>
}