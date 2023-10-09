import { signoutUrl } from "../constants/api";
import { useFetch } from "./hooks";
import { Navigate } from "react-router-dom";

const	rmAuth = () => {
	localStorage.removeItem('authToken');
	localStorage.removeItem('username');
}

export const    handleSignout = async(state, dispatch) => {
	await useFetch(signoutUrl, 'POST', { headers: { "Authorization": `Bearer ${state.userToken}`} })
		.then(rmAuth())
		.then(res => dispatch({ type: 'LOGOUT', nextUserToken: res.userToken }));

	return <Navigate to="/" />
}