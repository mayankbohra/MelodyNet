import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AudioUpload from './components/AudioUpload';
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
        <main className="p-4 max-w-2xl mx-auto">
          <Routes>
            <Route path="/" element={<AudioUpload />} />
            <Route path="/documentation" element={<div className="p-6 bg-gray-100 dark:bg-gray-600 rounded-lg shadow-md">Documentation Page</div>} />
          </Routes>
        </main>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
