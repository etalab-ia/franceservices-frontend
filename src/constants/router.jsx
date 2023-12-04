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
				{
					"text": "Consulter mes fiches démarches",
					"linkProps": {
						"to": "/meetings-history"
					},
					"isActive": currentPath === "/meetings-history",
				},
				{
					"text": "Consulter mes questions-réponses",
					"linkProps": {
						"to": "/qr-history"
					},
					"isActive": currentPath === "/qr-history",
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
	]
	return navDefs;
}

const routeDefs = {
	"home": defineRoute("/home"),
	"meeting": defineRoute("/meeting"),
	"chat": defineRoute("/chat"),
	"contact": defineRoute("/contact"),
	"qr-history": defineRoute("/qr-history"),
	"meetings-history": defineRoute("/meetings-history"),
};

export const { RouteProvider, useRoute, routes } = createRouter(routeDefs);