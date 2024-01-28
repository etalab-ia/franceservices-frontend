import { Tag } from "@codegouvfr/react-dsfr/Tag"

export function MeetingTags({ setContext, context, field, tags }) {
	const handleClick = (e) => {
		e.preventDefault()

		if (e.target.name === field.name && field.name === "administrations")
			setContext((prevContext) => ({
				...prevContext,
				administrations: context.administrations.filter((tag) => tag !== e.target.textContent),
			}))
		else if (e.target.name === field.name && field.name === "themes")
			setContext((prevContext) => ({
				...prevContext,
				themes: context.themes.filter((tag) => tag !== e.target.textContent),
			}))
	}

	return (
		<>
			{tags.map((tag, index) => {
				return (
					<Tag
						className={field.className}
						key={index}
						// @ts-expect-error TS(2322): Type '{ children: any; className: any; key: any; n... Remove this comment to see the full error message
						name={field.name}
						dismissible
						nativeButtonProps={{
							onClick: handleClick,
						}}
					>
						{tag}
					</Tag>
				)
			})}
		</>
	)
}
