import { handleSignout } from "../utils/manageConnexion";

export function	quickAccessItemsFunc(state, dispatch) {
	const    quickAccessItemsProps = [
		{
			iconId: 'fr-icon-user-line',
			linkProps: {
				style: {pointerEvents: 'none'}
			},
			text: state.username
		},
		// {
		//   iconId: 'fr-icon-mail-fill',
		//   linkProps: {
		// 	href: 'mailto:language_model@data.gouv.fr'
		//   },
		//   text: 'Contact'
		// },
		{
			iconId: 'fr-icon-logout-box-r-line',
			linkProps: {
				onClick: () => handleSignout(state, dispatch)
			},
			text: 'Se déconnecter'
		},
	]

	return quickAccessItemsProps;
}