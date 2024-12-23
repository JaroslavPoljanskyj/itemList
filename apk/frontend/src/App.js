// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ShoppingList from './components/shoppingList.js'; // Komponenta pro zobrazení nákupního seznamu
import ShoppingListDetail from './components/shoppingListDetail.js'; // Komponenta pro detail nákupního seznamu
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page with login/register options */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shopping-list" element={<ShoppingList />} />
        <Route path="/shopping-list/:listId" element={<ShoppingListDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
