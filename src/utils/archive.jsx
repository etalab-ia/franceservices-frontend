import { tags } from '../constants/tags';

export const    setArchive = (dispatch, history, newQuestion, choices) => {
    const	shuffled = tags.sort(() => 0.5 - Math.random());
	const	selected = shuffled.slice(0, 3);
	const	updatedMessage = [history.messages[history.messages.length - 1]];

	dispatch({ 
		type: 'SET_ARCHIVE',
		nextDate: new Date().toLocaleDateString('fr'), 
		nextThemes: selected,
		nextMessages: updatedMessage,
		nextChoices: choices,
	});
	dispatch({ type: 'SET_USER_CHOICES', nextKey: 'oldQuestion', nextValue: newQuestion });
}