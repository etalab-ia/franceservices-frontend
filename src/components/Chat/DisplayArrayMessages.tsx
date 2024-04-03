import type { Chunk, Message, RootState } from '@types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalRowContainer } from '../Global/GlobalRowContainer'
import { Avatar } from './Avatar'
import { DisplayMessageTab } from './DisplayMessageTab'
import { StreamingMessage } from './StreamingMessage'

export function DisplayArrayMessages({ message }: { message: Message }) {
  const tabsLen = message.text.length
  const conditionTab = message.text.length > 1
  const [activeTab, setActiveTab] = useState(tabsLen + 1)
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)

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
          <SourcesAccordion chunks={message.chunks} />
        </div>
      </div>
    </GlobalRowContainer>
  )
}

export function SourcesAccordion({ chunks }: { chunks: Chunk[] }) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)

  const handleToggleAll = () => {
    setIsAccordionOpen(!isAccordionOpen)
  }

  return (
    <div className="fr-grid-col fr-mb-2w">
      <div className={'fr-grid-row '} onClick={handleToggleAll}>
        <p
          className="fr-text-mention--  hover:cursor-pointer font-bold"
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
      <div className="fr-grid-row gap-4">
        {chunks.slice(0, 3).map((chunk, index) => (
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
    <a href={url} target="_blank" rel="noreferrer" className="external-link-icon ">
      <div className="bg-[#f4f6ff] fr-p-2w  w-[248px] h-[128px] rounded transition ease-in-out hover:opacity-70 hover:scale-105 active:scale-100 ">
        <div className="flex font-bold fr-mb-2v fr-text-title--blue-france">
          {'Fiche: \n'}
        </div>
        <div className="fr-text-title--blue-france line-clamp-3">{title}</div>
      </div>
    </a>
  )
}
