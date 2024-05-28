import type { RootState } from '@types'
import { UserMessage } from 'components/User/UserMessage'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { ChatMainContainer } from './ChatMainContainer'

/**********************************************************************************************
 
  **	This is the main wrapper around chat components
	
  COMPONENTS:
  **  NewChatHeader: welcome message + exemple questions
  **  ChatMainContainer: List of messages between user and agent
  **  UserMessage: input for user

 **********************************************************************************************/

export function DisplayChatTab({
  archive,
  setGenerate,
}: { archive: boolean; setGenerate: any }) {
  const user = useSelector((state: RootState) => state.user)
  const [questionInput, setQuestionInput] = useState('')

  return (
    <div className="flex flex-col items-center">
      <div className="min-h-[70vh] w-full overflow-y-auto md:w-[992px]">
        {user.messages.length <= 0 && (
          <NewChatHeader setQuestionInput={setQuestionInput} />
        )}
        <ChatMainContainer archive={archive} />
      </div>
      <UserMessage
        setGenerate={setGenerate}
        questionInput={questionInput}
        setQuestionInput={setQuestionInput}
      />
    </div>
  )
}

function NewChatHeader({ setQuestionInput }) {
  return (
    <div className="fr-grid-row fr-grid-row--center">
      <div className="fr-col-10">
        <div className="fr-h1 fr-mt-5w fr-mb-3w">Bonjour, je suis Albert</div>
        <p className="fr-text--xl fr-mb-4w">
          Je suis un outil d’intelligence artificielle interministériel prêt à répondre à
          vos questions administratives. Quelle est votre question aujourd'hui ?
        </p>
        <div className="fr-grid-row fr-grid-row--middle fr-mb-4w fr-background-alt--blue-france fr-p-2w">
          <span
            className="fr-col-1 fr-icon-info-fill fr-text-action-high--blue-france fr-mr-2w fr-mr-md-1v"
            aria-hidden="true"
          />
          <p className="fr-col-10">
            Je suis toujours en plein développement, et ne demande qu'à m'améliorer !
            N’hésitez pas à faire des retours sur les résultats que je vous propose pour
            me dire vous les trouvez bien 👍 ou non 👎.
          </p>
        </div>
        <div className="fr-mb-3v fr-text--lg">
          Si vous ne savez pas quelle question me poser, voici quelques suggestions :
        </div>
        <QuestionsSuggestionList
          setQuestionInput={setQuestionInput}
          questions={[
            "Qu'est-ce que la CAF ?",
            "Comment renouveler une carte d'identité ?",
          ]}
        />
      </div>
    </div>
  )
}

function QuestionsSuggestionList({
  questions,
  setQuestionInput,
}: {
  questions: string[]
  setQuestionInput: React.Dispatch<React.SetStateAction<string>>
}) {
  return (
    <div className="flex w-full gap-2">
      {questions.map((q, index) => {
        return (
          <div
            onClick={() => setQuestionInput(q)}
            key={index}
            className="fr-background-alt--blue-france fr-p-2w fr-text--md cursor-pointer rounded bg-contain"
          >
            {q}
          </div>
        )
      })}
    </div>
  )
}
