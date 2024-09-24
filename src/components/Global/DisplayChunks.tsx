import { GlobalColContainer } from './GlobalColContainer'
import { GlobalParagraph } from './GlobalParagraph'
import { GlobalRowContainer } from './GlobalRowContainer'
import { HalfScreenWidth } from './HalfScreenWidth'

export const DisplayChunks = ({ chunks }) => {
  return (
    <GlobalRowContainer>
      {chunks && [
        ...chunks.map(
          (chunk, index) =>
            chunk && (
              <HalfScreenWidth key={index}>
                <GlobalColContainer extraClass="border grey-950 fr-p-3w overflow-y-auto h-72">
                  <a href={chunk.url} target="_blank" rel="noopener noreferrer">
                    <GlobalParagraph extraClass="fr-text--lg">
                      {chunk.title}
                    </GlobalParagraph>
                    <GlobalParagraph>{chunk.text}</GlobalParagraph>
                    <p className="font-bold text-justify fr-my-1w">{chunk.url}</p>
                  </a>
                </GlobalColContainer>
              </HalfScreenWidth>
            ),
        ),
      ]}
    </GlobalRowContainer>
  )
}
