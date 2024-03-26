import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalRowContainer } from '../Global/GlobalRowContainer'
import { Avatar } from './Avatar'
import { DisplayMessageTab } from './DisplayMessageTab'
import { StreamingMessage } from './StreamingMessage'
import { Chunk, RootState } from '@types'

export function DisplayArrayMessages({ messages }) {
  const tabsLen = messages.length
  const conditionTab = messages.length > 1
  const [activeTab, setActiveTab] = useState(tabsLen + 1)
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)

  useEffect(() => {
    dispatch({ type: 'SWITCH_TAB', nextTab: activeTab })
  }, [])

  return (
    <GlobalRowContainer>
      <GlobalRowContainer extraClass="fr-grid-row--center bg-red-500">
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
      <SourcesAccordion chunks={user.chunks} />
    </GlobalRowContainer>
  )
}

function SourcesAccordion({ chunks }: { chunks: Chunk[] }) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)

  const handleToggleAll = () => {
    setIsAccordionOpen(!isAccordionOpen)
  }

  return (
    <div className="fr-grid-col fr-mb-2w">
      <div className={'fr-grid-row'} onClick={handleToggleAll}>
        <p
          className="fr-text-mention--  hover:cursor-pointer "
          style={{ margin: 0, padding: 0 }}
        >
          Fiches documentaires associées à la réponse
        </p>
        <span
          className={`fr-text-mention--grey fr-icon--sm fr-icon-arrow-${
            isAccordionOpen ? 'up' : 'down'
          }-s-line fr-my-1v hover:cursor-pointer`}
        ></span>
      </div>
      {chunks.slice(0, 3).map((chunk, index) => (
        <div
          className="fr-mt-1w"
          key={index}
          style={{ display: isAccordionOpen ? 'block' : 'none' }}
        >
          <SourceCard {...chunk} />
        </div>
      ))}
    </div>
  )
}

function SourceCard({
  title,
  url,
  introduction,
  text,
  context,
  surtitre,
  source,
}: Chunk) {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <div className="bg-[#f4f6ff] fr-p-2w fr-grid-row ">
        <div className="flex font-bold fr-text-title--blue-france">{'Fiche: '}</div>
        <div className="mb- text-justify  fr-text-title--blue-france">{title}</div>
      </div>
    </a>
  )
}
