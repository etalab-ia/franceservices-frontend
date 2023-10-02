import React from 'react'
import { chatbotProps } from '../constants/chatbotProps';

export function Banner() {

	return (
		<div className='banner-bot'>
			<h1 className='main-title'>{chatbotProps.mainTitle}</h1>
			<p className='subtitle'>{chatbotProps.subtitle}</p>
		</div>
	);
}