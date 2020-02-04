import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider, useSelector, useDispatch } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducer'
import sagas from './sagas'
import action from './actions'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(sagas)


const Test = () => {


  const num = useSelector(props => props.testReducer.num)
  const dispatch = useDispatch()

  return <div>
    <h3>store中num: {num}</h3>
    <div onClick={() => dispatch({ type: 'INCREMENT' })}>increment</div>
    <div onClick={() => dispatch({ type: 'INCREMENT_ASYNC' })}>increment_async</div>
    <div onClick={() => dispatch({ type: 'SET', payload: 100 })}>set_data</div>
  </div>
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
          <div>123</div>
          <Test />
        </BrowserRouter>
      </Provider>
    )
  }

}

export default App