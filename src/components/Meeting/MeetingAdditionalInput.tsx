import type { MeetingInputContext } from '@types'
import { MeetingTags } from './MeetingTags'
import { ThemesAndAdminsInput } from './ThemesAndAdminsInput'

export function MeetingAdditionalInput({
  context,
  setContext,
}: {
  context: MeetingInputContext
  setContext: React.Dispatch<React.SetStateAction<MeetingInputContext>>
}) {
  const handleSetTag = (tag, fieldName) => {
    if (fieldName === 'administrations')
      setContext((prevContext) => ({
        ...prevContext,
        administrations: [...prevContext.administrations, tag],
      }))
    else if (fieldName === 'themes')
      setContext((prevContext) => ({
        ...prevContext,
        themes: [...prevContext.themes, tag],
      }))
  }

  return (
    <div className="fr-mt-2w">
      {inputFields.map((field, index) => {
        const tags = field.name === 'themes' ? context.themes : context.administrations
        return (
          <div className="fr-mb-4w" key={index}>
            <ThemesAndAdminsInput
              field={field}
              onTagSelect={(tag) => handleSetTag(tag, field.name)}
              themes={context.themes}
              administrations={context.administrations}
            />
            <MeetingTags
              setContext={setContext}
              context={context}
              field={field}
              tags={tags}
            />
          </div>
        )
      })}
    </div>
  )
}

const inputFields = [
  {
    label: 'Thèmes associés',
    name: 'themes',
    className: 'fr-mr-1w',
  },
  {
    label: 'Opérateurs concernés',
    name: 'administrations',
    className: 'fr-mr-1w',
  },
]
