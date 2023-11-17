import { createRouter, defineRoute } from "type-route";
import { useLocation } from "react-router-dom";

export function navFunc() {
	const	location = useLocation();
	const	currentPath = location.pathname;
	
	const navDefs = [
		{
			"text": "Accueil",
			"linkProps": {
				"to": "/home"
			},
			"isActive": currentPath === "/home",
		},
		{
			"text": "Préparer un rendez-vous",
			"linkProps": {
				"to": "/meeting"
			},
			"isActive": currentPath === "/meeting",
		},
		{
			"text": "Poser une question",
			"linkProps": {
				"to": "/chat"
			},
			"isActive": currentPath === "/chat",
		},
		{
			"text": "Historique",
			"linkProps": {
				"to": "/history"
			},
			"isActive": currentPath === "/history",
		},
	]
	return navDefs;
}

const routeDefs = {
	"home": defineRoute("/home"),
	"meeting": defineRoute("/meeting"),
	"chat": defineRoute("/chat"),
	"editor": defineRoute("/history"),
};

export const { RouteProvider, useRoute, routes } = createRouter(routeDefs);