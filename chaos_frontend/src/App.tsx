import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Auth />}></Route>
    </Routes>
  </BrowserRouter>
);

export default App;
