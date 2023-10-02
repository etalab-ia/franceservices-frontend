import { apiUrl, streamUrl, stopGenerationUrl, importUrl } from "../constants/api";

export const useFetch = async(url, method, props) => {

	const { data, headers } = props;
	const	credentials = url === importUrl ? 'omit' : 'include';

	try {
						
		const response = await fetch(url, {
			method: method,
			credentials: credentials,
			headers,
			body: data === undefined ? {} : data
		})
		
		if (url === apiUrl || url === stopGenerationUrl) {
			return response;
		}
		else {
			const jsonData = await response.json();

			return jsonData;
		}

	} catch (error) {
		console.error('An error occurred: ', error);

		return error;
	}
}

export const useStream = async(state, dispatch) => {

	const   stream_chat = new EventSource(streamUrl, { withCredentials: true })

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

export const usePost = async(state, dispatch) => {

	const	formData = new URLSearchParams();
	const	headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

	formData.append("user_text", state.question.user_text);
	formData.append("context", "");
	formData.append("links", "");
	formData.append("temperature", "0.1");

	const res = await useFetch(apiUrl, 'POST', {data: formData, headers});
	await useStream(state, dispatch);
}