import { useEffect, useRef } from 'react'

export const GlobalStream = ({
  response,
  extraClass,
}: { response: any[]; extraClass?: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    ref.current.scrollIntoView({ behavior: 'smooth' })
  }, [response])
  return (
    <div ref={ref} className={`text-justify ${extraClass}`}>
      {response.map((item, index) => (
        <span key={index}>
          {item.split('\n').map((line, lineIndex) => (
            <span key={lineIndex}>
              {lineIndex > 0 && <br />}
              {line}
            </span>
          ))}
        </span>
      ))}
    </div>
  )
}
