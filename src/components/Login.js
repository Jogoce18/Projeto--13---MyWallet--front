import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import dotenv from 'dotenv';
import { ThreeDots } from 'react-loader-spinner';
import UserContext from './../contexts/userContext';
import styled from "styled-components";
import Logo from "./../assets/icons8-monedero-100.png";

dotenv.config();

export default function Login() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ email: '', password: '' });
    const [dataLoading, setDataLoading] = useState({
        loading: false,
        classNameLoading: '',
    });
    const { user, setUser } = useContext(UserContext);
    const signIn = (e) => {
        e.preventDefault();

        setDataLoading({
            ...dataLoading,
            loading: true,
            classNameLoading: 'input-disabled',
        });

        const URL = "http://localhost:5000/signin";

        axios
            .post(URL, { email: userData.email, password: userData.password })
            .then((response) => {
                localStorage.setItem(
                    'userdata',
                    JSON.stringify({
                        name: response.data.name,
                        token: response.data.token,
                        
                    })
                     
                );
                const { data } = response;
                setUser({
                    ...user,
                    name: data.name,
                    token: data.token,
                   
                });
                setDataLoading({
                    ...dataLoading,
                    loading: false,
                    classNameLoading: '',
                });
                navigate('/registers');
            })
            .catch((err) => {
                console.log({
                    message:
                        'Login error! Check your credentials and try again',
                    err,
                });
                setDataLoading({
                    ...dataLoading,
                    loading: false,
                    classNameLoading: '',
                });
            });
           
    };

   
  return (
    <>
  <Container onSubmit={signIn} >
  <Img src={Logo} alt="MyWallet"/>
            <p className="app-name">MyWallet</p>
            <Form >
                <input 
                    type="email" 
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" 
                    placeholder="E-mail" 
                    disabled={dataLoading.loading}
                    className={dataLoading.classNameLoading}
                    required
                    value={userData.email}
                    onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                    }
                />
                <input 
                    type="password" 
                    placeholder="Senha"
                    disabled={dataLoading.loading}
                    className={dataLoading.classNameLoading}
                    required
                    value={userData.password}
                    onChange={(e) =>
                        setUserData({
                            ...userData,
                            password: e.target.value,
                        })
                    }
                />
               
               {dataLoading.loading === false ? (
                    <button type="submit">Entrar</button>
                ) : (
                    <button type="button" disabled>
                        <ThreeDots
                            color="rgba(255, 255, 255, 1)"
                            height={13}
                            width={51}
                        />
                    </button>
                )}
                
            </Form>
            <Link to="/cadastro">
                 <Cadastro>
                 <p>Primeira vez? Cadastre-se!</p>
                 </Cadastro>
            </Link>
 </Container>
   </>
  )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #8C11BE;
    padding: 0 24px;
    height: 100vh;
    width: 100vw;
    

    .app-name {
        font-family: 'Saira Stencil One';
        font-style: normal;
        font-weight: 400;
        font-size: 32px;
        line-height: 50px;
        color: #ffffff;
        margin-bottom: 37px;
        text-align: center;
        
    }
`;

const Img = styled.img`
    width: 140.21px;
    height: 140.16px;
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Raleway';
    input {
        width: 326px;
        height: 48px;
        border-radius: 5px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        padding-left: 11px;
        margin-bottom: 13px;
        font-size: 20px;
        font-family: 'Raleway';
        &:focus {
            outline: none;
        }
        &::placeholder {
            font-family: 'Raleway';
            font-style: normal;
            font-weight: 400;
            font-size: 19.976px;
            color: #000000;
        }
    }
    input:focus::placeholder {
        color: transparent;
    }
    .input-disabled {
        background-color: rgba(212, 212, 212, 1);
        color: rgba(175, 175, 175, 1)
    }
    button {
        width: 326px;
        height: 48px;
        background: #A328D6;
        border-radius: 4.63636px;
        border: none;
        margin-bottom: 25px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 20.976px;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
const Cadastro = styled.p`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
     color: #FFFFFF;
    text-decoration: underline;
    
    `