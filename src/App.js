import React, { useEffect } from 'react'
import { useGlobalContext } from './context'
import Loading from './Loading.js'
// import Modal from './Modal.js'
import SetupForm from './SetupForm.js'

function App() {
  const {
    waiting,
    loading,
    questions,
    correct,
    error,
    index,
    nextQuestion,
    general,
    correctAnswer,
    mod,
    olamide,
    tryAgain,
    answeredQuestion,
  } = useGlobalContext()
  let answers, question
  if (questions && Object.keys(questions)?.length) {
    const {
      question: newQuestion,
      incorrect_answers,
      correct_answer,
    } = questions
    // console.log(questions)
    question = newQuestion
    let newAnswers = [...incorrect_answers, correct_answer]
    answers = shuffle(newAnswers)
  }
  if (waiting) {
    return <SetupForm />
  }
  if (loading) {
    return <Loading />
  }

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--

      // And swap it with the current element.
      ;[array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ]
    }

    return array
  }
  return (
    <main className={`${mod ? 'new' : 'main'}`}>
      {mod ? (
        <section className='mod'>
          <div className='message'>
            <h2>congrats!</h2>
            <p>You answered {olamide}% of questions correctly</p>
            <button
              type='submit'
              onClick={() => tryAgain()}
              className='btn  btn-try'
            >
              Try Again
            </button>
          </div>
        </section>
      ) : (
        <article className='quiz'>
          <div className='quiz-questions'>
            <p>
              Correct Answers : {correct}/{index}
            </p>
            {/* <p>You answered {answeredQuestion()}% of questions correctly</p> */}
          </div>
          <h3 dangerouslySetInnerHTML={{ __html: question }} />
          <div className='btn-container'>
            {answers?.map((answer, index) => {
              return (
                <button
                  key={index}
                  className='answer-btn'
                  onClick={() =>
                    correctAnswer(questions.correct_answer === answer)
                  }
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              )
            })}
          </div>

          <button type='submit' className='skip-btn' onClick={nextQuestion}>
            Skip Question
          </button>
        </article>
      )}
    </main>
  )
}

export default App
