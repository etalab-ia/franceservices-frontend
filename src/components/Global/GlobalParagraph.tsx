import Linkify from "react-linkify"

export const GlobalParagraph = ({ children, extraClass } : ) => {
	return (
		<p className={`text-justify fr-my-1w ${extraClass}`}>
			{typeof children !== "string"
				? children
				: children.split("\n").map((line, lineIndex) => (
						<Linkify target="_blank" key={lineIndex}>
							{lineIndex > 0 && <br />}
							{line}
						</Linkify>
				  ))}
		</p>
	)
}
