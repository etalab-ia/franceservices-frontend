import type { Stream } from '@types'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { DisplayMessageTab } from '../Chat/DisplayMessageTab'
import { StreamingMessage } from '../Chat/StreamingMessage'
import { GlobalColContainer } from '../Global/GlobalColContainer'
import { GlobalStream } from '../Global/GlobalStream'

export function DisplayStream({ stream }: { stream: Stream }) {
  const tabsLen = stream.historyStream.length
  const [currLen, setCurrLen] = useState(tabsLen)
  const [activeTab, setActiveTab] = useState(tabsLen + 1)
  const conditionTab = !stream.isStreaming && stream.historyStream.length > 1
  const conditionStream =
    (!stream.historyStream.length || stream.response.length) &&
    stream.historyStream.length === activeTab
  const dispatch = useDispatch()

  useEffect(() => {
    if (tabsLen != currLen) setCurrLen(tabsLen)
    setActiveTab(tabsLen)
  }, [tabsLen])

  useEffect(() => {
    dispatch({ type: 'SWITCH_TAB', nextTab: activeTab })
  }, [])

  return (
    <div>
      {conditionStream ? (
        <GlobalStream response={stream.response} extraClass="streaming fr-mb-4w " />
      ) : (
        <StreamingMessage>{stream.historyStream[activeTab - 1]}</StreamingMessage>
      )}
      <DisplayMessageTab
        isDisplayable={conditionTab}
        tabsLen={tabsLen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        extraClass="fr-ml-2w"
      />
    </div>
  )
}
