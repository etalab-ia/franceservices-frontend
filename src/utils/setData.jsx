export const	setUserQuestion = (question) => {
	const	data = {
		institution: question.institution,
		title: question.title,
		user_text: question.user_text,
		context: question.context,
		links: question.links,
		// temperature: question.temperature
	};

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