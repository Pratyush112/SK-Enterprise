import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SmoothScroll from './components/motion/SmoothScroll';

function App() {
  return (
    <SmoothScroll>
      <Navbar />
      <Outlet />
      <Footer />
    </SmoothScroll>
  )
};

export default App
