export const    setArchive = (dispatch, stream, newQuestion, choices, sheets) => {
	const	themesArrays = sheets.map((sheet) => sheet.theme.split(', '));
	const	uniqueThemesSet = Array.from(new Set(themesArrays.flat()));
	const	selected = uniqueThemesSet.filter((theme) => theme !== "");

	dispatch({ 
		type: 'SET_ARCHIVE',
		nextDate: new Date().toLocaleDateString('fr'), 
		nextTags: selected,
		nextAgentResponse: stream.historyStream,
		nextChoices: choices,
		nextSheets: sheets,
	});
	dispatch({ type: 'SET_USER_CHOICES', nextKey: 'oldQuestion', nextValue: newQuestion });
}