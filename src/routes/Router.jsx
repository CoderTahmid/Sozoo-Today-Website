import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/MainLayout";
import HomePage from "../pages/HomePage";

const Router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout></MainLayout>,
		children: [
			{
                path: "/",
				element: <HomePage></HomePage>
			},
		],
	},
]);

export default Router;