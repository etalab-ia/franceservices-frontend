import { handleSignout } from "../utils/manageConnexion"

export function quickAccessItemsFunc(userAuth, setUserAuth) {
	const quickAccessItemsProps = [
		{
			iconId: "fr-icon-user-line",
			linkProps: {
				style: { pointerEvents: "none" },
			},
			text: userAuth.username,
		},
		{
			iconId: "fr-icon-logout-box-r-line",
			linkProps: {
				onClick: () => handleSignout(setUserAuth),
			},
			text: "Se déconnecter",
		},
	]

	return quickAccessItemsProps
}
