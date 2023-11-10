import { authFailedNotificationRole } from "../../constants/connexion";

export function	AuthFailed({children}) {

	return (
		<p role={authFailedNotificationRole} className="login-failed fr-info-text">
			{children}
		</p> 
	)
}