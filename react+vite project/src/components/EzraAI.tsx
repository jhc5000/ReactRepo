import { useState, type JSX } from "react";

  

  // const navigate = useNavigate();
export default function EzraAI() {
const [latestMsg, setLatestMsg] = useState("");
  const [latestResp,setLatestResp]=useState<
      JSX.Element[]
    >()

 const handleSubmit = (event:any) => {
    event.preventDefault();
    console.log("sent during event:",{latestMsg})
    const message= {
      "message": latestMsg,
    "market": {
        "symbol": "SPY",
        "timeframe": "15m",
        "price": 0,
        "vwap": 0,
        "rsi": 0,
        "ema_20": 0,
        "ema_50": 0,
        "ema_200": 0,
        "trend": "unknown",
        "session": "after hours"
      }
    };
    console.log("sending message:",{message})
    const latestRespBlock=(resp:string)=>{
      let processedResp=resp.split("\n");
      return(
        processedResp.map(par=>{
          return(
            <p style={{marginBottom:"20px"}}>{par}</p>
          )
        })
      )
    }
    fetch("https://congenial-memory-jq4w79grw73554r-8080.app.github.dev/chat", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(message),
    })
      .then((respose) => respose.json())
      .then((newResp) => {
        console.log("api response:",{newResp})
        setLatestResp(latestRespBlock(newResp?.reply));
        setLatestMsg("")
        
        // navigate("/Reviews");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div id="EzraAI" className="place-items-center">
      <div
        className="ezraAI-wrapper mt-15 bg-white dark:bg-neutral-700 rounded-lg rounded-md rounded-sm rounded-xl"
        
      >
        <h1>EZRA.AI</h1>
        <div
          className="ezraAI-content mt-5 rounded-lg rounded-md rounded-sm rounded-xl"
           
        >
          <div
          style={{height:"25vh",fontWeight:"700",overflow:"overlay",scrollbarWidth:"none"}}
          >{latestResp||<p>Hey John, How are you doing?</p>}</div>
          <form
            onSubmit={handleSubmit}
            style={{paddingTop:"10px"}}
          >
            <input
            className=" ezra-chat-input rounded-lg rounded-md rounded-sm rounded-xl"
            
              type="text"
              name="message"
              placeholder="chat with Ezra"
              value={latestMsg}
              onChange={(event) => setLatestMsg(event.target.value)}
            />
            <div>
              <button >
              Submit
            </button>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
}
