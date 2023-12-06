export const    setArchive = (dispatch, stream, user) => {
	const	themesArrays = user.sheets.map((sheet) => sheet.theme.split(', '));
	const	uniqueThemesSet = Array.from(new Set(themesArrays.flat()));
	const	selected = uniqueThemesSet.filter((theme) => theme !== "");

	if (user.choices.oldQuestion === user.choices.newQuestion)
		console.log('ici');
	dispatch({ 
		type: 'SET_ARCHIVE',
		nextDate: new Date().toLocaleDateString('fr'), 
		nextTags: selected,
		nextSheets: user.sheets,
		nextMessages: [{ text: user.originQuestion, sender: 'user' }, { text: stream.historyStream, sender: 'agent' }],
		nextType: 'qr'
	});

	console.log('set archive done, old/new question: ', user.choices)

	// TODO: improve isNewQuestion
	dispatch({
		type: 'SET_USER_CHOICES',
		nextKey: 'oldQuestion',
		nextValue: user.choices.newQuestion
	});
}