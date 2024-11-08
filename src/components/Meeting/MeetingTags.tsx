import { Tag } from '@codegouvfr/react-dsfr/Tag'
import type { RootState } from '@types'
import { useSelector } from 'react-redux'

export function MeetingTags({ setContext, field, tags }) {
  const messages = useSelector((state: RootState) => state.user.messages)
  const handleClick = (e) => {
    e.preventDefault()
    if (messages.length > 0) return
    const tagName = e.currentTarget.textContent.trim()

    if (e.currentTarget.name === 'administrations') {
      setContext((prevContext) => ({
        ...prevContext,
        administrations: prevContext.administrations.filter((tag) => tag !== tagName),
      }))
    } else if (e.currentTarget.name === 'themes') {
      setContext((prevContext) => ({
        ...prevContext,
        themes: prevContext.themes.filter((tag) => tag !== tagName),
      }))
    }
  }

  return (
    <>
      {tags.map((tag, index) => {
        return (
          <Tag
            className={field.className}
            key={index}
            //@ts-expect-error for some reason name isn't recognized as a valid prop but is needed to delete tag
            name={field.name}
            dismissible={messages.length === 0}
            nativeButtonProps={{
              onClick: handleClick,
            }}
          >
            {tag}
          </Tag>
        )
      })}
    </>
  )
}
