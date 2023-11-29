import { useDispatch, useSelector } from "react-redux";
import { GlobalRowContainer } from "../Global/GlobalRowContainer";
import { useFetch } from "../../utils/hooks";
import { apiUrl } from "../../constants/api";
import { setHeaders } from "../../utils/setData";

export function MeetingEditQuestion({ setGenerate }) {
	const	dispatch = useDispatch();
	const	auth = useSelector((state) => state.auth);
	const	stream = useSelector((state) => state.stream);
	
	const   handleClick = async() => {
		// const	resp = await useFetch("https://albert.etalab.gouv.fr/api/v2/streams", 'GET', {headers: {
		// 	'Authorization': `Bearer ${auth.userToken}`
		// }, data: null}, dispatch);
		// console.log('res: ', resp)

		const	res = await useFetch(`${apiUrl}/${stream.id}/stop`, 'POST', {
			data: { stream_id: stream.id },
			headers: setHeaders(auth.userToken, false)
		}, dispatch);

		dispatch({ type: 'SET_INITIAL_STREAM'});
		setGenerate(false);
	}

	return <GlobalRowContainer>
		<p
			className="fr-pt-1w fr-text--xs underline cursor-pointer"
			onClick={handleClick}
		>
			Modifier
		</p>
	</GlobalRowContainer>
}