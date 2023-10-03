import React from 'react'
import { chatbotProps } from '../constants/chatbotProps';
import { Breadcrumb } from "@codegouvfr/react-dsfr/Breadcrumb";

export function Banner() {

	return (
		<div className='banner-bot'>
			<div>
				<h1 className='main-title'>{chatbotProps.mainTitle}</h1>
				<Breadcrumb className='breadcrumb-container'
					currentPageLabel="Chat administratif"
					homeLinkProps={{ to: '/' }}
					segments={[{
							label: 'Trouver des informations',
							linkProps: {}
					},]}
				/>
			</div>
			<p className='subtitle'>{chatbotProps.subtitle}</p>
		</div>
	);
}