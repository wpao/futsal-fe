// const getCurrentDateTime = () => {
//   const now = new Date();
//   // const date = now.toLocaleDateString("id-ID"); // Format Tanggal (Indonesia)
//   // const time = now.toLocaleTimeString("id-ID"); // Format Waktu (Indonesia)
//   // return { date, time };
//   const year = now.getFullYear();
//   const month = String(now.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
//   const day = String(now.getDate()).padStart(2, '0');
//   const hours = String(now.getHours()).padStart(2, '0');
//   const minutes = String(now.getMinutes()).padStart(2, '0');
//   const seconds = String(now.getSeconds()).padStart(2, '0');

//   // return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
//   return { year, month, day, hours, minutes, seconds };
// };

// const { year: tahun, month: bulan, day: tanggal } = getCurrentDateTime();
// console.log(`from store date.ts ${tahun}-${bulan}-${tanggal}`);

//===========================================
// initial state / slices
const DEFAULT_STATE: ChangeState = {
  // berubah ketika sudah dibooking atau belum
  chack: true,

  // berubah ketika jam lebih kecil atau lebih besar
  disableButton: true
}

// reducer
export const disableReducer = (state: ChangeState = DEFAULT_STATE, action: ReduxAction): ChangeState => {
  //===========================================
  // jika sudah dibooking atau belum, maka kondisi ini digunakan
  if (action.type === "DISABLE_CHANGE_TRUE") {
    // jika true maka button booking akan di disable
    return { ...state, chack: state.chack = true }
  }  
  if (action.type === "DISABLE_CHANGE_FALSE") {
    // jika false maka button unBooking akan di disable
    return { ...state, chack: state.chack = false }
  }  

  //===========================================
  // ketika jam lebih kecil atau lebih besar dari jam sekarang, maka kondisi ini digunakan
  if (action.type === "DISABLE_BUTTON_FALSE") {
    // jika buttonSelector false maka button booking dan button unBooking tidak disable
    return { ...state, disableButton: state.disableButton = false }
  }
  if (action.type === "DISABLE_BUTTON_TRUE") {
    // jika buttonSelector true maka button booking dan button unBooking akan disable
    return { ...state, disableButton: state.disableButton = true }
  }

  //===========================================
  return state
}

// ============================================
// types
interface ChangeState {
  chack: boolean
  disableButton: boolean
}

interface ReduxAction {
  type: string;
  // payload?: Partial<CounterState>;
  payload?: boolean
}