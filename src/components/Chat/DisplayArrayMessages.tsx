import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { GlobalRowContainer } from '../Global/GlobalRowContainer'
import { Avatar } from './Avatar'
import { DisplayMessageTab } from './DisplayMessageTab'
import { StreamingMessage } from './StreamingMessage'

export function DisplayArrayMessages({ messages }) {
  const tabsLen = messages.length
  const conditionTab = messages.length > 1
  const [activeTab, setActiveTab] = useState(tabsLen + 1)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: 'SWITCH_TAB', nextTab: activeTab })
  }, [])

  return (
    <GlobalRowContainer>
      <GlobalRowContainer extraClass="fr-grid-row--center">
        <Avatar user="agent" />
        <StreamingMessage>{messages[activeTab - 1]}</StreamingMessage>
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
