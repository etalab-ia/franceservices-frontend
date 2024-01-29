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
					iconId="fr-icon-arrow-right-line"
					label="Autre raison"
					nativeInputProps={{
						role: feedbackAdditionalInput,
						name: "otherReason",
						placeholder: askingReasons,
						onChange: handleNewReason,
					}}
				/>
			)}
		</>
	)
}
