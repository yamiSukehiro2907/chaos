import {TooltipProvider} from "@/components/ui/tooltip";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Toaster} from 'sonner'
import Landing from "../src/pages/Landing.tsx";
import Home from "../src/pages/Home.tsx";
import {AuthProvider} from "@/context/AuthContext.tsx";
import SignIn from "@/pages/SignIn.tsx";
import SignUp from "@/pages/SignUp.tsx";

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
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/landing" element={<Landing/>}/>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </TooltipProvider>
    );
};

export default App;