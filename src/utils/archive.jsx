export const    setArchive = (dispatch, stream, newQuestion, choices, sheets) => {
	const	themesArrays = sheets.map((sheet) => sheet.theme.split(', '));
	const	uniqueThemesSet = new Set(themesArrays.flat());
	const	selected = Array.from(uniqueThemesSet);

	dispatch({ 
		type: 'SET_ARCHIVE',
		nextDate: new Date().toLocaleDateString('fr'), 
		nextTags: selected,
		nextAgentResponse: stream.historyStream,
		nextChoices: choices,
	});
	dispatch({ type: 'SET_USER_CHOICES', nextKey: 'oldQuestion', nextValue: newQuestion });
}