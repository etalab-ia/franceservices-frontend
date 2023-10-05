export function checkConnexion(dispatch) {
	const	authToken = localStorage.getItem('authToken');
	const	username = localStorage.getItem('username');

	if (authToken) {
		dispatch({ type: 'LOGIN', nextUserToken: authToken });
		dispatch({ type: 'SET_USERNAME', nextUsername: username });
	}
}