import { Tag } from '@codegouvfr/react-dsfr/Tag'

export function MeetingTags({ setContext, field, tags }) {
  const handleClick = (e) => {
    e.preventDefault()

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
            dismissible
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
