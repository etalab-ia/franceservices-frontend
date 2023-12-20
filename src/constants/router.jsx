import { createRouter, defineRoute } from "type-route";
import { useLocation } from "react-router-dom";
import { useDispatch  } from "react-redux";

export function navFunc() {
	const	dispatch = useDispatch();
	const	location = useLocation();
	const	currentPath = location.pathname;

	const navDefs = [{
			text: "Accueil",
			linkProps: {
				to: "/home"
			},
			isActive: currentPath === "/home",
		},
		{
			text: 'Mes outils',
			isActive: currentPath === "/chat" || currentPath === "/meeting",
			menuLinks: [
				{
					text: "Préparer un rendez-vous",
					linkProps: {
						to: "/meeting"
					},
					isActive: currentPath === "/meeting",
				},
				{
					text: "Poser une question",
					linkProps: {
						to: "/chat"
					},
					isActive: currentPath === "/chat",
				},
				{
					text: "Consulter mon historique",
					linkProps: {
						to: "/history",
						onClick: () => {
							dispatch({ type: 'RESET_ARCHIVE_TAB' });
						}
					},
					isActive: currentPath === "/history",
				},
			]
		},
		{
			text: "Nous contacter",
			linkProps: {
				to: "/contact"
			},
			isActive: currentPath === "/contact",
		},
	]
	return navDefs;
}

const routeDefs = {
	"home": defineRoute("/home"),
	"meeting": defineRoute("/meeting"),
	"chat": defineRoute("/chat"),
	"contact": defineRoute("/contact"),
	"history": defineRoute("/history"),
};

export const { RouteProvider, useRoute, routes } = createRouter(routeDefs);