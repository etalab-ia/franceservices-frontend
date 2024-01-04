import { toolsTitle, ressourcesTitle } from "../constants/home"
import { HomeTiles } from "../components/Home/HomeTiles"
import { toolsTiles, ressourcesTiles } from "../constants/inputFields"
import { GlobalRowContainer } from "../components/Global/GlobalRowContainer"
import { GlobalDiv } from "../components/Global/GlobalDiv"
import { GlobalTitle } from "../components/Global/GlobalTitle"

export function Home() {
	return (
		<GlobalRowContainer extraClass="fr-grid-row--center">
			<GlobalDiv>
				<GlobalTitle>{toolsTitle}</GlobalTitle>
				<HomeTiles tiles={toolsTiles} />
			</GlobalDiv>
			<GlobalDiv>
				<div className="fr-mb-12w">
					<GlobalTitle>{ressourcesTitle}</GlobalTitle>
					<HomeTiles tiles={ressourcesTiles} />
				</div>
			</GlobalDiv>
		</GlobalRowContainer>
	)
}
