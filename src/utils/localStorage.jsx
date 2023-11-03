export function checkConnexion(dispatch) {
	const	authToken = localStorage.getItem('authToken');
	const	username = localStorage.getItem('username');

	if (authToken !== 'undefined') {
		console.log(authToken)
		dispatch({ type: 'LOGIN', nextUserToken: authToken });
		dispatch({ type: 'SET_USERNAME', nextUsername: username });
	}
	else {
		dispatch({ type: 'LOGOUT' })
	}
}