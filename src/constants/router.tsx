import { isMFSContext } from "../utils/context/isMFSContext"
import { createRouter, defineRoute } from "type-route"
import { useLocation } from "react-router-dom"
import { useContext } from "react"

export function navFunc() {
	const isMFS = useContext(isMFSContext)
	const location = useLocation()
	const currentPath = location.pathname

	const navDefs: any[] = isMFS
		? [
				{
					text: "Accueil",
					linkProps: {
						to: "/home",
					},
					isActive: currentPath === "/home",
				},
				{
					text: "Mes outils",
					isActive: currentPath === "/chat" || currentPath === "/meeting",
					menuLinks: [
						{
							text: "Préparer un rendez-vous",
							linkProps: {
								to: "/meeting",
							},
							isActive: currentPath === "/meeting",
						},
						{
							text: "Mes fiches rendez-vous",
							linkProps: {
								to: "/history",
							},
							isActive: currentPath === "/history",
						},
					],
				},
				{
					text: "Aide",
					linkProps: {
						to: "/FAQ",
					},
					isActive: currentPath === "/FAQ",
				},
				{
					text: "Contact",
					linkProps: {
						to: "/contact",
					},
					isActive: currentPath === "/contact",
				},
		  ]
		: [
				{
					text: "Accueil",
					linkProps: {
						to: "/home",
					},
					isActive: currentPath === "/home",
				},
				{
					text: "Mes outils",
					isActive: currentPath === "/chat",
					menuLinks: [
						{
							text: "Poser une question",
							linkProps: {
								to: "/chat",
							},
							isActive: currentPath === "/chat",
						},
					],
				},
				{
					text: "Contact",
					linkProps: {
						to: "/contact",
					},
					isActive: currentPath === "/contact",
				},
		  ]

	return navDefs
}

const routeDefs = {
	home: defineRoute("/home"),
	meeting: defineRoute("/meeting"),
	chat: defineRoute("/chat"),
	contact: defineRoute("/contact"),
	history: defineRoute("/history"),
}

export const { RouteProvider, useRoute, routes } = createRouter(routeDefs)
