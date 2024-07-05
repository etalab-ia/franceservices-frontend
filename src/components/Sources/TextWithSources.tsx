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
        /(<ref .*?>\s*\[?https?:\/\/[^\s<]*\]?\s*<\/ref>)/g,
        (match, i) => {
          const regexA =
            /<ref title="([^"]+)"\s+text="([^"]+)"\s*>\s*(https?:\/\/[^\s<]+)\s*<\/ref>/s
          const regexB =
            /<ref text="([^"]+)"\s+title="([^"]+)"\s*>\s*(https?:\/\/[^\s<]+)\s*<\/ref>/s
          const content = regexA.exec(match) || regexB.exec(match)

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
        style={{
          overlay: { zIndex: 1000, backgroundColor: 'rgba(0, 0, 0, 0.5)' },
          content: {
            padding: '20px',
            margin: 'auto',
            maxWidth: '500px',
            maxHeight: '60vh',
            overflow: 'auto',
            borderRadius: '8px',
          },
        }}
        shouldCloseOnOverlayClick={true}
      >
        <button
          type="button"
          onClick={() =>
            setModal({ isOpen: false, title: '', content: '', sourceUrl: '' })
          }
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '5',
          }}
        >
          &times;
        </button>
        <Source title={modal.title} text={modal.content} sourceUrl={modal.sourceUrl} />
      </ReactModal>
      <Linkify target="_blank">{textWithSources}</Linkify>
    </div>
  )
}
