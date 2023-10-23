import { DisplayArchiveBody } from "./DisplayArchiveBody";
import { DisplayArchiveHead } from "./DisplayArchiveHead";

export function DisplayArchiveTabs() {
	return (
		<table className="archive-tabs">
			<DisplayArchiveHead />
		  	<DisplayArchiveBody />
		</table>
	);
  }
  