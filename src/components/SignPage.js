import styled from "styled-components";
import Logo from "./../assets/icons8-monedero-100.png";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import dotenv from 'dotenv';
dotenv.config();
export default function SignPage() {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: false,
    });
    const [buttonCadastrar, setButtonCadastrar] = useState({
        disabled: true,
        classNameDisabled: 'button-disabled',
    });
    const [dataLoading, setDataLoading] = useState({
        loading: false,
        classNameLoading: '',
    });

    const navigate = useNavigate();

    const signUp = (e) => {
        e.preventDefault();

        setDataLoading({
            ...dataLoading,
            loading: true,
            classNameLoading: 'input-disabled',
        });

        const URL = "http://localhost:5000/signup";

        axios
            .post(URL, {
                name: data.name,
                email: data.email,
                password: data.password,
                confirmPassword: data.confirmPassword,
            })
            .then((res) => {
                console.log(res.data);
                setDataLoading({
                    ...dataLoading,
                    loading: false,
                    classNameLoading: '',
                });
                navigate('/');
            })
            .catch((err) => {
                console.log({
                    message:
                        'Sign Up error! Check your credentials and try again',
                    err,
                });
                setDataLoading({
                    ...dataLoading,
                    loading: false,
                    classNameLoading: '',
                });
            });
    };

    useEffect(() => {
        if (
            data.confirmPassword !== '' &&
            data.password !== data.confirmPassword
        ) {
            setData({
                ...data,
                error: true,
            });
            setButtonCadastrar({
                ...buttonCadastrar,
                disabled: true,
                classNameDisabled: 'button-disabled',
            });
        } else if (
            data.confirmPassword !== '' &&
            data.confirmPassword === data.password
        ) {
            setData({
                ...data,
                error: false,
            });
            setButtonCadastrar({
                ...buttonCadastrar,
                disabled: false,
                classNameDisabled: '',
            });
        }
    }, [data.confirmPassword, data.password]);

  

  return (
    <>
    <Container  >
    <Img src={Logo} alt="MyWallet"/>
        <p className="app-name">MyWallet</p>
    
        <Form  onSubmit={signUp} >
        <input 
              type="text"
              disabled={dataLoading.loading}
              className={dataLoading.classNameLoading}
              placeholder="Nome"
              required
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
                
            />
            <input 
              type="email"
              disabled={dataLoading.loading}
              className={dataLoading.classNameLoading}
              placeholder="E-mail"
              required
              value={data.email}
              onChange={(e) =>
                  setData({ ...data, email: e.target.value })
              }
            />
            <input 
                type="password"
                disabled={dataLoading.loading}
                className={dataLoading.classNameLoading}
                placeholder="Senha"
                required
                value={data.password}
                onChange={(e) =>
                    setData({
                        ...data,
                        password: e.target.value,
                    })
                }
            />
           <input 
               type="password"
               disabled={dataLoading.loading}
               className={dataLoading.classNameLoading}
               placeholder="Confirme a senha"
               required
               value={data.confirmPassword}
               onChange={(e) =>
                   setData({
                       ...data,
                       confirmPassword: e.target.value,
                   })
               }
            />
             {data.error ? (
                    <span className="text-danger">Passwords dont match</span>
                ) : null}
                {dataLoading.loading === false ? (
                    <button
                        type="submit"
                        disabled={buttonCadastrar.disabled}
                        className={buttonCadastrar.classNameDisabled}
                    >
                        Cadastrar
                    </button>
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
        <Link to="/">
                <Cadastro>Já tem uma conta? Faça login!</Cadastro>
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
    color: #FFFFFF;
    margin-bottom: 24px;
     
    
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
    
`;