import { GlobalColContainer } from "../Global/GlobalColContainer"
import { SheetsTilesContainer } from "./SheetsTilesContainer"
import { useState } from "react"
import { SheetsAdditionalButtons } from "./SheetsAdditionalButtons"
import { ArchiveType } from "types"

/*****************************************************************************************
	
	COMPONENTS:

		**	SheetsAdditionalButtons: allows user to add/delete sheets. Deleted sheets 
				from main section sheets permits to set must_not_sids and regenerate 
				stream

		**	SheetsTilesContainer: change main/additional sheets cards

		! Additional sheets / tiles & must_not_sids are different
			*	must_not_sids: 
					- sheets id deleted ONLY FROM initial main sheets (user.sheets)
					- have an impact on regeneration stream
			
			*	sheets / tiles order: 
					- have an impact on what user sees but not always on regeneration (only if 
						it changes must_not_sids variable)

 *****************************************************************************************/

export function DisplaySheets({ archive }: { archive: ArchiveType | undefined }) {
	const [isModifiable, setIsModifiable] = useState(false)

	return (
		<GlobalColContainer>
			<SheetsAdditionalButtons
				isModifiable={isModifiable}
				setIsModifiable={setIsModifiable}
				archive={archive}
			/>
			<SheetsTilesContainer archive={archive} isModifiable={isModifiable} />
		</GlobalColContainer>
	)
}
