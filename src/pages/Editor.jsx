import React, { useEffect } from 'react'
import { Banner } from '../components/Global/Banner';
import { MessagesContainer } from '../components/Chat/MessagesContainer';
import { useDispatch, useSelector } from 'react-redux';
import { initialEditorMessage } from '../constants/chatbotProps';

export function Editor() {
	const	user = useSelector((state) => state.user);
	const	dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: 'SET_USER_MODEL_NAME_CHOICE', nextModelName: 'fabrique-reference', nextMode: 'simple', nextLimit: 0 });
		!user.messages.length && dispatch({ type: 'SET_MESSAGES', nextMessage: { text: initialEditorMessage, sender: 'agent' } });
	}, []);

	return (
		<>
			<MessagesContainer />
		</>
	);
}