import { apiUrl, stopGenerationUrl, importUrl } from "../constants/api";
import { EventSourcePolyfill } from 'event-source-polyfill';
import { setHeaders, setUserQuestion } from "./setData";

export const	useFetch = async(url, method, props) => {
	const		{ data, headers } = props;
	const		credentials = url === importUrl ? 'omit' : 'include';

	try 
	{
		const response = await fetch(url, {
			method: method,
			credentials: credentials,
			headers,
			body: data === undefined ? {} : data
		})
		
		if (response.status !== 200 || url === stopGenerationUrl || url.includes("start"))
			return response;			
		else
		{
			const jsonData = await response.json();

			return jsonData;
		}
	} 
	catch (error)
	{
		console.error('An error occurred: ', error);

		return error;
	}
}

function	handleStreamMessage(e, dispatch, stream_chat) {
	try
	{
		const	jsonData = JSON.parse(e.data);

		if (jsonData == "[DONE]")
		{
			stream_chat.close();

			return dispatch({ type: 'STOP_AGENT_STREAM' });
		} 
		else 
		{
			return dispatch({ type: 'GET_AGENT_STREAM', nextResponse: jsonData });
		}
	}
	catch(error) {
		console.error('An error occurred: ', error);
		
		return error;
	}
}

function	handleStreamError(e, stream_chat) {
	if (stream_chat)
	{    
		stream_chat.close();

		return stream_chat;
	}
}

export const	useStream = async(auth, dispatch, id) => {
	const   stream_chat = new EventSourcePolyfill( `${apiUrl}/${id}/start`, {
		headers: setHeaders(auth.userToken, true),
		withCredentials: true,
	});

	dispatch({ type: 'RESET_AGENT_STREAM' });
	stream_chat.onmessage = function(e) {
		handleStreamMessage(e, dispatch, stream_chat);
	}
	stream_chat.onerror = function (e) {
		handleStreamError(e, stream_chat);
	}
}

export async function	usePost(auth, user, dispatch) {
	const	headers = setHeaders(auth.userToken, false);
	const	data = setUserQuestion(user.question);
	const	res = await useFetch(apiUrl, 'POST', {data: JSON.stringify(data), headers});
	
	await useStream(auth, dispatch, res.id);
}