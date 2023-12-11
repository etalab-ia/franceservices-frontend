import { GlobalRowContainer } from "../Global/GlobalRowContainer";

export function ModifyButton({ text, handleClick }) {
	return <GlobalRowContainer>
		<p
			className="fr-pt-1w fr-text--xs underline cursor-pointer fr-mr-1w"
			onClick={handleClick}
		>
			{text}
		</p>
	</GlobalRowContainer>
}