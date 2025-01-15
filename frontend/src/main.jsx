// src/index.js (o src/App.js)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store'; // Asegúrate de que esta ruta sea correcta
import App from './App';
import { Analytics } from "@vercel/analytics/react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserAccess } from './components/userAccess/UserAccess';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/access" element={<UserAccess />} />
      </Routes>
      <Analytics />
    </Router>
  </Provider>
);


