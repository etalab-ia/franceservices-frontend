import { animated } from '@react-spring/web';

export const	ButtonsOptions = ({ isFirst, buttonsType, reasons, setReasons, dispatch }) => {

	const	handleClick = (index) => {
		if (reasons.includes(buttonsType[index]))
		{
			setReasons(reasons.filter(reason => reason !== buttonsType[index]));
			dispatch({ type: 'RM_FEEDBACK', rmFeedback: buttonsType[index] });
		}
		else
		{
			setReasons([...reasons, buttonsType[index]]);
			if (buttonsType[index] === 'Autre raison')
				return ;
			dispatch({ type: 'SET_NEW_FEEDBACK', nextFeedback: buttonsType[index] });
		}
	}

	return (
		<div className="wrap-message">
			{isFirst && buttonsType.map((button, index) => {
				const classNames = reasons.includes(buttonsType[index]) ? "bg-purple" : "bg-[white]";
				
				return <div key={index}>
					<animated.button
						className={`user-feedback-buttons ${classNames}`}
						onClick={() => handleClick(index)}
					>
						<p className={reasons.includes(buttonsType[index]) ? "text-white" : "text-purple"}>
							{button}
						</p>
					</animated.button>
				</div>
			})}
		</div>	
	)
}