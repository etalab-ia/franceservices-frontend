import { MeetingRelatedQuestionsTitle } from '@constants/meeting'
import type { RootState } from '@types'
import { createRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

/*****************************************************************************************
	
	COMPONENTS:

		Frequently asked question suggestions
		For now we get the related questions from the sheets
 *****************************************************************************************/
export function MeetingRelatedQuestions({
  setQuestion,
}: {
  setQuestion: React.Dispatch<React.SetStateAction<string>>
}) {
  const sheets = useSelector((state: RootState) => state.user.sheets)
  const [relatedQuestions, setRelatedQuestions] = useState([])
  const stream = useSelector((state: RootState) => state.stream)
  const ref = createRef<HTMLDivElement>()

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [ref.current, stream.response])
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
    <>
      {relatedQuestions.length !== 0 && (
        <p className="fr-pt-3w fr-mb-2w flex md:flex-col">
          {MeetingRelatedQuestionsTitle}
        </p>
      )}
      {relatedQuestions.slice(0, 3).map((rq, index) => {
        return (
          <button
            className="fr-mb-1w w-full"
            key={index}
            onClick={() => setQuestion(rq.question)}
          >
            <div
              ref={ref}
              className="fr-px-2w fr-py-3v inline-flex h-full w-full rounded bg-[#F5F5FE]"
            >
              {rq.question}
            </div>
          </button>
        )
      })}
    </>
  )
}
