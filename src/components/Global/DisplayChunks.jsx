import { useEffect } from "react"
import { useSelector } from "react-redux"
import { GlobalRowContainer } from "./GlobalRowContainer";
import { GlobalColContainer } from "./GlobalColContainer";
import { GlobalParagraph } from "./GlobalParagraph";
import { HalfScreenWidth } from "./HalfScreenWidth";

export const    DisplayChunks = ({ chunks }) => {
	const	user = useSelector((state) => state.user);

	useEffect(() => {
		console.log('chunks: ', chunks)
	}, [user.chunks])

	return (
		<GlobalRowContainer>
		  {[
			...chunks.map((chunk, index) => (
				<HalfScreenWidth key={index}>
			  		<GlobalColContainer extraClass='border grey-950 fr-p-3w'>
						<GlobalParagraph extraClass='fr-text--lg'>{chunk.title}</GlobalParagraph>	
						<GlobalParagraph>{chunk.text}</GlobalParagraph>
						<GlobalParagraph extraClass='font-bold'>{chunk.url}</GlobalParagraph>
					</GlobalColContainer>
				</HalfScreenWidth>
			)),
		  ]}
		</GlobalRowContainer>
	  );
}