import { createRouter, defineRoute } from "type-route";
import { useLocation } from "react-router-dom";

export function navFunc() {
	const	location = useLocation();
	const	currentPath = location.pathname;
	
	const navDefs = [
		{
			"isActive": currentPath === "/chat" || currentPath === "/history",
			menuLinks: [
			  	{
					"linkProps": {
						"to": "/chat"
					},
					text: 'Poser une question',
					"isActive": currentPath === "/chat",
				},
				{
					"linkProps": {
						"to": "/history"
					},
					text: 'Historique',
					"isActive": currentPath === "/history",
			  	},
			],
			text: 'Poser une question'
		},
		{
			"text": "Rédiger une réponse",
			"linkProps": {
				"to": "/editor"
			},
			"isActive": currentPath === "/editor",
		},
	]
	return navDefs;
}

const routeDefs = {
	"home": defineRoute("/chat"),
	"editor": defineRoute("/editor"),
};

export const { RouteProvider, useRoute, routes } = createRouter(routeDefs);