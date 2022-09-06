import React from 'react'
import { useGlobalContext } from './context'

const SetupForm = () => {
  const {
    waiting,
    questions,
    start,
    number,
    category,
    difficulty,
    setNumber,
    setCategory,
    setDifficulty,
    error,
  } = useGlobalContext()
  return (
    <main>
      <section className='quiz'>
        <form className='form'>
          <h2>Setup Quiz</h2>
          <div className='formcontrol'>
            <label htmlFor='amount'>Number Of Questions</label>
            <input
              type='number'
              placeholder='10'
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className='formcontrol'>
            <label htmlFor='category'>Category</label>
            <select
              name='category'
              id=''
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value='sports'>Sports</option>
              <option value='history'>History</option>
              <option value='politics'>Politics</option>
              <option value='celebrities'>Celebrities</option>
              <option value='animals'>Animals</option>
            </select>
          </div>
          <div className='formcontrol'>
            <label htmlFor='difficulty'>Select difficulty</label>
            <select
              name='Difficulty'
              id=''
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value='easy'>easy</option>
              <option value='medium'>medium</option>
              <option value='hard'>hard</option>
            </select>
          </div>
          {error ? <h4 className='red'> Pleases select another option</h4> : ''}
          <button type='submit' className='btn' onClick={(e) => start()}>
            Start
          </button>
        </form>
      </section>
    </main>
  )
}
export default SetupForm
