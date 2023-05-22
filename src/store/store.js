import { combineReducers, legacy_createStore as createStore } from 'redux'

import { toyReducer } from './toy.reducer'

const rootReducer = combineReducers({
     toyModule: toyReducer,
})

export const store = createStore(rootReducer)

// For debug
store.subscribe(() => {
     console.log('Current state is:', store.getState())
})
