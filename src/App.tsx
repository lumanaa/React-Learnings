import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Page/Landing";
import "./scss/index.scss";
import Sticky from "./Page/Sticky/Sticky";

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Landing/>} />
    <Route path="/sticky" element={<Sticky/>} />
   </Routes>
   </BrowserRouter>
  );
}

export default App;
