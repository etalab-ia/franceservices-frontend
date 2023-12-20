import thumbsUp from "../../../icons/feedbacks/thumbsUp.svg";
import thumbsDown from "../../../icons/feedbacks/thumbsDown.svg";

export const    MeetingFeedback = () => {

	const	handleClick = () => {
		// TODO: WHEN BACK IS READY: sent boolean to /feedback endpoint
		console.log('click');
	}

	return <div className="fr-mt-2w">
		<button onClick={handleClick} className="fr-mr-1w border border-[#DDD]">
			<img className="fr-m-1w" src={thumbsUp} alt="Feedback positif"/>
		</button>
		<button onClick={handleClick} className="border border-[#DDD]">
			<img className="fr-m-1w" src={thumbsDown} alt="Feedback négatif"/>
		</button>
	</div>
}