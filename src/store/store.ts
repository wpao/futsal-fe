import { combineReducers } from 'redux'
import { userReducer } from './user'
import { changeReducer } from './date'
import { jamReducer } from './jam'
import { disableReducer } from './disable'
import { adminReducer } from './admin'
import { lapanganReducer } from './lapangan'


export const reducers = combineReducers({
  // add your reducers here
  user: userReducer, /* ini adalah slice dengan nama user */
  date: changeReducer,
  jam: jamReducer,
  check: disableReducer,
  admin: adminReducer,
  lapangan: lapanganReducer
})

// types
// Tipe global untuk state Redux
export type RootState = ReturnType<typeof reducers>;