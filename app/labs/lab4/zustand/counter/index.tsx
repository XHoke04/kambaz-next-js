"use client";

import { useCounterStore } from "./store";

export default function ZustandCounter() {
  const count = useCounterStore((state) => state.count);
  const increase = useCounterStore((state) => state.increase);
  const decrease = useCounterStore((state) => state.decrease);
  const setCount = useCounterStore((state) => state.setCount);
  const reset = useCounterStore((state) => state.reset);

  return (
    <div className="m-2">
      <h1>Zustand Counter</h1>
      Count: {count}
      <br />
      <button onClick={() => increase(1)}>Increase</button>
      <button onClick={() => decrease(1)}>Decrease</button>
      <button onClick={() => setCount(10)}>Set to 10</button>
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
}
