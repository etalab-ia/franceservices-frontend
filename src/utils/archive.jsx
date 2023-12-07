export const    setArchive = (dispatch, stream, user, type) => {
	const	themesArrays = user.sheets.map((sheet) => sheet.theme && sheet.theme.split(', '));
	const	uniqueThemesSet = Array.from(new Set(themesArrays.flat()));
	const	selected = uniqueThemesSet.filter((theme) => theme !== "" && theme !== undefined);

	if (user.choices.oldQuestion === user.choices.newQuestion && type === 'qr')
		return ;
	
	dispatch({ 
		type: 'SET_ARCHIVE',
		nextDate: new Date().toLocaleDateString('fr'), 
		nextTags: selected,
		nextSheets: user.sheets,
		nextMessages: [{ text: user.originQuestion, sender: 'user' }, { text: stream.historyStream, sender: 'agent' }],
		nextType: type
	});

	// TODO: improve isNewQuestion
	dispatch({
		type: 'SET_USER_CHOICES',
		nextKey: 'oldQuestion',
		nextValue: user.choices.newQuestion
	});
}