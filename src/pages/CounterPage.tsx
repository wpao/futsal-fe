import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";

// redux memberi type
import { RootState } from "../store/store";

const CounterPage = () => {
  const [countInput, setCountInput] = useState<number>(0);

  // redux
  const counterSelector = useSelector((state: RootState) => state.counter);

  // redux menggunakan dispatch untuk mengubah state global
  const dispatch = useDispatch();
  const incrementCounter = () => {
    dispatch({ type: "COUNTER_INCREMENT_COUNT" });
  };

  const decrementCounter = () => {
    dispatch({ type: "COUNTER_DECREMENT_COUNT" });
  };

  const setCounterWithInput = () => {
    // dispatch({ type: "SET_COUNT", payload: { newCount: countInput } });
    dispatch({ type: "COUNTER_SET_COUNT", payload: countInput });
  };

  //
  return (
    <main className="mx-auto mt-8 flex min-h-[80vh] max-w-screen-md flex-col items-center justify-center gap-4 px-4">
      {/* 1 redux */}
      <p className="text-5xl font-bold">Count: {counterSelector.count}</p>

      <div className="flex items-center gap-4">
        <Button onClick={decrementCounter} size={"icon"}>
          <Minus className="h-6 w-6" />
        </Button>

        <Button onClick={incrementCounter} size={"icon"}>
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      <div className="mt-8 flex gap-2">
        <Input
          type="number"
          onChange={(e) => {
            setCountInput(Number(e.target.value));
          }}
        />
        <Button onClick={setCounterWithInput}>Submit</Button>
      </div>
    </main>
  );
};

export default CounterPage;
