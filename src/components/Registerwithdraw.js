import React, { useState, useContext } from 'react';
import styled from "styled-components";
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import dotenv from 'dotenv';
import UserContext from './../contexts/userContext';
import { IoMdReturnLeft } from 'react-icons/io';
import { ThreeDots } from 'react-loader-spinner';
import { sendAlert } from "./Alert";
dotenv.config();

export default function Registerwithdraw() {
   
  const [value, setValue] = useState("");
  const [description, setData] = useState("");
  const [dataLoading, setDataLoading] = useState({
    loading: false,
    classNameLoading: '',
});
  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  async function newRegister(e) {
    e.preventDefault();
    
    setDataLoading({
        ...dataLoading,
        loading: true,
        classNameLoading: 'input-disabled',
    });
    const body = {
      description, 
      type: "withdraw",
      value: parseFloat(value)
    };
    const headers = {
      headers: { "Authorization": `Bearer ${user.token}`}
    }
    try {
      await axios.post("http://localhost:5000/extractos", body, headers)
      .then(() => {
        setDataLoading({
            ...dataLoading,
            loading: true,
            classNameLoading: 'input-disabled',
        });
      sendAlert('', '', 'Registro feito com sucesso!')
      navigate("/registers");
    });
}catch (error) {
      console.log("An error occurred.");
      console.log(error);
      setDataLoading({
        ...dataLoading,
        loading: true,
        classNameLoading: 'input-disabled',
    });
    }

  }
    

    return (
        <RegisterContainer>
               <HeaderRegister>
               
               <h1>Nova Saída</h1>
               
                <IoMdReturnLeft
                    className="back-registers-button"
                    onClick={() => navigate('/registers')}
                />
            </HeaderRegister>
            <Form onSubmit={newRegister}>
                <input
                    type="number"
                    placeholder="Valor"
                    value={value} 
                    disabled={dataLoading.loading}
                    className={dataLoading.classNameLoading}
                    onChange={(e) => setValue(e.target.value)}
                  
                />
                <input
                    type="text"
                    placeholder="Descrição"
                    value={description} 
                    disabled={dataLoading.loading}
                    className={dataLoading.classNameLoading}
                    onChange={(e) => setData(e.target.value)}
                />
             <button type="submit" onClick={newRegister}>
                {dataLoading.loading === true ? (
                            <ThreeDots
                                color="rgba(255, 255, 255, 1)"
                                height={13}
                                width={51}
                            />
                        ) : (
                            'Salvar Saída'
                        )}</button>
                        
                      
            </Form>
        </RegisterContainer>
    );
}


const RegisterContainer = styled.div``;

const HeaderRegister = styled.header`
    display: flex;
    justify-content: space-between;
    h1 {
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
        color: #ffffff;
        margin: 25px 0 40px 25px;
    }
    .back-registers-button {
        cursor: pointer;
        color: #ffffff;
        font-size: 25px;
        margin: 25px 25px 0px 0px;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
        width: 326px;
        height: 58px;
        border-radius: 5px;
        background: #ffffff;
        border: 1px solid #d5d5d5;
        padding-left: 15px;
        margin-bottom: 13px;
        font-size: 20px;
        font-family: 'Raleway', sans-serif;
        &:focus {
            outline: none;
        }
        &::placeholder {
            font-style: regular;
            font-weight: 400;
            font-size: 20px;
            color: #000000;
        }
    }
    input:focus::placeholder {
        color: transparent;
    }
    button {
        width: 326px;
        height: 46px;
        background-color: rgb(163, 40, 214);
        color: #ffffff;
        font-family: 'Raleway', sans-serif;
        font-size: 20px;
        font-weight: 700;
        border-radius: 5px;
        border: 1px solid #a328d6;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .input-disabled {
        background-color: rgba(212, 212, 212, 1);
        color: rgba(175, 175, 175, 1);
    }
`;
