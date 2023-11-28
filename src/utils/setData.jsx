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
		limit: 3,
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
	}, dispatch);

	dispatch({ type: 'SET_SHEETS', nextSheets: sheetsResp });
}

export const	getSheetId = (url) => {
	const	splitUrl = url.split("vosdroits/");
	const	sheetId = splitUrl[1];

	return sheetId;
}

export const setTilesFromSheets = (sheets, setTiles) => {
	sheets.map((sheet) => {
		const	url = sheet.url;
		const	parsedUrl = new URL(url);
		let		domain = parsedUrl.hostname;

		domain = domain.replace(/^www\./, '');
		domain = domain.replace(/^entreprendre\./, '');

		const newTile = {
			linkProps: { to: sheet.url },
			title: 
			<>
				<p className="fr-badge fr-badge--sm fr-badge--purple-glycine fr-mb-1v">
					{sheet.surtitre}</p><p>{sheet.title}
				</p>
			</>,
			desc: domain
		};
		setTiles(prevTiles => [...prevTiles, newTile]);
	});
}

export const getSheetsData = async (setSheets, currQuestion, userToken, dispatch) => {
	const sheetsResp = await useFetch(indexesUrl, 'POST', {
		data: setSheetsData(currQuestion),
		headers: setHeaders(userToken, false),
	}, dispatch);
	setSheets(sheetsResp);
}