import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import InvestorDemo from './InvestorDemo'
import './Home.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/investor" element={<InvestorDemo />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
