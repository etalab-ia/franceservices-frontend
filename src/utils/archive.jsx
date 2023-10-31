export const    setArchive = (dispatch, history, stream, newQuestion) => {
    const	shuffled = tags.sort(() => 0.5 - Math.random());
	const	selected = shuffled.slice(0, 3);
    const   userMessage = history.messages[history.messages.length - 1];
    const   agentMessage = { text: stream.historyStream[0], sender: 'agent' };
	const	updatedMessage = [ userMessage, agentMessage ];

	dispatch({ 
		type: 'SET_ARCHIVE',
		nextDate: new Date().toLocaleDateString('fr'), 
		nextThemes: selected,
		nextMessages: updatedMessage,
	});
	dispatch({ type: 'RESET_RESSOURCE'});
	dispatch({ type: 'SET_USER_CHOICES', nextKey: 'oldQuestion', nextValue: newQuestion });
}