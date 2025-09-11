import {Routes, Route} from "react-router-dom";
import Landing from "../src/pages/Landing.tsx";
import Home from "../src/pages/Home.tsx";
import SignIn from "@/pages/SignIn.tsx";
import SignUp from "@/pages/SignUp.tsx";
import PrivateRoute from "@/components/common/PrivateRoute.tsx";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/login" element={<SignIn/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/landing" element={<Landing/>}/>
                <Route element={<PrivateRoute/>}>
                    <Route path="/home" element={<Home/>}/>
                </Route>
            </Routes>
        </>
    )
}

export default App;