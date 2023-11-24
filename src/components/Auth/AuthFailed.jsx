import { authFailedNotificationRole } from "../../constants/connexion";

export function	AuthFailed({children}) {

	return (
		<p role={authFailedNotificationRole} 
			className="fr-mb-1v fr-info-text"
		>
			{children}
		</p> 
	)
}