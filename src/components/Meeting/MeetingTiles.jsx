import { Tile } from "@codegouvfr/react-dsfr/Tile";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSheetsData } from "../../utils/setData";
import { setTilesFromSheets } from "../../utils/setData";
import { Checkbox } from "@codegouvfr/react-dsfr/Checkbox";
import { ModifyButton } from "../Global/ModifyButton";
import { numberOfSelectedSheets } from "../../constants/sheets";
import { GlobalRowContainer } from "../Global/GlobalRowContainer";

export const    MeetingTiles = ({ currQuestion, archiveSheets }) => {
	const   [tiles, setTiles] = useState([]);
	const	[sheets, setSheets] = useState([]);
	const	[isModifiable, setIsModifiable] = useState(false);
	const	[selectedSheets, setSelectedSheets] = useState([]);
	const	[removedSheets, setRemovedSheets] = useState([]);
	const	userToken = useSelector((state) => state.auth.userToken);
	const	user = useSelector((state) => state.user);
	const	dispatch = useDispatch();

	useEffect(() => {
		setSheetsData(
			currQuestion,
			archiveSheets,
			setTiles,
			setSheets,
			userToken,
			dispatch
		);
	}, [user.question.query]);

	useEffect(() => {
		setSelectedSheets([]);
		setRemovedSheets([]);
		setIsModifiable(false);
		setTilesFromSheets(sheets, setTiles);
	}, [sheets]);

	const	handleClick = () => {
		setIsModifiable(!isModifiable);
	}

	const	handleChange = (e) => {
		const updatedSelectedSheets = selectedSheets.includes(parseInt(e.target.name)) ?
			selectedSheets.filter(key => key !== parseInt(e.target.name))
			: [...selectedSheets, parseInt(e.target.name)];

		setSelectedSheets(updatedSelectedSheets);
	}

	const	handleRemoveSheet = () => {
		setRemovedSheets(selectedSheets);
		setSelectedSheets([]);
		setIsModifiable(false);
	}

	return <>
		{numberOfSelectedSheets(selectedSheets.length)}
		<GlobalRowContainer>
			{selectedSheets.length !== 0 && <ModifyButton handleClick={handleRemoveSheet} text="Supprimer"/>}
			{tiles.length !== 0 && <ModifyButton handleClick={handleClick} text="Modifier"/>}
		</GlobalRowContainer>
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
						className="items-start justify-items-end"
						options={[
							{
								nativeInputProps: {
									onChange: handleChange,
									name: key,
									checked: selectedSheets.includes(key)
								}
							},
						]}
						style={{ marginLeft: 'auto', marginRight: 0 }}
						small
					/>}
				</div>}
			</div>
		})}
	</>
}