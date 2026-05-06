import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/MainLayout";
import HomePage from "../pages/HomePage";
import ServicesPage from "../pages/ServicesPage";

const Router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout></MainLayout>,
		children: [
			{
                path: "/",
				element: <HomePage></HomePage>
			},
			{
				path: "/services",
				element: <ServicesPage></ServicesPage>,
			}
		],
	},
]);

export default Router;