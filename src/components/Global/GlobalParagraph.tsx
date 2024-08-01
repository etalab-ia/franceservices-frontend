import { TextWithSources } from 'components/Sources/TextWithSources'
import Linkify from 'react-linkify'

export const GlobalParagraph = ({
  children,
  extraClass,
}: { children: React.ReactNode; extraClass?: string }) => {
  return (
    <div className={` fr-my-1w ${extraClass}`}>
      {typeof children !== 'string'
        ? children
        : children.split('\n').map((line, lineIndex) => (
            <div key={line + lineIndex} className="fr-mb-2v">
              <Linkify>
                <TextWithSources text={line} />
              </Linkify>
            </div>
          ))}
    </div>
  )
}

export const GlobalParagraphG = ({
  children,
  extraClass,
}: { children: React.ReactNode; extraClass?: string }) => {
  return (
    <div className={` fr-my-1w ${extraClass}`}>
      {typeof children !== 'string'
        ? children
        : children.split('\n').map((line, lineIndex) => (
            <Linkify target="_blank" key={line}>
              {lineIndex > 0 && <br />}
              {line}
            </Linkify>
          ))}
    </div>
  )
}
