import {Route, Routes} from "react-router-dom";
import Auth from "./components/Auth";
import Home from "./components/Home";
import {AuthProvider} from "./context/AuthContext";

const App = () => (
    <AuthProvider>
        <Routes>
            <Route path="/login" element={<Auth/>}></Route>
            <Route path="/signup" element={<Auth/>}></Route>
            <Route path="/home" element={<Home/>}></Route>
        </Routes>
    </AuthProvider>
);

export default App;
