import { Tag } from '@codegouvfr/react-dsfr/Tag'
import type { Chat } from '../types'

export const archiveHeaders = ['Nom de la conversation', 'Date de création']

// Set archive tags from /indexes sheets surtitre etc
const setArchiveTags = (array: string[]) => {
  const tags = array.map((theme, index) => {
    return (
      <Tag key={index} className="fr-m-1w">
        {theme}{' '}
      </Tag>
    )
  })

  return tags
}

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
  const title = name.length > 78 ? name.slice(0, 78) + '...' : name
  const tags = [] // setArchiveTags(item.tags)
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
