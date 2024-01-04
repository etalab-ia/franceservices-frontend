import Input from "@codegouvfr/react-dsfr/Input"
import { GlobalColContainer } from "../Global/GlobalColContainer"
import { GlobalRowContainer } from "../Global/GlobalRowContainer"

export function UserInformation({ handleChange }) {
	return (
		<>
			<GlobalRowContainer extraClass="fr-mb-2w">
				<GlobalColContainer>
					<Input
						label="Prénom / Nom"
						nativeInputProps={{
							name: "name",
							onChange: handleChange,
						}}
					/>
				</GlobalColContainer>
				<GlobalColContainer>
					<Input
						label="Votre administration"
						nativeInputProps={{
							name: "administration",
							onChange: handleChange,
						}}
					/>
				</GlobalColContainer>
			</GlobalRowContainer>
			<GlobalRowContainer extraClass="fr-mb-2w">
				<GlobalColContainer>
					<Input
						label="Titre du message"
						nativeInputProps={{
							name: "title",
							onChange: handleChange,
						}}
					/>
				</GlobalColContainer>
			</GlobalRowContainer>
		</>
	)
}
