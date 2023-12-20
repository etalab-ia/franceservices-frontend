import { indexesUrl } from "../constants/api";
import { useFetch } from "./hooks";

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

/***************************
		USER QUESTION
 **************************/

export const	setContactData = (subject, text, institution) => {
	const	data = {
		subject: subject,
		text: text,
		institution: institution
	};

	return JSON.stringify(data);
}

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
		mode: question.mode,
	};

	return data;
}

export const	setQuestionFromRegeneration = (mode, text, limit) => {
	const	data = {
		model_name: 'albert-light',
		mode: mode,
		query: text,
		limit: limit,
		user_text: text,
		context: '',
		institution: '',
		links: '',
		temperature: 20,
	};

	return data;
}

export const	setQuestionWithContext = (question, context) => {
	const	administrations = context.administrations.length ? "Les administrations concernées par cette question sont : " + context.administrations.map(adminstration => adminstration) : "";
	const	themes = context.themes.length ? "La question porte sur les thèmes suivants : " + context.themes.map(theme => theme) : "";
	const	questionWithContext = question + "\n" + administrations + "\n" + themes;

	return questionWithContext;
}

/***************************
		SP SHEETS
 **************************/

const			setSheetsBody = (user_text) => {
	const data = JSON.stringify({
		name: 'sheets',
		query: user_text,
		limit: 10,
		similarity: "e5",
		institution: ''
	});

	return data;
}

const			getSheetsData = async (currQuestion, userToken, dispatch) => {
	const	sheetsResp = await useFetch(indexesUrl, 'POST', {
		data: setSheetsBody(currQuestion),
		headers: setHeaders(userToken, false),
	}, dispatch);
	
	dispatch({ type: 'SET_SHEETS', nextSheets: sheetsResp });
}

export const	setSheetsData = (currQuestion, setTiles, userToken, dispatch) => {
	setTiles([]);

	if (!currQuestion || currQuestion.length === 0)
		return ;

	getSheetsData(currQuestion, userToken, dispatch);
}

export const	setTilesFromSheets = (sheets, setTiles) => {
	if (!sheets || !sheets.length)
		return setTiles([]);

	setTiles([]);
	
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
					{sheet.surtitre}
				</p>
				<p>
					{sheet.title}
				</p>
			</>,
			desc: domain
		};
		setTiles(prevTiles => [...prevTiles, newTile]);
	});
}

// TODO: add if a tag w/ sheets id is needed in cards

// export const	getSheetId = (url) => {
// 	const	splitUrl = url.split("vosdroits/");
// 	const	sheetId = splitUrl[1];

// 	return sheetId;
// }