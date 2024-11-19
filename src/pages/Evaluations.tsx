const questions = [
  {
    question: 'Peut-on faire une saisie sur le RSA ?',
    theme: 'RSA',
    operator: 'CAF',
  },
  {
    question: 'Peut-on faire une saisie sur le RSA ?',
    theme: 'RSA',
    operator: 'CAF',
  },
  {
    question: 'Peut-on faire une saisie sur le RSA ?',
    theme: 'RSA',
    operator: 'CAF',
  },
  {
    question: 'Peut-on faire une saisie sur le RSA ?',
    theme: 'RSA',
    operator: 'CAF',
  },
]

export default function Evaluations() {
  return (
    <div className="flex flex-col gap-4 fr-my-4w  h-full flex-grow min-h-[800px] items-center">
      <div className="fr-text--lg fr-mb-2w">
        <h1>Évaluations</h1>
      </div>
      <Questions />
    </div>
  )
}

function Questions() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {questions.map((question, index) => (
        <QuestionCard
          key={index}
          question={question.question}
          theme={question.theme}
          operator={question.operator}
        />
      ))}
    </div>
  )
}

function QuestionCard({
  question,
  theme,
  operator,
}: { question: string; theme: string; operator: string }) {
  return (
    <div className="rounded-2xl fr-border-action-high-grey border-2 fr-p-2w min-w-64 min-h-24 hover:fr-border-action--high-grey hover:cursor-pointer ">
      <div className="fr-mb-2w">
        <h4>{question}</h4>
        <div className="flex  gap-2 fr-mt-2w">
          <p className="fr-tag fr-background-alt--yellow-tournesol">Thème : {theme}</p>
          <p className="fr-tag fr-background-contrast--blue-france">
            Opérateur : {operator}
          </p>
        </div>
      </div>
    </div>
  )
}
