import React, { useState } from "react";
import { useShortcut } from "../../../core/src/useShortcut";
import "../style.css";

export default function Counter() {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    setCount(count - 1);
  };

  // ctrl+a 를 누르면 count 가 증가
  useShortcut({
    keys: "ctrl+a",
    callback: increase,
  });

  // ctrl+b 를 누르면 count 가 감소
  useShortcut({
    keys: "ctrl+b",
    callback: decrease,
  });

  return (
    <div id="container">
      <div>
        <p>
          press <b>ctrl+a</b> to count up
        </p>
        <p>
          press <b>ctrl+b</b> to count down
        </p>
      </div>
      <div>count : {count}</div>
    </div>
  );
}
