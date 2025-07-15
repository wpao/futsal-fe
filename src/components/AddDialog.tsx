import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Tipe data Payment
export type Payment = {
  id: string;
  type: string;
  ukuran: string;
  kategory: string;
  waktu: string;
  harga: string;
};

// Komponen AddDialog
export const AddDialog = ({
  setData,
}: {
  setData: React.Dispatch<React.SetStateAction<Payment[]>>;
}) => {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState<Omit<Payment, "id">>({
    type: "",
    ukuran: "",
    kategory: "",
    waktu: "",
    harga: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate ID unik
    const newId = Date.now().toString();
    const newPayment: Payment = {
      id: newId,
      ...formData,
    };
    setData((prevData) => [...prevData, newPayment]);
    setOpen(false);
    // Reset form
    setFormData({
      type: "",
      ukuran: "",
      kategory: "",
      waktu: "",
      harga: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Tambah Lapangan</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Lapangan Baru</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Type Lapangan</Label>
            <Input
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ukuran">Ukuran</Label>
            <Input
              id="ukuran"
              name="ukuran"
              value={formData.ukuran}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="kategory">Kategori</Label>
            <Input
              id="kategory"
              name="kategory"
              value={formData.kategory}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="waktu">Waktu</Label>
            <Input
              id="waktu"
              name="waktu"
              value={formData.waktu}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="harga">Harga Sewa</Label>
            <Input
              id="harga"
              name="harga"
              value={formData.harga}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Tambah Lapangan</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
