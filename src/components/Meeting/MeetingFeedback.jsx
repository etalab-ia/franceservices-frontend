import thumbsUp from "../../../icons/feedbacks/thumbsUp.svg";
import thumbsDown from "../../../icons/feedbacks/thumbsDown.svg";
import { useFetch } from "../../utils/hooks";
import { feedbackUrl } from "../../constants/api";
// import { setHeaders } from "../../utils/setData";
// import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ButtonInformation } from "../Global/ButtonInformation";
import { thankFeedback } from "../../constants/feedback";
import { NOT_SET } from "../../constants/status";
import { GlobalParagraph } from "../Global/GlobalParagraph";

export const    MeetingFeedback = () => {
	// const	userToken = useSelector((state) => state.auth.userToken);
	const	[isClicked, setIsClicked] = useState(NOT_SET);
	// const	dispatch = useDispatch();

	const	handleClick = (isGood) => {
		// TODO: WHEN BACK IS READY: sent boolean to /feedback endpoint
		
		// const	data = {
		// 	isGood: isGood,
		// 	message: '',
		// 	reasons: ''
		// }

		// useFetch(`${feedbackUrl}/${chat_id}/${stream_id}`, 'POST', {
		// 	data: data,
		// 	headers: setHeaders(userToken, false)
		// }, dispatch);

		setIsClicked(isGood);
	}

	return <div className="fr-mt-2w">
		<button onClick={() => handleClick(true)} className={`fr-mr-1w border border-[#DDD] ${isClicked && isClicked !== NOT_SET ? 'bg-purple' : 'bg-white'}`}>
			<img className={`fr-m-1w ${isClicked && isClicked !== NOT_SET ? "mr-2 brightness-0 invert-[1]" : "mr-2"}`} src={thumbsUp} alt="Feedback positif"/>
		</button>
		<button onClick={() => handleClick(false)} className={`fr-mr-1w border border-[#DDD] ${!isClicked ? 'bg-purple' : 'bg-white'}`}>
			<img className={`fr-m-1w ${!isClicked ? "mr-2 brightness-0 invert-[1]" : "mr-2"}`} src={thumbsDown} alt="Feedback négatif"/>
		</button>
		{isClicked !== NOT_SET && <GlobalParagraph extraClass='fr-text--xs'>{thankFeedback}</GlobalParagraph>}
	</div>
}