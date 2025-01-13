
// initial state / slices
const DEFAULT_STATE: ChangeState = {
  tahunbulantanggal: "2025-01-13"
}

// reducer
export const changeReducer = (state: ChangeState = DEFAULT_STATE, action: ReduxAction): ChangeState => {
  if (action.type === "DATE_CHANGE_TAHUNBULANTANGGAL") {
    return { ...state, tahunbulantanggal: action.payload || state.tahunbulantanggal }
  }  
  return state
}

// ============================================
// types
interface ChangeState {
  tahunbulantanggal: string
}

interface ReduxAction {
  type: string;
  // payload?: Partial<CounterState>;
  payload?: string
}