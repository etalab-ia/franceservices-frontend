import reactStringReplace from 'react-string-replace'
import { SourceTooltip } from './SourceTooltip'

export function TextWithSources({ text }) {
  return reactStringReplace(text, /(<ref text="[^"]+"[^<]*<\/ref>\.?)/g, (match, i) => {
    const regex = /<ref text="([^"]+)">\s*\[([^\]]+)\]\s*<\/ref>/
    const content = regex.exec(match)
    return (
      <SourceTooltip
        key={i}
        id={`tooltip-${i + text.length}`}
        text={content[1]}
        sourceId={content[2]}
      />
    )
  })
}
