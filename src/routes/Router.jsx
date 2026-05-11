import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/MainLayout";
import HomePage from "../pages/HomePage";
import ServicesPage from "../pages/ServicesPage";
import AboutUsPage from "../pages/AboutUsPage";
import ContactUs from "../pages/ContactUs";
import SozooEntertainment from "../pages/SozooEntertainment";

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
			},
			{
				path: "/about-us",
				element: <AboutUsPage></AboutUsPage>
			},
			{
				path: "/contact-us",
				element: <ContactUs></ContactUs>
			},
			{
				path: "/sozoo-entertainment",
				element: <SozooEntertainment></SozooEntertainment>
			}
		],
	},
]);

export default Router;