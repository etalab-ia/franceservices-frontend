import { GlobalColContainer } from "../Global/GlobalColContainer";

export function StreamingMessage({ children }) {

	return (
		<GlobalColContainer>
			<div className="streaming fr-mb-4w">
				<div>{children}</div>
			</div>
		</GlobalColContainer>
	);
}