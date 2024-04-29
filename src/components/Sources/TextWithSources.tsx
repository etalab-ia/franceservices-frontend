import reactStringReplace from 'react-string-replace'
import { SourceTooltip } from './SourceTooltip'
import { useEffect, useState } from 'react'
import ReactModal from 'react-modal'

export function TextWithSources({ text }) {
  const [textWithSources, setTextWithSources] = useState<any | null>(null)
  useEffect(() => {
    setTextWithSources(
      reactStringReplace(text, /(<ref text="[^"]+"[^<]*<\/ref>\.?)/g, (match, i) => {
        const regex = /<ref text="([^"]+)">\[?([^\]<:]{16})[^\]<]*\]?<\/ref>/
        const content = regex.exec(match)
        console.log('content', content[2])
        if (content) {
          return (
            <SourceTooltip
              key={i}
              id={`tooltip-${i + text.length}`}
              text={content[1]}
              sourceId={content[2]}
            />
          )
        }
        return <></>
      })
    )
  }, [text])
  return <>{textWithSources}</>
}
