import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Team from "./pages/Team";
import Mission from "./pages/Mission";
import Practice from "./pages/Practice";
import Learn from "./pages/Learn";
import Footer from "./components/Footer";

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
      <Footer />
    </>
  );
}

export default App;
