const getCurrentDateTime = () => {
  const now = new Date();
  // const date = now.toLocaleDateString("id-ID"); // Format Tanggal (Indonesia)
  // const time = now.toLocaleTimeString("id-ID"); // Format Waktu (Indonesia)
  // return { date, time };
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  // return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return { year, month, day, hours, minutes, seconds };
};

const { year: tahun, month: bulan, day: tanggal } = getCurrentDateTime();
// console.log(`from store date.ts ${tahun}-${bulan}-${tanggal}`);

// initial state / slices
const DEFAULT_STATE: ChangeState = {
  tahunbulantanggal: `${tahun}-${bulan}-${tanggal}`,
  // tahunbulantanggal: "2025-01-24",
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