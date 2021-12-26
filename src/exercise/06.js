// useDebugValue: useMedia
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

const formatDebugValue = ({query, isMatchingQuery}) =>
  `\`${query}\` => ${isMatchingQuery ? '✅' : '❌'}`

function useMedia(query, initialState = false) {
  const [isMatchingQuery, setIsMatchingQuery] = React.useState(initialState)
  React.useDebugValue({query, isMatchingQuery}, formatDebugValue)

  React.useEffect(() => {
    let mounted = true
    const mql = window.matchMedia(query)
    function onChange() {
      if (!mounted) {
        return
      }
      setIsMatchingQuery(Boolean(mql.matches))
    }

    mql.addEventListener('change', onChange)
    setIsMatchingQuery(mql.matches)

    return () => {
      mounted = false
      mql.removeEventListener('change', onChange)
    }
  }, [query])

  return isMatchingQuery
}

function Box() {
  const isBig = useMedia('(min-width: 1000px)')
  const isMedium = useMedia('(max-width: 999px) and (min-width: 700px)')
  const isSmall = useMedia('(max-width: 699px)')
  const color = isBig ? 'green' : isMedium ? 'yellow' : isSmall ? 'red' : null

  return <div style={{width: 200, height: 200, backgroundColor: color}} />
}

function App() {
  return <Box />
}

export default App
