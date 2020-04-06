import React from 'react'
import Result from './Result'

function Results ({ results, openPopup }) {
  return (
    <section className='results'>
      {
        results.map(searchResult => (
          <Result
            result={searchResult}
            key={searchResult.imdbID}
            openPopup={openPopup}
          />
        ))
      }
    </section>
  )
}

export default Results
