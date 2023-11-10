import { createRouter, defineRoute } from "type-route";
import { useLocation } from "react-router-dom";

export function navFunc() {
	const	location = useLocation();
	const	currentPath = location.pathname;
	
	const navDefs = [
		{
			"text": "Accueil",
			"linkProps": {
				"to": "/chat"
			},
			"isActive": currentPath === "/chat",
		},
	]
	return navDefs;
}

const routeDefs = {
	"home": defineRoute("/chat"),
};

export const { RouteProvider, useRoute, routes } = createRouter(routeDefs);