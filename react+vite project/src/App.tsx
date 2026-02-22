import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import Journal from "./Journal.tsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="place-items-center">
        <div className="place-items-center">
          <a
            className="place-items-center"
            href="https://vite.dev"
            target="_blank"
          >
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
        </div>
        <div className="place-content-center">
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
      </div>
      {/* <div className="card">
        <button onClick={() => setCount((count) => (count + 1) * 2)}>
          count is {count}
        </button>
      
      </div> */}
      <Journal />
      <p className="text-center bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
        Built with React & Tailwind CSS
      </p>
    </>
  );
}

export default App;
