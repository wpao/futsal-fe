import { combineReducers } from 'redux'
import { userReducer } from './user'
import { changeReducer } from './date'
import { jamReducer } from './jam'


export const reducers = combineReducers({
  // add your reducers here
  user: userReducer, /* ini adalah slice dengan nama user */
  date: changeReducer,
  jam: jamReducer
})

// types
// Tipe global untuk state Redux
export type RootState = ReturnType<typeof reducers>;