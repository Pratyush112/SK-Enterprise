import React, { Suspense, lazy } from "react";
import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import { getProducts, getParts} from "./APIs";
import ErrorPage from "../pages/errorpage/Error";
import QualityAssurance from "../pages/home/QualityAssurance";
import Features from "../pages/home/Features";

// Lazy-load heavier pages to reduce initial bundle size (improves mobile performance)
const PartsPage = lazy(() => import("../pages/productlist/PartsPage"));
const Product = lazy(() => import("../pages/productlist/ProductPage"));
const About = lazy(() => import("../pages/about/About"));
const Contact = lazy(() => import("../pages/contact/ContactUs"));

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <div><ErrorPage/></div>, 
        element: <App/>,
        children: [
            { path: "/", element: <div><Home/></div>},
            { path: "/products", element: <Suspense fallback={<div>Loading...</div>}><Product blog={getProducts}/></Suspense>},
            { path: "/sluicegates", element: <Suspense fallback={<div>Loading...</div>}><Product blog={getProducts}/></Suspense>},
            { path: "/parts", element: <Suspense fallback={<div>Loading...</div>}><PartsPage part={getParts}/></Suspense>}, 
            { path: "/Nuts&Bolts", element: <Suspense fallback={<div>Loading...</div>}><PartsPage part={getParts}/></Suspense>}, 
            { path: "/aboutus", element: <Suspense fallback={<div>Loading...</div>}><About/></Suspense>},
            { path: "/contactus", element: <Suspense fallback={<div>Loading...</div>}><Contact/></Suspense>},
            { path: "/contact", element: <Suspense fallback={<div>Loading...</div>}><Contact/></Suspense>},   
            { path: "/quality", element: <Suspense fallback={<div>Loading...</div>}><QualityAssurance/></Suspense>},   
            { path: "/WhyUs", element: <Suspense fallback={<div>Loading...</div>}><Features/></Suspense>}   
   
        ]
    }
]);

export default router;