import React, {useState, useEffect} from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Edit from './pages/edit'

const a = import('./pages/edit/index')

class App extends React.Component {

  componentDidCatch() {
    console.log('catch')
  }

  componentDidMount() {

  }

  render() {

    return (
      <BrowserRouter basename="/page-builder">
        <Switch>
          <Route exact path="/edit" component={() => <Edit />} />
        </Switch>
      </BrowserRouter>
    )
  }

}

export default App
