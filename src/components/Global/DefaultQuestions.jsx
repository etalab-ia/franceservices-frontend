import { useDispatch, useSelector } from "react-redux";
import { defaultQuestions } from "../../constants/chatbotProps"

export const    DefaultQuestions = () => {
    const   dispatch = useDispatch();
    const   stream = useSelector((state) => state.stream);

    const   handleClick = (question) => {
        stream.historyStream[0] && dispatch({ type: 'SET_MESSAGES', nextMessage: { text: stream.historyStream[0], sender: 'agent' } });
        dispatch({ type: 'SET_USER_TEXT', nextUserText: question });
        dispatch({ type: 'SET_MESSAGES', nextMessage: { text: question, sender: 'user' } });
    }

    return (
        <>
        {!stream.isStreaming ? 
        <div className="mb-4 flex justify-center">
            {defaultQuestions.map((question, index) => {
                return <button key={index} onClick={() => handleClick(question)} className="user-feedback-buttons max-h-fit text-sm">{question}</button>
            })}
        </div>
            : <></>
        }</>
    )
}