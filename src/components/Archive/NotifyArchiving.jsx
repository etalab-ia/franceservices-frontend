import { useEffect } from "react";
import { notifyArchiving } from "../../constants/chatbotProps";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
export function NotifyArchiving() {

    const	archive = useSelector((state) => state.archive);
    const   history = useSelector((state) => state.history);
    const   stream = useSelector((state) => state.stream);
	const	dispatch = useDispatch();
	// TODO: change with new parameters receive from getSheets()
	const	tags = ['Allocations destinées aux familles', 'Particulier'];

    // console.log('messages: ', history.messages)
    // console.log('stream: ', stream.historyStream)

    var test = [];
    test = [test.concat(history.messages, stream.historyStream)];

    // console.log('test: ', test)

    useEffect(() => { dispatch({ 
        type: 'SET_ARCHIVE', 
        nextDate: new Date().toLocaleDateString('fr'), 
        nextThemes: tags, 
        nextSource: true,
        nextMessages: { history: history.messages[0], stream: { text: stream.historyStream[0], sender: 'agent' } }
    })
        console.log('archive is: ', archive)
}, [])

	return (
        <div>
            {notifyArchiving(`Archive n°${archive.length}`)}
            <div className="ml-[114px] mt-[36px] border-t-4 border-[#000091] w-[792px]"></div>
        </div>
	);
}