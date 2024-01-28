import { toolsTitle, ressourcesTitle } from "../constants/home"
import { HomeTiles } from "../components/Home/HomeTiles"
import { toolsTiles, ressourcesTiles, MFStoolsTiles } from "../constants/inputFields"
import { GlobalRowContainer } from "../components/Global/GlobalRowContainer"
import { GlobalDiv } from "../components/Global/GlobalDiv"
import { GlobalTitle } from "../components/Global/GlobalTitle"
import { isMFSContext } from "../utils/context/isMFSContext"
import { useContext } from "react"

export function Home() {
	const isMFS = useContext(isMFSContext)
	return (
		<div className="fr-container">
			<GlobalDiv>
				<GlobalTitle>{toolsTitle}</GlobalTitle>
				<HomeTiles tiles={isMFS ? MFStoolsTiles : toolsTiles} />
			</GlobalDiv>
			<GlobalDiv>
				<div className="fr-mb-12w">
					<GlobalTitle>{ressourcesTitle}</GlobalTitle>
					<HomeTiles tiles={ressourcesTiles} />
				</div>
			</GlobalDiv>
		</div>
	)
}
