import { indexesUrl } from "../constants/api";
import { useFetch } from "./hooks";

export const	setUserQuestion = (question) => {
	const	data = {
		institution: question.institution,
		user_text: question.user_text,
		query: question.query,
		context: question.context,
		links: question.links,
		temperature: question.temperature,
		model_name: question.model_name,
		limit: question.limit,
		mode: question.mode
	};

	return data;
}

export const	setSheetsData = (user_text) => {
	const data = JSON.stringify({
		name: 'sheets',
		query: user_text,
		limit: 4,
		similarity: "e5",
		institution: ''
	});

	return data;
}

export const	setHeaders = (token, isEventSource) => {
	const	headers = isEventSource ? {
		'Authorization': `Bearer ${token}`
	}
	:
	{
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	};

	return headers;
}

export const	getSheets = async(question, auth, dispatch) => {
	const   sheetsResp = await useFetch(indexesUrl, 'POST', {
		data: setSheetsData(question.user_text),
		headers: setHeaders(auth.userToken, false)
	});

	dispatch({ type: 'SET_SHEETS', nextSheets: sheetsResp });
}

export const	getSheetId = (url) => {
	const	splitUrl = url.split("vosdroits/");
	const	sheetId = splitUrl[1];

	return sheetId;
}