import { BrowserRouter, Route, Routes as Switch, Navigate } from "react-router-dom";
import { Home } from "../pages/home";
import { Register } from "../pages/register";
import { Login } from "../pages/login";
import { getCookie } from "../shared/components/utils/cookies";
import { Products } from "../pages/products";

export const Routes = () => {
    const isAuthenticated = getCookie('user_id');
    console.log(isAuthenticated);
    
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/home" Component={() => <Home />} />
                {isAuthenticated === null && <Route path="/register" Component={() => <Register />} />}
                {isAuthenticated === null && <Route path="/login" Component={() => <Login />} />}
                {isAuthenticated && <Route path="/products" Component={() => <Products />} />}
                <Route path="*" Component={() => <Navigate to="/home" />} />
            </Switch>
        </BrowserRouter>
    );
};