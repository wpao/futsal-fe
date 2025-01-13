
// initial state / slices
const DEFAULT_STATE: ChangeState = {
  timeBooking: 21
}

// reducer
export const jamReducer = (state: ChangeState = DEFAULT_STATE, action: ReduxAction): ChangeState => {
  if (action.type === "JAM_CHANGE") {
    return { ...state, timeBooking: action.payload || state.timeBooking }
  }  
  return state
}

// ============================================
// types
interface ChangeState {
  timeBooking: Number
}

interface ReduxAction {
  type: string;
  // payload?: Partial<CounterState>;
  payload?: number
}