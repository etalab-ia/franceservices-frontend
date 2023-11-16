import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { initialChatbotMessage } from '../constants/chatbotProps';
import { DisplayChatTab } from '../components/Chat/DisplayChatTab';
import { checkConnexion } from '../utils/localStorage';

export function Chatbot() {
	const	user = useSelector((state) => state.user);
	const	auth = useSelector((state) => state.auth);
	const	dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: 'SET_USER_MODEL_NAME_CHOICE', nextModelName: 'albert-light', nextMode: 'rag', nextLimit: 9 });
		!user.messages.length && dispatch({ type: 'SET_MESSAGES', nextMessage: { text: initialChatbotMessage, sender: 'agent' } });
		checkConnexion(auth, dispatch);
	}, []);

	return <DisplayChatTab />;
}