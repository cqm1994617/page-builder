import React, { lazy, Suspense, useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

const Edit = lazy(() => import('./pages/edit/index'))

const Loading = () => <div>加载中</div>

function WaitingComponent(Component) {
  return () => (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
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
        <Switch>
          <Route exact path="/edit" component={WaitingComponent(Edit)} />
        </Switch>
      </BrowserRouter>
    )
  }

}

export default App
