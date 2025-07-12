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
      <div className="h-screen bg-[url(/img/fachry-zella-devandra-3sV_HuCgy70-unsplash.jpg)] bg-cover p-4 text-white">
        <div className="flex w-full flex-col items-center justify-evenly">
          <form
            onSubmit={handleSubmit}
            className="mb-4 flex w-1/2 flex-col items-center justify-center"
          >
            <textarea
              name="content"
              className="w-full rounded-xl border bg-purple-200 p-2 text-black"
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Masukkan jadwal..."
            ></textarea>
            <button
              type="submit"
              className="mt-2 rounded-full bg-purple-600 px-4 py-2 text-white"
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
      </div>
    </AdminPage>
  );
};

export default EditTableInfo;
