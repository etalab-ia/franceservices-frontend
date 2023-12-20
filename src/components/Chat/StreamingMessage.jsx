import { GlobalColContainer } from "../Global/GlobalColContainer";

export function StreamingMessage({ children }) {

	return (
		<GlobalColContainer>
			<div className="streaming fr-mb-4w fr-p-3v fr-ml-3v w-full">
				<p>{children}</p>
			</div>
		</GlobalColContainer>
	);
}