import React, { lazy, Suspense, useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducers from './reducer'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import styled from 'styled-components'

const Home = lazy(() => import('./pages/home/index'))
const Edit = lazy(() => import('./pages/edit/index'))
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const store = createStore(reducers, composeEnhancers(
  applyMiddleware(thunk)
)
)

const Loading = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

function WaitingComponent(Component) {
  return () => (
    <Suspense fallback={<Loading>加载中...</Loading>}>
      <Component />
    </Suspense>
  )
}


class App extends React.Component {

  componentDidCatch(err) {
    console.log(err)
  }

  render() {

    console.log(REQUEST_URL)
    console.log(WS_URL)

    return (
      <Provider store={store}>
        <ConfigProvider locale={zhCN}>
          <BrowserRouter basename="/page-builder">
            <Switch>
              <Route exact path="/home" component={WaitingComponent(Home)} />
              <Route exact path="/edit" component={WaitingComponent(Edit)} />
            </Switch>
          </BrowserRouter>
        </ConfigProvider>
      </Provider>
    )
  }

}

export default App
