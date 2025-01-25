import { CalendarForm } from "@/components/CalendarForm";
import { Jam } from "@/components/admin/Jam";

const JamPage = () => {
  return (
    <div className="mt-10 flex flex-col items-center justify-around">
      <CalendarForm />
      <Jam />
    </div>
  );
};

export default JamPage;
