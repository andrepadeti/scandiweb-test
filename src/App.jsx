import React from 'react'
import Gallery from './components/gallery'
import Nav from './components/nav'

import Context, { GlobalContext } from './context/context'

class App extends React.Component {

  render() {
    return (
      <GlobalContext>
        <Nav />
        <Gallery />
      </GlobalContext>
    )
  }
}

export default App
