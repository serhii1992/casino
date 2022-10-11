import { useEffect, useRef, useState } from "react";
import SlotGame from "./components/SlotGame";
import UI from "./components/UI";
import "./styles/styles.css";

export default function App() {
  const [canvasWrapper, setCanvasWrapper] = useState();
  const game = useRef();

  useEffect(() => {
    if (canvasWrapper) {
      game.current = new SlotGame(canvasWrapper);
    }
  }, [canvasWrapper]);

  const start = new UI();
  console.log(start);
  return (
    <>
      <button onClick={()=>{start.startPlay()}}>Start</button>

      <div className="App" ref={setCanvasWrapper}></div>
    </>
  );
}
