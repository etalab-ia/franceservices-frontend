import { GlobalRowContainer } from "./GlobalRowContainer"
import { GlobalColContainer } from "./GlobalColContainer"
import { GlobalParagraph } from "./GlobalParagraph"
import { HalfScreenWidth } from "./HalfScreenWidth"

export const DisplayChunks = ({ chunks }) => {
	return (
		<GlobalRowContainer>
			{chunks && [
				...chunks.map(
					(chunk, index) =>
						chunk && (
							<HalfScreenWidth key={index}>
								<GlobalColContainer extraClass="border grey-950 fr-p-3w overflow-y-auto h-72">
									<a href={chunk.url} target="_blank" rel="noopener noreferrer">
										<GlobalParagraph extraClass="fr-text--lg">{chunk.title}</GlobalParagraph>
// @ts-expect-error TS(2304) FIXME: Cannot find name 'childr'.
// @ts-expect-error TS(2304): Cannot find name 'childr'.
// @ts-expect-error TS(2741): Property 'extraClass' is missing in type '{ childr... Remove this comment to see the full error message
// @ts-expect-error TS(2304): Cannot find name 'childr'.
// @ts-expect-error TS(2741) FIXME: Property 'extraClass' is missing in type '{ childr... Remove this comment to see the full error message
// @ts-expect-error TS(2741): Property 'extraClass' is missing in type '{ childr... Remove this comment to see the full error message
										<GlobalParagraph>{chunk.text}</GlobalParagraph>
										<p className="font-bold text-justify fr-my-1w">{chunk.url}</p>
									</a>
								</GlobalColContainer>
							</HalfScreenWidth>
						)
				),
			]}
		</GlobalRowContainer>
	)
}
