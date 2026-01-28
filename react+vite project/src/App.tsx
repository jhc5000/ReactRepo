import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
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
      <h1>JOHN'S Vite + React PROJECT</h1>
      <div className="card">
        <button onClick={() => setCount((count) => (count + 1) * 2)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <p>Next we're gonna try importing some dashboard UI/UX components.</p>
      </div>
      <Journal />
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <p className="text-center bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
        Built with React & Tailwind CSS
      </p>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
