import { useEffect } from "react";
import { notifyArchiving } from "../../constants/chatbotProps";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
export function NotifyArchiving() {

    const	archive = useSelector((state) => state.archive);
	const	dispatch = useDispatch();
	// TODO: change with new parameters receive from getSheets()
	const	tags = ['Allocations destinées aux familles', 'Particulier'];

    console.log('bef archive: ', archive);

    useEffect(() => { dispatch({ 
        type: 'SET_ARCHIVE', 
        nextDate: new Date().toLocaleDateString('fr'), 
        nextThemes: tags, 
        nextSource: true, 
    }) }, [])

    console.log('af archive: ', archive);

	return (
        <div>
            {notifyArchiving(`Archive n°${archive.length}`)}
            <div className="ml-[114px] mt-[36px] border-t-4 border-[#000091] w-[792px]"></div>
        </div>
	);
}