import useWindowDimensions from '@utils/hooks/useWindowDimensions'
import { useEffect, useState } from 'react'
import Linkify from 'react-linkify'
import ReactModal from 'react-modal'
import reactStringReplace from 'react-string-replace'
import { Source, SourceTooltip } from './SourceTooltip'

export function TextWithSources({
  text,
  extraClass,
}: { text: string; extraClass?: string }) {
  const [textWithSources, setTextWithSources] = useState<any | null>(null)
  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    content: '',
    sourceUrl: '',
  })
  const windowSize = useWindowDimensions()
  useEffect(() => {
    setTextWithSources(
      reactStringReplace(
        text,
        /(<ref title="[^"]*"\s* text="[^"]*"\s*>\s*\[?https?:\/\/[^\s<]*\]?\s*<\/ref>)/g,
        (match, i) => {
          const regex =
            /<ref title="([^"]+)"\s+text="([^"]+)"\s*>\s*(https?:\/\/[^\s<]+)\s*<\/ref>/s
          const content = regex.exec(match)

          if (content) {
            if (windowSize.width > 992) {
              return (
                <SourceTooltip
                  key={i}
                  id={`tooltip-${i + text.length}`}
                  title={content[1]}
                  text={content[2]}
                  sourceUrl={content[3]}
                />
              )
            }
            return (
              <span
                key={i}
                className="fr-text--xs fr-icon-quote-fill fr-text-action-high--blue-cumulus fr-mr-2v focus:border focus:border-5"
                onClick={() =>
                  setModal({
                    isOpen: true,
                    title: content[1],
                    content: content[2],
                    sourceUrl: content[3],
                  })
                }
              />
            )
          }
          return <></>
        }
      )
    )
  }, [text, windowSize.width])

  return (
    <div className={`${extraClass} `}>
      <ReactModal
        isOpen={modal.isOpen}
        onRequestClose={() =>
          setModal({ isOpen: false, title: '', content: '', sourceUrl: '' })
        }
        style={{ overlay: { zIndex: 1000 }, content: { padding: 0, margin: 0 } }}
        shouldCloseOnOverlayClick={true}
      >
        <Source title={modal.title} content={modal.content} sourceUrl={modal.sourceUrl} />
      </ReactModal>
      <Linkify target="_blank">{textWithSources}</Linkify>
    </div>
  )
}
