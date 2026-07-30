import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/MainLayout";
import Advertisement from "../components/Advertisement";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Advertisement></Advertisement>
            }
        ]
    }
]);

export default Router;