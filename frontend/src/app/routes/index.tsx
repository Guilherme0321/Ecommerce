import { BrowserRouter, Route, Routes as Switch, Navigate } from "react-router-dom";
import { Home } from "../pages/home";
import { Register } from "../pages/register";

export const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/home" Component={() => <Home />} />
                <Route path="/register" Component={() => <Register />} />
                <Route path="*" Component={() => <Navigate to="/home" />} />
            </Switch>
        </BrowserRouter>
    );
};