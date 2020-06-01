import { createActions } from 'redux-actions'
import { v4 as uuidv4 } from 'uuid'
import { setPageList } from './pageList'

const { currentUndoStep } = createActions({
  'CURRENT_UNDO_STEP/SET_CURRENT_STEP': (stepId) => stepId,
  'CURRENT_UNDO_STEP/CLEAR_CURERENT_STEP': () => null
})

const { setCurrentStep, clearCurrentStep } = currentUndoStep

export {
  setCurrentStep,
  clearCurrentStep
}
