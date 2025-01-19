import { CalendarForm } from "@/components/CalendarForm";
import { Jam } from "@/components/admin/Jam";

// redux
import { useSelector } from "react-redux";

// redux
import { RootState } from "../../store/store";
// import { Link } from "react-router-dom";

const EditJam = () => {
  // Redux
  const userSelector = useSelector((state: RootState) => state.user);
  const dateSelector = useSelector((state: RootState) => state.date);

  return (
    <div className="flex h-screen flex-col items-center justify-around">
      <h1>Edit Jam</h1>
      <CalendarForm />
      <Jam />

      <hr className="border-1 my-4 min-w-[300px] border-gray-300" />

      {/* redux */}
      <div>{userSelector.name}</div>
      <div>{dateSelector.tahunbulantanggal}</div>
    </div>
  );
};

export default EditJam;
