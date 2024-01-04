import { Tag } from "@codegouvfr/react-dsfr/Tag";
import { useKeyPress } from "../../utils/manageEffects";
import { useEffect, useState } from "react";

export function	MeetingTags({setContext, context, field, tags }) {
	const	[toAdd, setToAdd] = useState();

	useKeyPress((e) => {
		if (e.key === 'Enter' && e.target.name === field.name)
		{
			setToAdd(e.target.value);
			e.target.value = '';
		}
	});

	useEffect(() => {
		if (!toAdd)
			return ;

		if (field.name === 'administrations')
			setContext((prevContext) => ({
				...prevContext,
				administrations: [...context.administrations, toAdd]
			}));
			else if (field.name === 'themes')
				setContext((prevContext) => ({
					...prevContext,
					themes: [...context.themes, toAdd]
				}));
	}, [toAdd])

	const	handleClick = (e) => {
		e.preventDefault();

		if (e.target.name === field.name && field.name === 'administrations')
			setContext((prevContext) => ({
				...prevContext,
				administrations: context.administrations.filter(tag => tag !== e.target.textContent)
			}));
		else if (e.target.name === field.name && field.name === 'themes')
			setContext((prevContext) => ({
				...prevContext,
				themes: context.themes.filter(tag => tag !== e.target.textContent)
			}));
	}

	return <>
        {tags.map((tag, index) => {
			return <Tag
				className={field.className}
				key={index}
				name={field.name}
				dismissible
				nativeButtonProps={{
					onClick: handleClick
                }}
            >
				{tag}
			</Tag>
		})}
	</>
}