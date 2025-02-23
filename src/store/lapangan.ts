
// initial state / slices
const DEFAULT_STATE: LapanganState = {
  idUser: "",
}

// reducer
// untuk mengatur munculnya Header Admin atau Header User
export const lapanganReducer = (state: LapanganState = DEFAULT_STATE, action: ReduxAction): LapanganState => {
  switch (action.type) {
    case "LAPANGAN_CHANGE":
      return {
        ...state,
        idUser: action.payload?.idUser || state.idUser
      };
    case "LAPANGAN_UN_CHANGE":
      return DEFAULT_STATE
    default:
      return state;
  }
}

// types
interface LapanganState {
  idUser: String
}

interface ReduxAction {
  type: string;
  payload?: Partial<LapanganState>;
}