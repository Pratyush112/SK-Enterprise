import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import { getProducts, getParts } from "./APIs";
import PartsPage from "../pages/productlist/PartsPage";
import ErrorPage from "../pages/errorpage/Error";
import Product from "../pages/productlist/ProductPage";
import About from "../pages/about/About";
import Contact from "../pages/contact/ContactUs";

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <div><ErrorPage/></div>, 
        element: <App/>,
        children: [
            { path: "/", element: <div><Home/></div>},
            { path: "/products", element: <div><Product blog={getProducts}/></div>},
            { path: "/parts", element: <div><PartsPage part={getParts}/></div>}, 
            {path: "/about", element: <div><About/></div>},
            {path: "/contactus", element: <div><Contact/></div>}   
        ]
    }
]);

export default router;