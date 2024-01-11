import { useSelector } from "react-redux"
import { DisplaySheets } from "../Sheets/DisplaySheets"
import { GlobalColContainer } from "../Global/GlobalColContainer"
import { OneThirdScreenWidth } from "../Global/OneThirdScreenWidth"

export function ChatAdditionalContainer({ archive }) {
	return (
		<OneThirdScreenWidth>
			<GlobalColContainer>
				<DisplaySheets archive={archive} />
			</GlobalColContainer>
		</OneThirdScreenWidth>
	)
}
