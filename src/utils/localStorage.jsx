export function checkConnexion(auth, dispatch) {
	const	authToken = localStorage.getItem('authToken');
	const	username = localStorage.getItem('username');

	if ((authToken !== 'undefined' && authToken != null) || auth.userToken.length) {
		dispatch({ type: 'LOGIN', nextUserToken: auth.userToken.length ? auth.userToken : authToken });
		dispatch({ type: 'SET_USERNAME', nextUsername: username });
	}
	else {
		dispatch({ type: 'LOGOUT' });
	}
}