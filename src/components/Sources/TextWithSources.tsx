import reactStringReplace from 'react-string-replace'
import { SourceTooltip } from './SourceTooltip'

export function TextWithSources({ text, sources }) {
  return reactStringReplace(text, /<ref text="([^"]+)"[^<]*<\/ref>\.?/g, (match, i) => (
    <SourceTooltip
      key={i}
      id={`tooltip-${i + text.length}`}
      text={match}
      source="Source Name"
      sourceSite="Source Site Name"
      sheetUrl={`https://example.com/${match[4]}`}
    />
  ))
}
