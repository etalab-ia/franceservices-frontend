import { MeetingRelatedQuestionsTitle } from '@constants/meeting'
import type { RootState } from '@types'
import { useEffect, useState } from 'react'
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

  useEffect(() => {
    if (!sheets || !sheets.length) return

    let updatedQuestions = []
    setRelatedQuestions([])

    sheets.forEach((sheet) => {
      sheet.related_questions &&
        sheet.related_questions.forEach((qr) => {
          const object = updatedQuestions.some((obj) => {
            return obj.sid === qr.sid
          })

          if (!object)
            updatedQuestions = [
              ...updatedQuestions,
              { question: qr.question, sid: qr.sid, url: qr.url },
            ]
        })
    })
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
            <div className="fr-px-2w fr-py-3v inline-flex h-full w-full rounded bg-[#F5F5FE]">
              {rq.question}
            </div>
          </button>
        )
      })}
    </>
  )
}
