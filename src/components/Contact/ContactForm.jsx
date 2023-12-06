import { useEffect, useState } from 'react';
import { ContactButton } from './ContactButton';
import { UserInformation } from './UserInformation';
import { UserMessage } from './UserMessage';

export function ContactForm() {
	const	[title, setTitle] = useState('');
	const	[administration, setAdministration] = useState('');
	const	[message, setMessage] = useState('');
	const	[name, setName] = useState('');
	const	[isCompleted, setIsCompleted] = useState(false);

	const	handleChange = (e) => {
		console.log(e.target.name)
		if (e.target.name === "title")
			setTitle(e.target.value);
		else if (e.target.name === "administration")
			setAdministration(e.target.value);
		else if (e.target.name === "name")
			setName(e.target.value);
		else
			setMessage(e.target.value);
	}

	useEffect(() => {
		if (title.length && administration.length && message.length && name.length)
			setIsCompleted(true);
		console.log('name: ', name)
	}, [title, administration, message, name]);

	return (
		<div className='fr-mx-10w'>
			<UserInformation handleChange={handleChange}/>
			<UserMessage handleChange={handleChange}/>
			<ContactButton
				isDisable={!isCompleted}
				administration={administration}
				title={title}
				message={message}
				name={name}
			/>
		</div>
	)
}