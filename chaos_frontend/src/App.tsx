import {TooltipProvider} from "@/components/ui/tooltip";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Toaster} from 'sonner'
import Landing from "../src/pages/Landing.tsx";
import Home from "../src/pages/Home.tsx";
import {AuthProvider} from "@/context/AuthContext.tsx";
import SignIn from "@/pages/SignIn.tsx";
import SignUp from "@/pages/SignUp.tsx";
import PrivateRoute from "@/components/common/PrivateRoute.tsx";

const App = () => {

    return (
        <TooltipProvider>
            <Toaster/>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<Landing/>}/>
                        <Route path="/login" element={<SignIn/>}/>
                        <Route path="/signup" element={<SignUp/>}/>
                        <Route path="/landing" element={<Landing/>}/>
                        <Route element={<PrivateRoute/>}>
                            <Route path="/home" element={<Home/>}/>
                        </Route>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </TooltipProvider>
    );
};

export default App;