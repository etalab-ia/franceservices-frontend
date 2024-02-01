import { ModifyButton } from '../Global/ModifyButton'

export function MeetingEditQuestion({ setGenerate }) {
  // Set generate to false allows us to go from to the response page to the input page
  const handleClick = async () => {
    setGenerate(false)
  }

  return <ModifyButton handleClick={handleClick} text="Modifier" extraClass="underline" />
}
