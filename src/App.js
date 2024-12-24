import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import ClientPage from './components/ClientPage';

function App() {
  return (
    <Router>
      <div>
        <nav className="bg-gray-800 p-4">
          <div className="container mx-auto">
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="text-white hover:text-gray-300">Cars</Link>
              </li>
              <li>
                <Link to="/clients" className="text-white hover:text-gray-300">Clients</Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/clients" element={<ClientPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;