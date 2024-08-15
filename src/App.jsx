import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Team from "./components/Team";
import Mission from "./components/Mission";
import Practice from "./components/Practice";
import Learn from "./components/Learn";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/learn" element={<Learn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
