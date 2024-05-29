import useWindowDimensions from '@utils/hooks/useWindowDimensions'
import { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import reactStringReplace from 'react-string-replace'
import { Source, SourceTooltip } from './SourceTooltip'

export function TextWithSources({ text }) {
  const [textWithSources, setTextWithSources] = useState<any | null>(null)
  const [modal, setModal] = useState({
    isOpen: false,
    content: '',
    sourceId: '',
  })
  const windowSize = useWindowDimensions()
  useEffect(() => {
    setTextWithSources(
      reactStringReplace(text, /(<ref text="[^"]+"[^<]*<\/ref>\.?)/g, (match, i) => {
        const regex = /<ref text="([^"]+)">\[?([^\]<:]{16})[^\]<]*\]?<\/ref>/
        const content = regex.exec(match)
        if (content) {
          if (windowSize.width > 992) {
            return (
              <SourceTooltip
                key={i}
                id={`tooltip-${i + text.length}`}
                content={content[1]}
                sourceId={content[2]}
              />
            )
          }
          return (
            <span
              className="fr-text--xs fr-icon-quote-fill fr-text-action-high--blue-cumulus fr-mr-2v focus:border focus:border-5"
              onClick={() =>
                setModal({ isOpen: true, content: content[1], sourceId: content[2] })
              }
            />
          )
        }
        return <></>
      })
    )
  }, [text])
  return (
    <>
      <ReactModal
        isOpen={modal.isOpen}
        onRequestClose={() => setModal({ isOpen: false, content: '', sourceId: '' })}
        style={{ overlay: { zIndex: 1000 }, content: { padding: 0, margin: 0 } }}
        shouldCloseOnOverlayClick={true}
      >
        <Source content={modal.content} sourceId={modal.sourceId} />
      </ReactModal>
      {textWithSources}
    </>
  )
}
