// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-4">Vítejte v aplikaci Nákupní Seznam</h1>
        <p className="text-gray-700 text-center mb-6">
          Tady můžete spravovat své nákupní seznamy, přidávat položky a sdílet seznamy s ostatními uživateli.
        </p>
        <div className="flex flex-col space-y-4">
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Přihlásit se
          </Link>
          <Link
            to="/register"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Registrovat se
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
