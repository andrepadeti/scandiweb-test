import React from 'react'
import Gallery from './components/gallery'
import Nav from './components/nav'

class App extends React.Component {
  render() {
    return (
      <>
        <Nav />
        <Gallery />
      </>
    )
  }
}

export default App
