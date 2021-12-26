// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

const CountContext = React.createContext()

const CountProvider = ({children}) => {
  const counterState = React.useState(0)

  return (
    <CountContext.Provider value={counterState}>
      {children}
    </CountContext.Provider>
  )
}

function CountDisplay() {
  const [count] = useCount()

  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  const {1: setCount} = useCount()
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}

const useCount = () => {
  const context = React.useContext(CountContext)
  if (!context) {
    throw new Error(
      'Counter context should be rendered inside a CountProvider component.',
    )
  }
  return context
}

function App() {
  return (
    <CountProvider>
      <div>
        <CountDisplay />
        <Counter />
      </div>
    </CountProvider>
  )
}

export default App
