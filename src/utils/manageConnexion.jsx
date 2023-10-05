import { signoutUrl } from "../constants/api";
import { useFetch } from "./hooks";

export const    handleSignout = async(state, dispatch) => {
	await useFetch(signoutUrl, 'POST', {headers: { "Authorization": `Bearer ${state.userToken}`}})
		.then(res => dispatch({ type: 'LOGOUT', nextUserToken: res.userToken }));
}