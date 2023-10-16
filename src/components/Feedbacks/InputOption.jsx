import { askingReasons } from "../../constants/feedback";
import { Input } from "@codegouvfr/react-dsfr/Input";

export const	InputOption = ({ reasons, setOtherReason, isFirst }) => {

    const	handleNewReason = (e) => { setOtherReason(e.target.value); }

	return (
        <>
		    {(reasons.includes('Autre raison') || !isFirst) &&
				<Input
					className="w-[500px]"
					onChange={handleNewReason}
					iconId="fr-icon-arrow-right-line"
					nativeInputProps={{
						name: 'otherReason',
						placeholder: askingReasons
					}}
				/>
			}
        </>
	)
}