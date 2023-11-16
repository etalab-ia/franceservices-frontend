import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkConnexion } from '../utils/localStorage';
import { DisplayArchiveTabs } from '../components/Archive/DisplayArchiveTab';

export function History() {
	const	tabs = useSelector((state) => state.tabs);
	const	auth = useSelector((state) => state.auth);
	const	dispatch = useDispatch();

  useEffect(() => { checkConnexion(auth, dispatch); }, []);

	//	TODO: change height
	return (
		<div className={`wrapper-container col-message min-h-[654px] items-center mt-4`}>
			<DisplayArchiveTabs />
		</div>
	);
}
