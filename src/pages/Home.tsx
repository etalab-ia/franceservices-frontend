import { toolsTitle, ressourcesTitle } from "../constants/home"
import { HomeTiles } from "../components/Home/HomeTiles"
import {
	toolsTiles,
	MFSressourcesTiles,
	generalistRessourcesTiles,
	MFStoolsTiles,
} from "../constants/inputFields"
import { GlobalDiv } from "../components/Global/GlobalDiv"
import { GlobalTitle } from "../components/Global/GlobalTitle"
import { isMFSContext } from "../utils/context/isMFSContext"
import { useContext } from "react"

export function Home() {
	const isMFS = useContext(isMFSContext)
	const tiles = isMFS ? MFSressourcesTiles : generalistRessourcesTiles
	return (
		<div className="fr-container">
			<GlobalDiv>
				<GlobalTitle>{toolsTitle}</GlobalTitle>
				<HomeTiles tiles={isMFS ? MFStoolsTiles : toolsTiles} />
			</GlobalDiv>
			<div className="fr-mb-12w">
				<GlobalTitle>{ressourcesTitle}</GlobalTitle>
				<HomeTiles tiles={tiles} />
			</div>
		</div>
	)
}
