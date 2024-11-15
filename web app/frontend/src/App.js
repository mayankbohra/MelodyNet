import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AudioUpload from './components/AudioUpload';
import Documentation from './components/Documentation';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-800 text-gray-900 dark:text-white transition duration-500">
        <header className="shadow-md">
          <Navbar />
        </header>
        <main className="p-6 max-w-screen-xl mx-auto">
          <Routes>
            <Route path="/" element={<AudioUpload />} />
            <Route path="/documentation" element={<Documentation />} />
          </Routes>
        </main>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
