import { ArchiveType, RootState } from 'types'
import { GlobalColContainer } from '../Global/GlobalColContainer'
import { OneThirdScreenWidth } from '../Global/OneThirdScreenWidth'
import { DisplaySheets } from '../Sheets/DisplaySheets'
import { UsefulLinks } from './UsefulLinks'
import { useSelector } from 'react-redux'

/*****************************************************************************************
	
	COMPONENTS:

		** The right pan of meeting, sheets and webservices
		
		**	DisplaySheets: set & display sheets cards from GET /indexes sheets

		**	UsefulLinks: set first webservices from GET /indexes sheets

		**	archive is undefined if the user is on editing meeting page	

 *****************************************************************************************/

export function MeetingAdditionalResponse({
  archive,
}: { archive: ArchiveType | undefined }) {
  const user = useSelector((state: RootState) => state.user)
  return (
    <OneThirdScreenWidth>
      <DisplaySheets archive={archive ?? undefined} />
      <GlobalColContainer>
        <UsefulLinks webservices={user.webservices} />
      </GlobalColContainer>
    </OneThirdScreenWidth>
  )
}
