import type { RootState } from '@types'
import { UserMessage } from 'components/User/UserMessage'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { GlobalRowContainer } from '../Global/GlobalRowContainer'
import { ChatAdditionalContainer } from './ChatAdditionalContainer'
import { ChatMainContainer } from './ChatMainContainer'

/**********************************************************************************************
	
	COMPONENTS:
	
	**	ChatMainContainer: chat div between user & agent

	**	ChatAdditionalContainer: additional informations given to user as sheets

 **********************************************************************************************/

export function DisplayChatTab({
  archive,
  setGenerate,
}: { archive: boolean; setGenerate: any }) {
  const user = useSelector((state: RootState) => state.user)
  const [questionInput, setQuestionInput] = useState('')

  return (
    <div className="flex flex-col items-center">
      <div className="min-h-[70vh] w-full md:w-[992px] overflow-y-auto">
        {user.messages.length <= 0 && (
          <NewChatHeader setQuestionInput={setQuestionInput} />
        )}
        <ChatMainContainer archive={archive} setQuestionInput={setQuestionInput} />
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
            className="fr-col-1 fr-icon-info-fill fr-text-action-high--blue-france "
            aria-hidden="true"
          ></span>
          <p className="fr-col">
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
          questions={['test', 'test2', 'test3']}
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
    <div className="flex gap-2 w-full ">
      {questions.map((q, index) => {
        return (
          <div
            onClick={() => setQuestionInput(q)}
            key={index}
            className=" fr-background-alt--blue-france rounded bg-contain fr-p-2w fr-text--lg cursor-pointer"
          >
            {q}
          </div>
        )
      })}
    </div>
  )
}
