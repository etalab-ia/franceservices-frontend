import type { Chat } from '../types'

export const archiveHeaders = ['Nom de la conversation', 'Date de création']

interface ArchiveBodyProps {
  item: Chat
  index: number
  name: string
  setArchiveTab: React.Dispatch<React.SetStateAction<number | null>>
}

export const setArchiveBody = ({
  item,
  index,
  name,
  setArchiveTab,
}: ArchiveBodyProps) => {
  const title = name.length > 78 ? `${name.slice(0, 78)}...` : name
  const date = new Date(item.creationDate).toLocaleDateString('fr-FR')
  const handleClick = () => {
    setArchiveTab(index)
  }

  const commonDivProps = {
    onClick: handleClick,
    className: 'cursor-pointer',
  }

  return [
    <td key="title" style={cellStyle} {...commonDivProps}>
      {title}
    </td>,
    <td key="date" style={cellStyle} {...commonDivProps}>
      {date}
    </td>,
  ]
}

const cellStyle = {
  textAlign: 'left' as const,
  padding: '10px',
  cursor: 'pointer',
}
