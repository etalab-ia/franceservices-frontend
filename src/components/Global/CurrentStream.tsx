import { TextWithSources } from '../Sources/TextWithSources'

export const CurrentStream = ({
  response,
  extraClass,
}: { response: string; extraClass?: string }) => {
  return (
    <div className={`fr-my-1w${extraClass}`}>
      <span>
        {response.split('\n').map((line, lineIndex) => (
          <span key={lineIndex}>
            {lineIndex > 0 && <br />}
            <TextWithSources text={line} />
          </span>
        ))}
      </span>
    </div>
  )
}
