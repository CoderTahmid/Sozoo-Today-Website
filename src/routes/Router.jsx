import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/MainLayout";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
    }
]);

export default Router;