import { useCallback, useEffect, useState,useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [charac, setcharac] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef=useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
    if (number) str += "0123456789";
    if (charac) str += "!@#$%^&*()_{}~:;";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, charac, setPassword]);
  useEffect(() => {
    passwordGenerator();
  }, [length, number, charac, passwordGenerator]);
  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,length)
  
 window.navigator.clipboard.writeText(password  )
  },[password])

  return (
    <div className=" flex justify-center  items-center h-screen ">
      <div className="h-80 border-none rounded-[3rem]  shadow-lg  shadow-white/20 backdrop-blur-lg bg-white/10 w-96  flex flex-col items-center justify-center gap-3 ">
        <div className="w-full text-center p-5">
          <span className="text-[#ccc5b9] text-[1.8rem]  font-[5px] w-full tracking-wider">
            {" "}
            Password generator
          </span>
        </div>
        <div className="flex gap-2 ">
          <input
            type="text"
            value={password}
            placeholder="passsword"
            className="bg-black/[0.4] h-[2.4rem] w-[15rem] rounded -md p-3 outline-none text-slate-300 "
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className="border border-zinc-600 p-1 text-xs rounded-md w-[5rem] bg-black/[0.8] text-white h-[2.4rem] hover:bg-black/[0.6]">
            Copy
          </button>
        </div>
        <div className="flex items-center justify-center gap-1 mt-2">
          <input
            type="range"
            min={6}
            max={25}
            value={length}
            className="cursor-pointer accent-[#e5383b] "
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label htmlFor="" className="text-xs tracking-wider text-white">
            Length : {length}
          </label>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex gap-2">
            <input
              type="checkbox"
              name=""
              id="numberInput"
              defaultChecked={number}
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            <label htmlFor="" className="text-xs tracking-wider text-white">
              Number
            </label>
          </div>
          <div className="flex gap-2.5">
            <input
              type="checkbox"
              name=""
              id="characterInput"
              defaultChecked={charac}
              onChange={() => {
                setcharac((prev) => !prev);
              }}
            />
            <label htmlFor="" className="text-xs tracking-wider text-white">
              Character
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
