import { GlobalRowContainer } from "../Global/GlobalRowContainer";

export function ModifyButton({ handleClick }) {
	return <GlobalRowContainer>
		<p
			className="fr-pt-1w fr-text--xs underline cursor-pointer"
			onClick={handleClick}
		>
			Modifier
		</p>
	</GlobalRowContainer>
}