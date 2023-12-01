import { createRouter, defineRoute } from "type-route";
import { useLocation } from "react-router-dom";

export function navFunc() {
	const	location = useLocation();
	const	currentPath = location.pathname;
	
	const navDefs = [{
			"text": "Accueil",
			"linkProps": {
				"to": "/home"
			},
			"isActive": currentPath === "/home",
		},
		{
			text: 'Mes outils',
			"isActive": currentPath === "/chat" || currentPath === "/meeting",
			menuLinks: [
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
			]
		},
		{
			"text": "Nous contacter",
			"linkProps": {
				"to": "/contact"
			},
			"isActive": currentPath === "/contact",
		},
		// {
		// 	text: 'Mes ressources',
		// 	"isActive": currentPath === "/history",
		// 	menuLinks: [
		// 		{
		// 			"text": "Historique",
		// 			"linkProps": {
		// 				"to": "/history"
		// 			},
		// 			"isActive": currentPath === "/history",
		// 		},
		// 	]
		// },
	]
	return navDefs;
}

const routeDefs = {
	"home": defineRoute("/home"),
	"meeting": defineRoute("/meeting"),
	"chat": defineRoute("/chat"),
	"contact": defineRoute("/contact"),
	// "editor": defineRoute("/history"),
};

export const { RouteProvider, useRoute, routes } = createRouter(routeDefs);