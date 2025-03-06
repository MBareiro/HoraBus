// src/index.js (o src/App.js)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store'; // Asegúrate de que esta ruta sea correcta
import App from './App';
import { Analytics } from "@vercel/analytics/react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { OperadorHome } from './components/operador/home/OperadorHome';
import { RecoverPassword } from './components/operador/recoverPassword/RecoverPassword';
import { ResetPassword } from './components/operador/resetPassword/ResetPassword';
import { Login } from './components/login/Login';
import { ChangePasswordOp } from './components/operador/editDataOp/changePassword/ChangePasswordOp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/operador" element={<OperadorHome />} />
        <Route path="/recoverPassword" element={<RecoverPassword/>} />
        <Route path="/reset-password/:token" element={<ResetPassword/>}/>
        <Route path="/operador/changePassword" element={<ChangePasswordOp/>}/>
      </Routes>
      <Analytics />
    </Router>
  </Provider>
);


