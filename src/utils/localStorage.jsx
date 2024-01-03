import { setUserInfos } from "./manageConnexion";

export function checkConnexion(dispatch) {
	const	authToken = localStorage.getItem('authToken');

	setUserInfos(authToken, dispatch);
	dispatch({ type: 'LOGIN', nextUserToken: authToken });
}