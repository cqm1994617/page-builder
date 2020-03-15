import React, {useState, useEffect} from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.scss'


function Test() {
  const [a, setA] = useState('A')

  useEffect(() => {

    setTimeout(() => {
      setA('vbff')
      console.log(a)
    }, 1000)
  }, [a])

  return (
    <div className="test">{a}</div>
  )

}

class App extends React.Component {

  componentDidCatch() {
    console.log('catch')
  }

  componentDidMount() {

  }

  render() {

    return (
      <BrowserRouter basename="/page-builder">
        <Test />
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