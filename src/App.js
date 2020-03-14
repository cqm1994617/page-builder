import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'



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
          <Route exact path="/animals" component={() => <div>animals exact</div>} />
          <Route path="/animals/fish" component={() => <div>animals/fish</div>} />
          <Route component={() => <div>no</div>} />
        </Switch>
        <Route path="/animals" component={() => <div>animals</div>} />
      </BrowserRouter>
    )
  }

}

export default App