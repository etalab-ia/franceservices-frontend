import type { RootState } from '@types'
import { createRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

/*****************************************************************************************
	
	COMPONENTS:

		Frequently asked question suggestions
		We get the related questions from the sheets
 *****************************************************************************************/
export function MeetingQR({
  setQuestion,
}: {
  setQuestion: (question: string) => void
}) {
  const sheets = useSelector((state: RootState) => state.user.sheets)
  const [relatedQuestions, setRelatedQuestions] = useState([])

  useEffect(() => {
    if (!sheets || !sheets.length) return

    let updatedQuestions = []
    setRelatedQuestions([])

    for (const sheet of sheets) {
      if (sheet.related_questions) {
        for (const qr of sheet.related_questions) {
          const objectExists = updatedQuestions.some((obj) => obj.sid === qr.sid)

          if (!objectExists) {
            updatedQuestions = [
              ...updatedQuestions,
              { question: qr.question, sid: qr.sid, url: qr.url },
            ]
          }
        }
      }
    }

    setRelatedQuestions(updatedQuestions)
  }, [sheets])

  return (
    <div className="fr-mb-w fr-mb-4w mt-auto">
      {relatedQuestions.length !== 0 && (
        <p className="fr-pt-3w fr-mb-2w flex md:flex-col">
          Des questions posées fréquemment pour des situations similaires :
        </p>
      )}
      {relatedQuestions.slice(0, 3).map((rq, index) => {
        return (
          <button
            type="button"
            className="fr-mb-1w w-full"
            key={index}
            onClick={() => {
              setQuestion(rq.question)
            }}
          >
            <div className="fr-px-2w fr-py-3v inline-flex h-full w-full rounded fr-background-alt--blue-france">
              {rq.question}
            </div>
          </button>
        )
      })}
    </div>
  )
}
