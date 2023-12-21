import thumbsUp from "../../../icons/feedbacks/thumbsUp.svg";
import thumbsDown from "../../../icons/feedbacks/thumbsDown.svg";
import { useFetch } from "../../utils/hooks";
import { feedbackUrl } from "../../constants/api";
import { setHeaders } from "../../utils/setData";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ButtonInformation } from "../Global/ButtonInformation";
import { thankFeedback } from "../../constants/feedback";

export const    MeetingFeedback = () => {
	const	userToken = useSelector((state) => state.auth.userToken);
	const	dispatch = useDispatch();
	const	[isClicked, setIsClicked] = useState(false);

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
		
		setIsClicked(true);

		setTimeout(() => {
			setIsClicked(false);
		}, 5000);
	}

	return <div className="fr-mt-2w">
		<button onClick={() => handleClick(true)} className="fr-mr-1w border border-[#DDD]">
			<img className="fr-m-1w" src={thumbsUp} alt="Feedback positif"/>
		</button>
		<button onClick={() => handleClick(false)} className="border border-[#DDD]">
			<img className="fr-m-1w" src={thumbsDown} alt="Feedback négatif"/>
		</button>
		{isClicked && <ButtonInformation>{thankFeedback}</ButtonInformation>}
	</div>
}