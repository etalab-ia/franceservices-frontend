import { primaryButtons, satisfactionButton, secondaryButtons } from "../../constants/feedback"
import { GlobalRowContainer } from "../Global/GlobalRowContainer"

export function UserFeedbackSatisfaction({ isFirst, feedback, setFeedback }) {
	const buttons = isFirst ? primaryButtons : secondaryButtons

	const handleClick = (isGood: boolean | null) => {
		if (isGood === feedback.isGood) return
		setFeedback({
			...feedback,
			isGood: isGood,
		})
	}

	return (
		<GlobalRowContainer>
			{buttons.map((button, index) => {
				return (
					<button
						title={button.type}
						onClick={() => handleClick(index)}
						key={index}
						className={`user-feedback-buttons ${
							index === feedback.isGood ? "bg-purple" : "bg-white"
						}`}
						disabled={feedback.isConfirmed}
					>
						<img
							alt={satisfactionButton(button.type)}
							className={index === feedback.isGood ? "mr-2 brightness-0 invert-[1]" : "mr-2"}
							src={button.img}
						/>
						<p className={`${index === feedback.isGood ? "text-white" : "text-purple"}`}>
							{button.name}
						</p>
					</button>
				)
			})}
		</GlobalRowContainer>
	)
}
