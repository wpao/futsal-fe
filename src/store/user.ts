
// initial state / slices
const DEFAULT_STATE: UserState = {
  id: 1,
  name: "",
  price: 0,
  wa: 0,
  jam: 1,
  bayar: false
}

// reducer
export const userReducer = (state: UserState = DEFAULT_STATE, action: ReduxAction): UserState => {
  switch (action.type) {
    default:
      return state;
  }
}

// types
interface UserState {
  id: number;
  name: string;
  price: number;
  wa: number;
  jam: number;
  bayar: boolean
}

interface ReduxAction {
  type: string;
  payload?: Partial<UserState>;
}