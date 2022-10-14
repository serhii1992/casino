import { useEffect, useRef, useState } from "react";
import Reel from "./components/Reel";
import SlotGame from "./components/SlotGame";
import "./styles/styles.css";

export default function App() {
  const [canvasWrapper, setCanvasWrapper] = useState();
  const game = useRef();

  const onComplete = (str)=>{
    console.log( str);
  }

  useEffect(() => {
    if (canvasWrapper) {
      game.current = new SlotGame(canvasWrapper, onComplete);
    }
  }, [canvasWrapper]);

  return (
    <>
      <button onClick={()=>{game.current.ui.startPlay()}}>Start</button> 

      <div className="App" ref={setCanvasWrapper}></div>
    </>
  );
}
