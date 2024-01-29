import { For } from "million/react"

export const GlobalStream = ({
	response,
	extraClass,
}: { response: any[]; extraClass?: string }) => {
	return (
		<div className={`text-justify ${extraClass}`}>
			<For each={response}>
				{(item, index) => (
					<span key={index}>
						{item.split("\n").map((line, lineIndex) => (
							<span key={lineIndex}>
								{lineIndex > 0 && <br />}
								{line}
							</span>
						))}
					</span>
				)}
			</For>
		</div>
	)
}
