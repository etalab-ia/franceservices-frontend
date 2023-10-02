import { createRouter, defineRoute } from "type-route";
import { useLocation } from "react-router-dom";


export function navFunc() {

	const	location = useLocation();
	const	currentPath = location.pathname;
	
	const navDefs = [
		{
			"text": "Accueil",
			"linkProps": {
				"to": "/"
			},
			"isActive": currentPath === "/",
		},
		{
			menuLinks: [
				{
					linkProps: {
						"to": "/chat",
					},
					text: 'Chat administratif',
					"isActive": currentPath === "/chat"
				},
				{
					linkProps: {
						"to": "/sources"
					},
					text: 'Sources administratives',
					"isActive": currentPath === "/sources"
				},
			],
			text: 'Trouver des informations',
			"isActive": currentPath === "/chat" || currentPath === "/sources"
		},
		{
			menuLinks: [
				{
					linkProps: {
						"to": "/synthese"
				},
				text: 'Synthèse documentaire',
				"isActive": currentPath === "/synthese"
			},
			{
					linkProps: {
						"to": "/analyse"
					},
				text: 'Analyse de texte',
				"isActive": currentPath === "/analyse"
			},
			],
			text: 'Analyser des documents',
			"isActive": currentPath === "/synthese" || currentPath === "/analyse"
		},
		{
			menuLinks: [
				{
					linkProps: {
						"to": "/editeur"
					},
					text: 'Editeur de texte intelligent',
					"isActive": currentPath === "/editeur"
				},
			],
			text: 'Faciliter l\'écriture',
			"isActive": currentPath === "/editeur"
		},
	]
	return navDefs;
}

const routeDefs = {
	"home": defineRoute("/"),
};

export const { RouteProvider, useRoute, routes } = createRouter(routeDefs);