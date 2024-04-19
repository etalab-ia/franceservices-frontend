import type { Message, Sheet } from '@types'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { GlobalRowContainer } from '../Global/GlobalRowContainer'
import { Avatar } from './Avatar'
import { DisplayMessageTab } from './DisplayMessageTab'
import { StreamingMessage } from './StreamingMessage'
import SourcesAccordion from './SourcesAccordion'

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
          <StreamingMessage response={message.text[activeTab - 1] ?? ''} />
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
      <div className="fr-grid-row fr-col">
        <div className="fr-col-1" />
        <div className="fr-col-11">
          {/* <SourcesAccordion sheets={message.sheets} /> */}
        </div>
      </div>
    </GlobalRowContainer>
  )
}
