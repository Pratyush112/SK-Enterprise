import React, { Suspense, lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import ErrorPage from "../pages/errorpage/Error";
import QualityAssurance from "../pages/home/QualityAssurance";
import Features from "../pages/home/Features";
import ProductCategories from "../pages/home/ProductCategories";

// Lazy-load heavier pages to reduce initial bundle size (improves mobile performance)
const PartsPage = lazy(() => import("../pages/productlist/PartsPage"));
const Product = lazy(() => import("../pages/productlist/ProductPage"));
const About = lazy(() => import("../pages/about/About"));
const Contact = lazy(() => import("../pages/contact/ContactUs"));

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage />, 
        element: <App />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/products", element: <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-slate-900 font-mono text-sm font-bold tracking-wider uppercase">Loading Catalog...</div>}><Product /></Suspense> },
            { path: "/products/:id", element: <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-slate-900 font-mono text-sm font-bold tracking-wider uppercase">Loading Catalog...</div>}><Product /></Suspense> },
            { path: "/sluicegates", element: <Navigate to="/products" replace /> },
            { path: "/parts", element: <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-slate-900 font-mono text-sm font-bold tracking-wider uppercase">Loading Parts...</div>}><PartsPage /></Suspense> }, 
            { path: "/parts/:id", element: <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-slate-900 font-mono text-sm font-bold tracking-wider uppercase">Loading Parts...</div>}><PartsPage /></Suspense> }, 
            { path: "/Nuts&Bolts", element: <Navigate to="/parts" replace /> }, 
            { path: "/aboutus", element: <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-slate-900 font-mono text-sm font-bold tracking-wider uppercase">Loading About Us...</div>}><About /></Suspense> },
            { path: "/contactus", element: <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-slate-900 font-mono text-sm font-bold tracking-wider uppercase">Loading Contact...</div>}><Contact /></Suspense> },
            { path: "/contact", element: <Navigate to="/contactus" replace /> },   
            { path: "/quality", element: <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-slate-900 font-mono text-sm font-bold tracking-wider uppercase">Loading Quality Assurance...</div>}><QualityAssurance /></Suspense> },   
            { path: "/WhyUs", element: <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-slate-900 font-mono text-sm font-bold tracking-wider uppercase">Loading Features...</div>}><Features /></Suspense> },   
            { path: "/productcategories", element: <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-slate-900 font-mono text-sm font-bold tracking-wider uppercase">Loading Categories...</div>}><ProductCategories /></Suspense> }   
        ]
    }
]);

export default router;