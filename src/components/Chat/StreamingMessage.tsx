import { TextWithSources } from 'components/Sources/TextWithSources'
import { GlobalColContainer } from '../Global/GlobalColContainer'

export function StreamingMessage({ response }) {
  return (
    <div className={`fr-my-1w`}>
      <span>
        {response.split('\n').map((line, lineIndex) => (
          <span key={lineIndex}>
            {lineIndex > 0 && <br />}
            <TextWithSources text={line} sources={[]} />
          </span>
        ))}
      </span>
      )
    </div>
  )
}
