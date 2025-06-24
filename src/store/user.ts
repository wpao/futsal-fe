// // initial state / slices
// const DEFAULT_STATE: UserState = {
//   urlHeader: false
// }

// // reducer
// // untuk mengatur munculnya Header Admin atau Header User
// export const userReducer = (state: UserState = DEFAULT_STATE, action: ReduxAction): UserState => {
//   if (action.type === "USER_CHANGE") {
//     // ketika true, header admin
//     return { ...state, urlHeader: state.urlHeader = true }
//   }
//   if (action.type === "USER_UN_CHANGE") {
//     // ketika false, header user
//     return { ...state, urlHeader: state.urlHeader = false }
//   }
//   return state
// }

// // types
// interface UserState {
//   urlHeader: boolean
// }

// interface ReduxAction {
//   type: string;
//   payload?: Partial<UserState>;
// }

// =======================

// initial state / slices
const DEFAULT_STATE: UserState = {
  username: "",
  id: "",
  role: "",
};

// reducer
// untuk mengatur siapa yang login
export const userReducer = (
  state: UserState = DEFAULT_STATE,
  action: ReduxAction,
): UserState => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        username: action.payload?.username || state.username,
        id: action.payload?.id || state.id,
        role: action.payload?.role || state.role,
      };
    case "USER_LOGOUT":
      return DEFAULT_STATE;
    default:
      return state;
  }
};

// types
interface UserState {
  username: string;
  id: string;
  role: string;
}

interface ReduxAction {
  type: string;
  payload?: Partial<UserState>;
}
