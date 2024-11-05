import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-200 dark:bg-gray-700 p-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-gray-900 dark:text-white text-xl font-bold">Audio Classifier</h1>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="text-gray-900 dark:text-white hover:text-blue-500 transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/documentation" className="text-gray-900 dark:text-white hover:text-blue-500 transition duration-300">
              Documentation
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
