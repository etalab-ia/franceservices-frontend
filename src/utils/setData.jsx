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
		query: question.query,
		user_text: '',
		context: question.context,
		links: question.links,
		temperature: question.temperature,
		model_name: question.model_name,
		limit: question.limit,
		mode: question.mode,
		sources: question.sources,
		must_not_sids: question.must_not_sids,
	};

	return data;
}

export const	setQuestionFromRegeneration = (mode, text, limit, must_not_sids) => {
	const	data = {
		model_name: 'albert-light',
		mode: mode,
		query: text,
		limit: limit,
		context: '',
		institution: '',
		links: '',
		temperature: 20,
		must_not_sids: must_not_sids
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

const			setIndexesBody = (data, name, limit) => {
	const body = JSON.stringify({
		name: name,
		query: data.question,
		limit: limit,
		similarity: "e5",
		institution: '',
		must_not_sids: data.must_not_sids,
	});

	return body;
}

export const	getIndexes = async (data, userToken, dispatch, indexType, chunkSize) => {
	const	actionType = indexType === 'sheets' ? 'SET_SHEETS' : 'SET_CHUNKS';
	const	res = await useFetch(indexesUrl, 'POST', {
		data: setIndexesBody(data, indexType, chunkSize),
		headers: setHeaders(userToken, false),
	}, dispatch);
  
	dispatch({ type: actionType, [indexType]: res });
}

const		getIndexesData = async (data, userToken, dispatch) => {
	getIndexes(data, userToken, dispatch, 'sheets', 10);
	getIndexes(data, userToken, dispatch, 'chunks', 7);
}

export const	setIndexesData = (data, setTiles, userToken, dispatch) => {
	setTiles([]);

	if (!data || !data.question || data.question.length === 0)
		return ;

	getIndexesData(data, userToken, dispatch);
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