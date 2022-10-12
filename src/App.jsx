import { useEffect, useRef, useState } from "react";
import SlotGame from "./components/SlotGame";
import "./styles/styles.css";

export default function App() {
  const [canvasWrapper, setCanvasWrapper] = useState();
  const game = useRef();

  useEffect(() => {
    if (canvasWrapper) {
      game.current = new SlotGame(canvasWrapper);
    }
  }, [canvasWrapper]);

  return (
    <>
      <button onClick={()=>{game.current.ui.startPlay()}}>Start</button>

      <div className="App" ref={setCanvasWrapper}></div>
    </>
  );
}
