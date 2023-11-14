import React, { useEffect } from 'react'
import { Banner } from '../components/Global/Banner';
import { MessagesContainer } from '../components/Chat/MessagesContainer';
import { useDispatch, useSelector } from 'react-redux';
import { initialChatbotMessage } from '../constants/chatbotProps';

export function Chatbot() {
	const	user = useSelector((state) => state.user);
	const	dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: 'SET_USER_MODEL_NAME_CHOICE', nextModelName: 'albert-light', nextMode: 'rag', nextLimit: 5 });
		!user.messages.length && dispatch({ type: 'SET_MESSAGES', nextMessage: { text: initialChatbotMessage, sender: 'agent' } });
	}, [])

	return (
		<>
			<MessagesContainer />
		</>
	);
}