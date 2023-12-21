import { GlobalRowContainer } from "./GlobalRowContainer";
import { GlobalColContainer } from "./GlobalColContainer";
import { GlobalParagraph } from "./GlobalParagraph";
import { HalfScreenWidth } from "./HalfScreenWidth";

export const    DisplayChunks = ({ chunks }) => {
	return (
		<GlobalRowContainer>
		  {chunks && [
			...chunks.map((chunk, index) => (
				chunk && 
				<HalfScreenWidth key={index}>
			  		<GlobalColContainer extraClass='border grey-950 fr-p-3w overflow-y-auto h-72'>
					  	<a href={chunk.url} target="_blank" rel="noopener noreferrer">
							<GlobalParagraph extraClass='fr-text--lg'>{chunk.title}</GlobalParagraph>	
							<GlobalParagraph>{chunk.text}</GlobalParagraph>
							<GlobalParagraph extraClass='font-bold'>
								{chunk.url}
							</GlobalParagraph>
						</a>
					</GlobalColContainer>
				</HalfScreenWidth>
			)),
		  ]}
		</GlobalRowContainer>
	  );
}