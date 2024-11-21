import { useState } from 'react'

const questions = [
  {
    title: 'TItre de question',
    question: 'Peut-on faire une saisie sur le RSA ?',
    theme: 'RSA',
    operator: 'CAF',
  },
  {
    title: 'TItre de question',
    question: 'Peut-on faire une saisie sur le RSA ?',
    theme: 'RSA',
    operator: 'CAF',
  },
  {
    title: 'TItre de question',
    question: 'Peut-on faire une saisie sur le RSA ?',
    theme: 'RSA',
    operator: 'CAF',
  },
  {
    title: 'TItre de question',
    question: 'Peut-on faire une saisie sur le RSA ?',
    theme: 'RSA',
    operator: 'CAF',
  },
]

export default function Evaluations() {
  const [selectedCardIndex, setSelectedCardIndex] = useState(null)

  const handleBack = () => {
    setSelectedCardIndex(null)
  }

  return (
    <div className="flex flex-col gap-4 items-center mt-8 min-h-screen">
      <div className="fr-text--lg fr-mb-4w">
        <h1>Évaluations</h1>
      </div>
      {selectedCardIndex === null ? (
        <>
          <h3>Sélectionnez une question à évaluer</h3>
          <Questions setSelectedCardIndex={setSelectedCardIndex} />
        </>
      ) : (
        <QuestionDetail question={questions[selectedCardIndex]} onBack={handleBack} />
      )}
    </div>
  )
}

function Questions({ setSelectedCardIndex }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {questions.map((question, index) => (
        <QuestionCard
          key={index}
          index={index}
          title={question.title}
          question={question.question}
          theme={question.theme}
          operator={question.operator}
          setSelectedCardIndex={setSelectedCardIndex}
        />
      ))}
    </div>
  )
}

function QuestionCard({ index, question, theme, operator, title, setSelectedCardIndex }) {
  const handleClick = () => {
    setSelectedCardIndex(index)
  }
  const lightOrDark = localStorage.getItem('scheme')
  const border = lightOrDark === 'dark' ? 'hover:border-white' : 'hover:border-black'

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className={`motion-preset-fade motion-duration-1000 rounded-2xl fr-border-action-high-grey border-2 fr-p-2w min-w-64 min-h-24 transform transition-transform duration-200 ease-in-out cursor-pointer
        hover:scale-105 hover:fr-border-action--high-grey focus:scale-105 focus:fr-border-action--high-grey ${border}`}
    >
      <div className="fr-mb-2w">
        <h4>{title}</h4>
        <p>{question}</p>
        <div className="flex gap-2 fr-mt-2w">
          <p className="fr-tag fr-background-alt--yellow-tournesol">Thème : {theme}</p>
          <p className="fr-tag fr-background-contrast--blue-france">
            Opérateur : {operator}
          </p>
        </div>
      </div>
    </div>
  )
}

function QuestionDetail({ question, onBack }) {
  return (
    <div className="flex flex-col gap-4  h-full flex-grow min-h-[800px] items-center ">
      <div className="fr-text--lg fr-mb-2w">
        <h3>{question.title}</h3>
      </div>
      <div className="fr-text--lg fr-mb-2w">
        <p>{question.question}</p>
      </div>
      <div className="flex gap-4 fr-mb-2w">
        <p className="fr-tag fr-background-alt--yellow-tournesol">
          Thème : {question.theme}
        </p>
        <p className="fr-tag fr-background-contrast--blue-france">
          Opérateur : {question.operator}
        </p>
      </div>
      <div className="flex gap-4 fr-mb-2w">
        <button onClick={onBack} className="fr-btn fr-btn--secondary fr-btn--sm">
          Retour
        </button>
      </div>
    </div>
  )
}
