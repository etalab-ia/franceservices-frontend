import { useEffect, useState } from "react"
import { satisfiedButtons, unsatisfiedButtons } from "../../constants/feedback"
import { useDispatch } from "react-redux"
import { useKeyPress } from "../../utils/manageEffects"
import { UserFeedbackResume } from "./UserFeedbackResume"
import { useSelector } from "react-redux"
import { ButtonsOptions } from "./ButtonsOptions"
import { ConfirmationButton } from "./ConfirmationButton"
import { InputOption } from "./InputOption"
import { GlobalColContainer } from "../Global/GlobalColContainer"
import { InitialFeedback } from "../../utils/feedback"

export function UserFeedbackOptions({ activeTab, isFirst, feedback, setFeedback }) {
	const [reasons, setReasons] = useState([])
	const [otherReason, setOtherReason] = useState("")
	const [buttonsType, setButtonsType] = useState(
		activeTab === 0 ? satisfiedButtons : unsatisfiedButtons
	)
	const dispatch = useDispatch()

	useEffect(() => {
		setFeedback(InitialFeedback)
		setReasons([])
		setButtonsType(activeTab === 0 ? satisfiedButtons : unsatisfiedButtons)
	}, [activeTab])

	useKeyPress((e) => {
		if (e.key === "Enter" && e.target.name === "otherReason" && otherReason) {
			otherReason &&
				!reasons.includes(otherReason) &&
				setFeedback({
					...feedback,
					reasons: [...feedback.reasons, otherReason],
				})
			e.target.value = ""
			setOtherReason("")
			setReasons(reasons.filter((reason) => reason !== "Autre raison"))
		}
	})

	useEffect(() => {
		setFeedback({
			...feedback,
			reasons: reasons,
		})
	}, [reasons])

	return (
		<GlobalColContainer>
			<ButtonsOptions
				isFirst={isFirst}
				buttonsType={buttonsType}
				reasons={reasons}
				setReasons={setReasons}
			/>
			<InputOption reasons={reasons} setOtherReason={setOtherReason} isFirst={isFirst} />
			<UserFeedbackResume feedback={feedback} />
			<ConfirmationButton
				reasons={reasons}
				otherReason={otherReason}
				feedback={feedback}
				setFeedback={setFeedback}
			/>
		</GlobalColContainer>
	)
}
