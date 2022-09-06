import React, { useState, useContext, useEffect } from 'react'

const API_ENDPOINT = 'https://opentdb.com/api.php?'

// const tempUrl =
//   'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple'
const AppContext = React.createContext()
const AppProvider = ({ children }) => {
  const table = {
    sports: 21,
    history: 23,
    politics: 24,
    celebrities: 26,
    animals: 27,
  }
  const [waiting, setWating] = useState(true)
  const [mod, setMod] = useState(false)
  const [olamide, setOlamide] = useState('')
  const [loading, setLoading] = useState(false)
  const [general, setGeneral] = useState([])
  const [questions, setQuestions] = useState(null)
  const [index, setIndex] = useState(0)
  const [error, setError] = useState(false)
  const [correct, setCorrect] = useState(0)
  const [hello, setHello] = useState(false)
  const [number, setNumber] = useState(10)
  const [category, setCategory] = useState('sports')
  const [difficulty, setDifficulty] = useState('easy')
  // console.log(difficulty)
  const fetchData = async () => {
    const url = `${API_ENDPOINT}amount=${number}&difficulty=${difficulty}&category=${table[category]}&type=multiple`
    // console.log(table['sports'])
    // console.log(url)
    // console.log(category)
    setWating(true)
    setLoading(true)
    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      if (data?.results?.length <= 0) {
        throw new Error('Error Payload')
      }
      setGeneral(data.results)
      setQuestions(data.results[index])
      setLoading(false)
      setWating(false)
      setError(false)
      // console.log(data.results)
    } catch (error) {
      console.log(error)
      setError(true)
      setWating(true)
      setTimeout(() => {
        setError(false)
      }, 5000)
    }
  }

  const start = (e) => {
    fetchData()
    setWating(false)
  }
  useEffect(() => {
    setQuestions(general[index])
  }, [index])

  // useEffect(() => {
  //   fetchData()
  // }, [hello])

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1

      if (index > general?.length - 1) {
        let update = ((correct / general.length) * 100).toFixed(0)
        setOlamide(update)
        setCorrect(0)
        setMod(true)
        return 0
      } else {
        return index
      }
    })
  }

  const tryAgain = () => {
    setWating(true)
    setIndex(0)
    setCorrect(0)
    setMod(false)
  }
  const correctAnswer = (value) => {
    if (value) {
      setCorrect((oldCorrect) => {
        nextQuestion()
        const correct = oldCorrect + 1
        return correct
      })
    } else {
      return nextQuestion()
    }
  }

  const answeredQuestion = () => {
    let update = ((correct / general.length) * 100).toFixed(0)
    return update
  }
  // useEffect(() => {
  //   correctAnswer()
  // }, [])
  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        error,
        correct,
        index,
        general,
        mod,
        nextQuestion,
        correctAnswer,
        olamide,
        tryAgain,
        answeredQuestion,
        start,
        number,
        setNumber,
        setCategory,
        setDifficulty,
        category,
        difficulty,
        // answered,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
export const useGlobalContext = () => {
  return useContext(AppContext)
}
export { AppContext, AppProvider }
