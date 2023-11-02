import { tags } from '../constants/tags';

export const    setArchive = (dispatch, stream, newQuestion, choices) => {
    const	shuffled = tags.sort(() => 0.5 - Math.random());
	const	selected = shuffled.slice(0, 3);

	dispatch({ 
		type: 'SET_ARCHIVE',
		nextDate: new Date().toLocaleDateString('fr'), 
		nextTags: selected,
		nextAgentResponse: stream.historyStream,
		nextChoices: choices,
	});
	dispatch({ type: 'SET_USER_CHOICES', nextKey: 'oldQuestion', nextValue: newQuestion });
}