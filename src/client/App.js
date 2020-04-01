import React, { lazy, Suspense, useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducers from './reducer'

const Edit = lazy(() => import('./pages/edit/index'))

const store = createStore(reducers, applyMiddleware(thunk));

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
      <Provider store={store}>
        <BrowserRouter basename="/page-builder">
          <Switch>
            <Route exact path="/edit" component={WaitingComponent(Edit)} />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }

}

export default App
