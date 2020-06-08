import { createActions } from 'redux-actions'

const { currentUndoStep } = createActions({
  'CURRENT_UNDO_STEP/SET_CURRENT_STEP': (stepId) => stepId,
  'CURRENT_UNDO_STEP/CLEAR_CURRENT_STEP': () => null
})

const { setCurrentStep, clearCurrentStep } = currentUndoStep

export {
  setCurrentStep,
  clearCurrentStep
}
