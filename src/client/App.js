import React, { lazy, Suspense, useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducers from './reducer'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

const Edit = lazy(() => import('./pages/edit/index'))
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(thunk)
)
)

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

  render() {

    return (
      <Provider store={store}>
        <ConfigProvider locale={zhCN}>
          <BrowserRouter basename="/page-builder">
            <Switch>
              <Route exact path="/edit" component={WaitingComponent(Edit)} />
            </Switch>
          </BrowserRouter>
        </ConfigProvider>
      </Provider>
    )
  }

}

export default App
