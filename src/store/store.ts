import { combineReducers } from 'redux'
import { userReducer } from './user'
import { counterReducer } from './counter'
import { changeReducer } from './date'
import { jamReducer } from './jam'


export const reducers = combineReducers({
  // add your reducers here
  user: userReducer, /* ini adalah slice dengan nama user */
  counter: counterReducer,
  date: changeReducer,
  jam: jamReducer
})

// types
// Tipe global untuk state Redux
export type RootState = ReturnType<typeof reducers>;