// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

const countReducer = (prevState, newState) => {
  switch (newState.type) {
    case 'INCREMENT': {
      return {
        count: prevState.count + newState.step,
      }
    }

    default:
      throw new Error('Unsupported method')
  }
}

const Counter = ({initialCount = 0, step = 1}) => {
  const [counterState, dispatch] = React.useReducer(countReducer, {
    count: initialCount,
  })

  const {count} = counterState

  const increment = () => dispatch({type: 'INCREMENT', step})
  return <button onClick={increment}>{count}</button>
}

const App = () => {
  return <Counter />
}

export default App
