import { GlobalColContainer } from '../Global/GlobalColContainer'

export function StreamingMessage({ children }) {
  return (
    <GlobalColContainer>
      <div className="streaming fr-mb-4w w-full">
        {children &&
          children.split('\n').map((line, lineIndex) => (
            <span key={lineIndex}>
              {lineIndex > 0 && <br />}
              {line}
            </span>
          ))}
      </div>
    </GlobalColContainer>
  )
}
