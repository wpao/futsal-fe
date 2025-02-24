import { useState, useEffect } from "react";
// import axios from "axios";
import { AdminPage } from "@/components/guard/AdminPage";
import axiosInstance from "@/lib/axios";

const EditTableInfo = () => {
  // dapatkan id user
  const idUser = localStorage.getItem("current-user");

  //
  const [content, setContent] = useState("");
  const [schedules, setSchedules] = useState<{ id: string; content: string }[]>(
    [],
  );

  const fetchSchedules = async () => {
    try {
      const response = await axiosInstance.get(`/info/${idUser}`);
      setSchedules(response.data);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(content);
    const idLapanganChange = localStorage.getItem("lapangan-change");
    // console.log(idLapanganChange);
    // if (!content.trim()) return;

    try {
      await axiosInstance.post("/info", {
        content,
        idLapanganChange,
      });
      setContent("");
      fetchSchedules(); // Refresh daftar setelah submit
    } catch (error) {
      console.error("Error saving schedule:", error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return (
    <AdminPage>
      <div className="p-4">
        <form onSubmit={handleSubmit} className="mb-4">
          <textarea
            name="content"
            className="w-full rounded border p-2"
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Masukkan jadwal..."
          ></textarea>
          <button
            type="submit"
            className="mt-2 rounded bg-blue-500 px-4 py-2 text-white"
          >
            Simpan
          </button>
        </form>

        <div>
          <h2 className="mb-2 text-xl font-bold">Jadwal Tersimpan</h2>
          {schedules.map((schedule) => (
            <div
              key={schedule.id}
              className="mb-2 whitespace-pre-wrap border p-2"
            >
              {schedule.content}
            </div>
          ))}
        </div>
      </div>
    </AdminPage>
  );
};

export default EditTableInfo;
