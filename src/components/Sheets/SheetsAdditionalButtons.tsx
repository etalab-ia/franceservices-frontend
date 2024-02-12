import { Dispatch, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ArchiveType, RootState } from 'types'
import { useApiUrls, streamUrl } from '../../constants/api'
import { sheetsTitle } from '../../constants/sheets'
import { CurrQuestionContext } from '../../utils/context/questionContext'
import { emitCloseStream } from '../../utils/eventsEmitter'
import { generateStream } from '../../utils/hooks'
import { getIndexes } from '../../utils/setData'
import { GlobalColContainer } from '../Global/GlobalColContainer'
import { GlobalRowContainer } from '../Global/GlobalRowContainer'
import { GlobalSecondaryTitle } from '../Global/GlobalSecondaryTitle'
import { ModifyButton } from '../Global/ModifyButton'

/*****************************************************************************************
	
	USEEFFECT [isModifiable]: set deleted sheets:
		- if a new deleted sheet has been added from initial main sheets
		- no regeneration on archive view
		- user was on edition mode and has saved his/her changes

	USEEFFECT [deletedSheets]: regenerate stream

 *****************************************************************************************/

export const SheetsAdditionalButtons = ({
  isModifiable,
  setIsModifiable,
  archive,
}: {
  isModifiable: boolean
  setIsModifiable: React.Dispatch<React.SetStateAction<boolean>>
  archive: ArchiveType | undefined
}) => {
  const buttonTitle = isModifiable ? 'Enregistrer' : 'Modifier la section'
  const buttonIcon = isModifiable
    ? 'fr-icon-save-3-fill fr-icon--sm flex  items-center'
    : 'fr-icon-settings-5-fill fr-icon--sm flex  items-center'
  const user = useSelector((state: RootState) => state.user)
  const [deletedSheets, setDeletedSheets] = useState([])
  const dispatch = useDispatch()
  const { currQuestion, updateCurrQuestion } = useContext(CurrQuestionContext)
  const { indexesUrl } = useApiUrls()
  const handleClick = () => {
    setIsModifiable(!isModifiable)
  }

  useEffect(() => {
    if (
      !archive &&
      !isModifiable &&
      JSON.stringify(deletedSheets) !== JSON.stringify(user.question.must_not_sids)
    )
      setDeletedSheets(user.question.must_not_sids)
  }, [isModifiable])

  useEffect(() => {
    if (archive) return

    if (!deletedSheets.length && !currQuestion.must_not_sids.length) return

    updateCurrQuestion({
      ...currQuestion,
      must_not_sids: deletedSheets,
    })
  }, [deletedSheets])

  useEffect(() => {
    if (archive || !user.chatId) return

    emitCloseStream()
    generateStream(currQuestion, dispatch, user.chatId, false)
  }, [currQuestion])

  useEffect(() => {
    if (!user.streamId || archive || !currQuestion.query) return

    const data = {
      question: currQuestion.query,
      must_not_sids: user.question.must_not_sids,
    }
    getIndexes(
      data,
      dispatch,
      'chunks',
      currQuestion.limit,
      JSON.stringify(user.streamId),
      indexesUrl
    )
  }, [user.streamId, currQuestion])

  return (
    <div className="fr-background-alt--blue-france">
      {/*       <GlobalSecondaryTitle>{sheetsTitle}</GlobalSecondaryTitle>
      <>
        {!archive && (
          <ModifyButton
            handleClick={handleClick}
            text={buttonTitle}
            extraClass={buttonIcon}
          />
        )}
      </> */}
    </div>
  )
}
