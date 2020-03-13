import React from 'react'
import { BrowserRouter } from 'react-router-dom'

class App extends React.Component {

  componentDidCatch() {
    console.log('catch')
  }

  componentDidMount() {

  }

  render() {

    return (
      <BrowserRouter basename="/page-builder">
        <div>12</div>
      </BrowserRouter>
    )
  }

}

export default App