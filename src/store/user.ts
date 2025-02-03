
// initial state / slices
const DEFAULT_STATE: UserState = {
  urlHeader: false
}

// reducer
// untuk mengatur munculnya Header Admin atau Header User
export const userReducer = (state: UserState = DEFAULT_STATE, action: ReduxAction): UserState => {
  if (action.type === "USER_CHANGE") {
    // ketika true, header admin
    return { ...state, urlHeader: state.urlHeader = true }
  }  
  if (action.type === "USER_UN_CHANGE") {
    // ketika false, header user
    return { ...state, urlHeader: state.urlHeader = false }
  }  
  return state
}

// types
interface UserState {
  urlHeader: boolean
}

interface ReduxAction {
  type: string;
  payload?: Partial<UserState>;
}