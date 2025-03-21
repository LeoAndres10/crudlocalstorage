import { BrowserRouter, Routes, Route } from "react-router-dom";
import Proveedor from "./components/Proveedor";

function App() {
  return (
    
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Proveedor />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
