import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import ProductList from "../pages/productlist/ProductList";
import parts from "../data/parts.json"; // JSON file with parts data
import PartsList from "../pages/productlist/PartsList";
import PartsPage from "../pages/productlist/PartsPage";
import ErrorPage from "../pages/errorpage/Error";
import Product from "../pages/productlist/ProductPage";
import blogData from '../data/blog.json'; // JSON file with product data
import About from "../pages/about/About";
import Contact from "../pages/contact/ContactUs";

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <div><ErrorPage/></div>, 
        element: <App/>,
        children: [
            { path: "/", element: <div><Home/></div>},
            { path: "/products", element: <div><Product blog={blogData}/></div>},
            { path: "/parts", element: <div><PartsPage part={parts}/></div>}, 
            {path: "/about", element: <div><About/></div>},
            {path: "/contactus", element: <div><Contact/></div>}   
        ]
    }
]);

export default router;