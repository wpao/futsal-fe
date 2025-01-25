
// initial state / slices
const DEFAULT_STATE: ChangeState = {
  timeBooking: 0,
  timeDelete: 0

}

// reducer
export const jamReducer = (state: ChangeState = DEFAULT_STATE, action: ReduxAction): ChangeState => {
  if (action.type === "JAM_CHANGE") {
    return { ...state, timeBooking: action.payload || state.timeBooking }
  }  
  if (action.type === "JAM_DELETE") {
    return { ...state, timeDelete: action.payload || state.timeDelete }
  }
  return state
}

// ============================================
// types
interface ChangeState {
  timeBooking: Number
  timeDelete: Number
}

interface ReduxAction {
  type: string;
  // payload?: Partial<CounterState>;
  payload?: number
}