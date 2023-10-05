import { signoutUrl } from "../constants/api";
import { useFetch } from "./hooks";
import { Navigate } from "react-router-dom";

export const    handleSignout = async(state, dispatch) => {
	await useFetch(signoutUrl, 'POST', {headers: { "Authorization": `Bearer ${state.userToken}`}})
		.then(localStorage.removeItem('authToken'))
		.then(localStorage.removeItem('username'))
		.then(res => dispatch({ type: 'LOGOUT', nextUserToken: res.userToken }));

	return <Navigate to="/" />
}