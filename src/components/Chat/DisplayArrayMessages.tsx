import type { Message, Sheet } from '@types'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { GlobalRowContainer } from '../Global/GlobalRowContainer'
import { Avatar } from './Avatar'
import { DisplayMessageTab } from './DisplayMessageTab'
import { StreamingMessage } from './StreamingMessage'

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
          <StreamingMessage>{message.text[activeTab - 1]}</StreamingMessage>
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
          <SourcesAccordion sheets={message.sheets} />
        </div>
      </div>
    </GlobalRowContainer>
  )
}

export function SourcesAccordion({ sheets }: { sheets: Sheet[] }) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)

  const handleToggleAll = () => {
    setIsAccordionOpen(!isAccordionOpen)
  }

  return (
    <div className="fr-mb-2w">
      <div className={'fr-grid-row'} onClick={handleToggleAll}>
        <p className="font-bold hover:cursor-pointer" style={{ margin: 0, padding: 0 }}>
          Fiches documentaires associées à la réponse
        </p>
        <span
          className={`fr-text-mention--grey fr-icon--sm fr-icon-arrow-${
            isAccordionOpen ? 'up' : 'down'
          }-s-line fr-my-1v hover:cursor-pointer`}
        ></span>
      </div>
      <div className="fr-grid-row gap-4">
        {sheets.slice(0, 3).map((chunk, index) => (
          <div
            className="fr-mt-1w"
            key={index}
            style={{ display: isAccordionOpen ? 'block' : 'none' }}
          >
            <SourceCard title={chunk.title} url={chunk.url} />
          </div>
        ))}
      </div>
    </div>
  )
}

function SourceCard({ title, url }: { title: string; url: string }) {
  return (
    <a href={url} target="_blank" rel="noreferrer" className="external-link-icon">
      <div className="fr-p-2w h-[128px] w-[248px] rounded bg-[#f4f6ff] transition ease-in-out active:scale-100 hover:scale-105 hover:opacity-70">
        <div className="fr-mb-2v fr-text-title--blue-france flex font-bold">
          {'Fiche: \n'}
        </div>
        <div className="fr-text-title--blue-france line-clamp-3">{title}</div>
      </div>
    </a>
  )
}
