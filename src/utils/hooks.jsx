import { apiUrl, stopGenerationUrl, importUrl } from "../constants/api";
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export const		useFetch = async(url, method, props) => {

	const	{ data, headers } = props;
	const	credentials = url === importUrl ? 'omit' : 'include';

	try 
	{				
		const response = await fetch(url, {
			method: method,
			credentials: credentials,
			headers,
			body: data === undefined ? {} : data
		})

		if (response.status !== 200)
			return response;
		
		if (url === stopGenerationUrl || url.includes("start"))
			return response;
		else {
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

export const		useStream = async(auth, dispatch, id) => {
	const   stream_chat = new EventSourcePolyfill(apiUrl + "/" + id + "/start", {
		headers: { 'Authorization': `Bearer ${auth.userToken}` },
		withCredentials: true,
	});

	dispatch({ type: 'RESET_AGENT_STREAM' });

	stream_chat.onmessage = function (e) 
	{
		try {
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
		} catch(error) {
			console.error('An error occurred: ', error);
			
			return error;
		}
	}
	stream_chat.onerror = function (e)
	{
		if (stream_chat)
		{    
			stream_chat.close();

			return stream_chat;
		}
	}
}

export async function	usePost(auth, user, dispatch) {
	const	headers = { 
		'Content-Type': 'application/json', 
		'Authorization': `Bearer ${auth.userToken}` 
	};
	const	data = {
		user_text: user.question.user_text,
		temperature: "0.1",
	}
	const	res = await useFetch(apiUrl, 'POST', {data: JSON.stringify(data), headers});
	
	await useStream(auth, dispatch, res.id);
}