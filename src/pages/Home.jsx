import { toolsTitle, ressourcesTitle } from "../constants/home";
import { HomeContainer } from "../components/Home/HomeContainer";
import { HomeDiv } from "../components/Home/HomeDiv";
import { HomeTitle } from "../components/Home/HomeTitle";
import { HomeTiles } from "../components/Home/HomeTiles";
import { toolsTiles, ressourcesTiles } from "../constants/inputFields";

export function Home() {
	return (
		<HomeContainer>
			<HomeDiv>
				<HomeTitle>{toolsTitle}</HomeTitle>
				<HomeTiles tiles={toolsTiles}/>
			</HomeDiv>
			<HomeDiv>
				<HomeTitle>{ressourcesTitle}</HomeTitle>
				<HomeTiles tiles={ressourcesTiles}/>
			</HomeDiv>
		</HomeContainer>
	);
}