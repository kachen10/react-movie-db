import React, { useState } from 'react'
import Search from './components/Search'
import Results from './components/Results'
import Popup from './components/Popup'
import axios from 'axios'

function App () {
  const apiUrl = 'http://www.omdbapi.com/'
  const key = '&apikey=' + process.env.REACT_APP_API_KEY
  const [state, setState] = useState({
    input: '',
    results: [],
    selected: {}
  })

  const search = (e) => {
    if (e.key === 'Enter') {
      axios(apiUrl + '?s=' + state.input + key)
        .then(data => {
          const results = data.data.Search
          setState(prevState => {
            return { ...prevState, results: results }
          })
        })
    }
  }

  const handleInput = (e) => {
    const inputValue = e.target.value

    setState(prevState => {
      return { ...prevState, input: inputValue }
    })

    console.log(state.input)
  }

  const openPopup = (id) => {
    axios(apiUrl + '?i=' + id + key)
      .then(({ data }) => {
        const result = data
        console.log(result)

        setState(prevState => {
          return { ...prevState, selected: result }
        })
      })
  }

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {} }
    })
  }

  return (
    <div className='App'>
      <header>
        <h1>Movie Database</h1>
      </header>

      <main>
        <Search handleInput={handleInput} search={search} />
        <Results results={state.results} openPopup={openPopup} />

        {(typeof state.selected.Title !== 'undefined')
          ? <Popup selected={state.selected} closePopup={closePopup} />
          : false}
      </main>
    </div>
  )
}

export default App
