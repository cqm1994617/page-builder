import { call, put, takeEvery, takeLatest, take, all, delay } from 'redux-saga/effects'

// worker Saga : 将在 USER_FETCH_REQUESTED action 被 dispatch 时调用
function* increment() {
  yield put({ type: "ADD" })
}

function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'ADD' })
}

function* setNum(action) {
  yield put({ type: 'SET_DATA', payload: action.payload })
}


function* mySaga() {
  yield takeLatest("INCREMENT", increment)
  yield takeLatest("INCREMENT_ASYNC", incrementAsync)
  yield takeLatest("SET", setNum)
}

export default mySaga
