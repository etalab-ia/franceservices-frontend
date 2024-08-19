import useWindowDimensions from '@utils/hooks/useWindowDimensions'
import { useEffect, useState } from 'react'
import Linkify from 'react-linkify'
import ReactModal from 'react-modal'
import reactStringReplace from 'react-string-replace'
import { Source, SourceTooltip } from './SourceTooltip'

function parseRef(refString: string) {
  const ref = refString.match(/<ref\s(.*?)>(.*?)<\/ref>/s)
  if (!ref) return null

  const attributes = ref[1]
  const content = ref[2]

  const getText = (attr: string) => {
    const match = attributes.match(new RegExp(`${attr}="(.*?)"`))
    if (match) {
      // Remove escaped quotes and unescape other characters
      return match[1].replace(/\\"/g, '"').replace(/\\(.)/g, '$1')
    }
    return ''
  }

  return {
    text: getText('text'),
    title: getText('title'),
    sourceUrl: content.trim(),
  }
}

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
      reactStringReplace(text, /(<ref[\s\S]*?<\/ref>)/g, (match, i) => {
        const parsed = parseRef(match)
        if (parsed) {
          const { title, text: refText, sourceUrl } = parsed

          if (windowSize.width > 992) {
            return (
              <SourceTooltip
                key={i}
                id={`tooltip-${i + refText.length}`}
                title={title}
                text={refText}
                sourceUrl={sourceUrl}
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
                  title: title,
                  content: refText,
                  sourceUrl: sourceUrl,
                })
              }
            />
          )
        }
        return <>{match}</>
      }),
    )
  }, [text, windowSize.width])

  return (
    <div className={`${extraClass}`}>
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
        <div className="pb-10px">
          <Source title={modal.title} text={modal.content} sourceUrl={modal.sourceUrl} />
        </div>
      </ReactModal>
      <Linkify target="_blank">{textWithSources}</Linkify>
    </div>
  )
}
