
// initial state / slices
const DEFAULT_STATE: AdminState = {
  username: "",
  id: "",
  role: ""
}

// reducer
// untuk mengatur siapa yang login
export const adminReducer = (state: AdminState = DEFAULT_STATE, action: ReduxAction): AdminState => {
  switch (action.type) {
    case "ADMIN_LOGIN":
      return {
        ...state,
        username: action.payload?.username || state.username,
        id: action.payload?.id || state.id,
        role: action.payload?.role || state.role
      };
    case "ADMIN_LOGOUT":
      return DEFAULT_STATE
    default:
      return state;
  }
}

// types
interface AdminState {
  username: string;
  id: string;
  role: string
}

interface ReduxAction {
  type: string;
  payload?: Partial<AdminState>;
}