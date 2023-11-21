import { Tag } from "@codegouvfr/react-dsfr/Tag";
import { useKeyPress } from "../../utils/manageEffects";

export function MeetingTags({ tags, setTags, field }) {

	useKeyPress((e) => {
		if (e.key === 'Enter' && e.target.name === field.name)
		{
			setTags([...tags, e.target.value]);
			e.target.value = '';
		}
	});

	const	handleClick = (e) => {
		e.preventDefault();

		e.target.name === field.name && setTags(tags.filter(tag => tag !== e.target.textContent));
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