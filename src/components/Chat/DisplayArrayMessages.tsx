import type { Message, Sheet } from '@types'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { GlobalRowContainer } from '../Global/GlobalRowContainer'
import { Avatar } from './Avatar'
import { DisplayMessageTab } from './DisplayMessageTab'
import { GlobalParagraph } from 'components/Global/GlobalParagraph'

export function DisplayArrayMessages({ message }: { message: Message }) {
  const tabsLen = message.text.length
  const conditionTab = message.text.length > 1
  const [activeTab, setActiveTab] = useState(tabsLen + 1)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: 'SWITCH_TAB', nextTab: activeTab })
  }, [])
  return (
    <GlobalRowContainer>
      <GlobalRowContainer extraClass="fr-grid-row--center ">
        <div className="fr-col-1 hide-on-smallscreen">
          <Avatar user="agent" />
        </div>
        <div className="fr-col-11 fr-col-md-10">
          <GlobalParagraph>{message.text[0]}</GlobalParagraph>
        </div>
        <div className="fr-col-1 hide-on-smallscreen" />
      </GlobalRowContainer>
      <DisplayMessageTab
        isDisplayable={conditionTab}
        tabsLen={tabsLen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        extraClass="fr-ml-10w"
      />
    </GlobalRowContainer>
  )
}
