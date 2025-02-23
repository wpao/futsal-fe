import { useState, useEffect } from "react";
import axios from "axios";

// const TableInfo = () => {
export function TableInfo() {
  const [schedules, setSchedules] = useState<{ id: string; content: string }[]>(
    [],
  );

  const fetchSchedules = async () => {
    const lapanganStorage = localStorage.getItem("lapangan-change");
    try {
      const response = await axios.get(
        `http://localhost:3000/info/${lapanganStorage}`,
      );
      setSchedules(response.data);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return (
    <div className="p-4">
      <div>
        <h2 className="mb-2 text-xl font-bold">Jadwal Tersimpan</h2>
        {schedules.map((schedule) => (
          <div key={schedule.id} className="mb-2 whitespace-pre-wrap p-2">
            {schedule.content}
          </div>
        ))}
      </div>
    </div>
  );
}
