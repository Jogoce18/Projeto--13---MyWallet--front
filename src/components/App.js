import { BrowserRouter,Routes, Route} from "react-router-dom";
import UserContext from './../contexts/userContext';
import React, { useState } from 'react';

import "./../css/reset.css";
import "./../css/style.css"
import Login from "./Login";
import SignPage from "./SignPage";
import RegistersPage from "./RegistersPage";
import Registerdeposit from "./Registerdeposit";
import Registerwithdraw from "./Registerwithdraw";



export default function App() {

  const [user, setUser] = useState(
    localStorage.getItem('userdata')
        ? JSON.parse(localStorage.getItem('userdata'))
        : null
);


  return (
    
   <UserContext.Provider value={{ user, setUser }}>
              <BrowserRouter>
                  <Routes>
                    <Route path ='/' element ={<Login />}/>
                    <Route path="/cadastro" element={<SignPage />}/>
                    <Route path="/registers" element={<RegistersPage />} />
                    <Route path="/registerdeposit" element={<Registerdeposit />} />
                    <Route path="/registerwithdraw" element={<Registerwithdraw />} />
                  </Routes>
              </BrowserRouter> 
    </UserContext.Provider>
         
        
  );

}