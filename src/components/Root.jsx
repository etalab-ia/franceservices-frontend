import { Header } from "@codegouvfr/react-dsfr/Header";
import { Chatbot } from "../pages/Chatbot";
import { Routes, Route } from "react-router-dom";
import { navFunc } from "../constants/router";
import { Home } from "../pages/Home";

export const Root = () => {

	const navigationData = navFunc();

	return <>
		<Header className="header-container"
			brandTop={<>INTITULE<br />OFFICIEL</>}
			serviceTitle="Miaou"
			serviceTagline="Le module d'Intelligence Artificielle Orienté Usager"
			homeLinkProps={{
			"to": "/",
			}}
			navigation={navigationData}
		/>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/chat" element={<Chatbot />}/>
			<Route path="*" element={<h1>404</h1>} />
		</Routes>
  </>
}