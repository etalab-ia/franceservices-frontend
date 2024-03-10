import { useSelector } from 'react-redux'
import { GlobalColContainer } from '../Global/GlobalColContainer'
import { OneThirdScreenWidth } from '../Global/OneThirdScreenWidth'
import { DisplaySheets } from '../Sheets/DisplaySheets'

/*
 * Wrapper around sheets
 */
export function ChatAdditionalContainer({ archive }) {
  return (
    <OneThirdScreenWidth>
      <GlobalColContainer>
        <DisplaySheets archive={archive} />
      </GlobalColContainer>
    </OneThirdScreenWidth>
  )
}
