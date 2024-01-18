import { BrowserRouter, Route, Routes as Switch, Navigate } from "react-router-dom";
import { Home } from "../pages/home";
import { Register } from "../pages/register";
import { Login } from "../pages/login";
import { getCookie } from "../shared/components/utils/cookies";
import { Products } from "../pages/products";

export const Routes = () => {
    const token = getCookie('token')
    console.log(token);
    
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/home" Component={() => <Home />} />
                {!token && <Route path="/register" Component={() => <Register />} />}
                {!token && <Route path="/login" Component={() => <Login />} />}
                {token && <Route path="/products" Component={() => <Products />} />}
                <Route path="*" Component={() => <Navigate to="/home" />} />
            </Switch>
        </BrowserRouter>
    );
};