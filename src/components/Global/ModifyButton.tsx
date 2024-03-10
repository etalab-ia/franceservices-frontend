/*
 * The button to modify the question in meeting
 */
export function ModifyButton({ text, handleClick, extraClass }) {
  return (
    <p
      className={`fr-pt-1w fr-text--xs cursor-pointer ${extraClass}`}
      onClick={handleClick}
    >
      {text}
    </p>
  )
}
