import { askingReasons, feedbackAdditionalInput } from "../../constants/feedback"
import { Input } from "@codegouvfr/react-dsfr/Input"

export const InputOption = ({ reasons, setOtherReason, isFirst }) => {
	const handleNewReason = (e) => {
		setOtherReason(e.target.value)
	}

	return (
		<>
			{(reasons.includes("Autre raison") || !isFirst) && (
				<Input
					// @ts-expect-error TS(2322): Type '{ onChange: (e: any) => void; iconId: "fr-ic... Remove this comment to see the full error message
					onChange={handleNewReason}
					iconId="fr-icon-arrow-right-line"
					nativeInputProps={{
						role: feedbackAdditionalInput,
						name: "otherReason",
						placeholder: askingReasons,
					}}
				/>
			)}
		</>
	)
}
