const initState = {
  num: 1
}

function testReducer(state = initState, action) {
  switch (action.type) {
    case 'ADD':
      return {
        num: state.num + 1
      }
    case 'SET_DATA':
      return {
        num: action.payload
      }
    default:
      return state
  }
}

export default testReducer
