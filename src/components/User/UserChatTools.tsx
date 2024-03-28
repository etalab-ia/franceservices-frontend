import type { RootState } from '@types'
import { userChatToolsFunc } from '@utils/chat'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalColContainer } from '../Global/GlobalColContainer'

export function UserChatTools({ isArchive }) {
  const stream = useSelector((state: RootState) => state.stream)
  const user = useSelector((state: RootState) => state.user)
  const archive = useSelector((state: RootState) => state.archive)
  const dispatch = useDispatch()
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handleClick = (index: number) => {
    setSelectedIndex(index)
    setTimeout(() => setSelectedIndex(null), 100)
  }

  return (
    <div className="flex items-center fr-mt-2w">
      <GlobalColContainer>
        {userChatToolsFunc({ stream, archive, user }, dispatch).map((tool, index) => (
          <button
            disabled={tool.name === 'redo' && (stream.isStreaming || isArchive)}
            key={index}
            className={
              index === selectedIndex ? 'fr-m-1v opacity-0' : 'fr-m-1v opacity-[1]'
            }
            onClick={() => {
              handleClick(index)
              tool.onClick({ stream, user }, dispatch)
            }}
          >
            <img src={tool.image} alt={tool.alt} title={tool.title} />
          </button>
        ))}
      </GlobalColContainer>
    </div>
  )
}
