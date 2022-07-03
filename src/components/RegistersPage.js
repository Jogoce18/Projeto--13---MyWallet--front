import React, { useContext, useState, useEffect } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import dotenv from 'dotenv';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import UserContext from './../contexts/userContext';
import { BsFillTrashFill } from 'react-icons/bs';
import { sendConfirm } from "./Alert";

dotenv.config();

function RegistersPage() {
    const { user } = useContext(UserContext);
    const [registers, setRegisters] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
  

    const getRegisters = () => {
        const URL = `http://localhost:5000/extractos`;
        const { token } = user;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios
            .get(URL, config)
            .then((res) => {
                setRegisters(res.data);
            })
            .catch((err) => {
                console.log({ message: 'Error getting registers', err });
            });
    };

    const balance = () => {
        let totalAmount = 0;
        registers.forEach((register) => {
            if (register.type === 'deposit') {
                totalAmount += parseFloat(register.value);
            } else {
                totalAmount -= parseFloat(register.value);
            }
        });
        return totalAmount;
    };
    
    const logOut = () => {
        const { token } = user;
        const URL = `http://localhost:5000/logout`;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios
            .post(URL, {}, config)
            .then(() => {
                localStorage.removeItem('userdata');
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };
    
    function deleteMessage(id) {
        // eslint-disable-next-line no-alert
        const { token } = user;
        sendConfirm('warning', '', 'Quer remover esse registro?')
    .then(result => {
        if (result.isConfirmed) {
            const URL = `http://localhost:5000/extractos/${id}`;

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
        
    

            axios
                .delete(URL, config)
                .then(() => {
                    getRegisters();
                })
                .catch((err) => {
                    // eslint-disable-next-line no-alert
                    alert(err.response.data);
                });
            }else if (result.isDenied) {
                return
              }
      })
    }


    useEffect(() => {
        getRegisters();
    }, []);

    useEffect(() => {
        setTotal(balance());
    }, [registers]);
    return (
        <>
            <HeaderRegisters>
                <h1>Olá, {user.name}</h1>
            <RiLogoutBoxRLine className="logout" onClick={() => logOut()} />
            </HeaderRegisters>
            <RegistersContainer>
            <div className="values-scroll">
                    {registers.length > 0 ? (
                        registers.map((register) => (
                            <RegisterContainer type={register.type}
                                // eslint-disable-next-line no-underscore-dangle
                            >
                                 <div className="register-container-date-description">
                                    <span className="date">
                                        {register.date}
                                    </span>
                                    <div className="description">
                                        <span>{register.description}</span>
                                    </div>
                                </div>
                                <div className="register-container-value">
                                    <h2>
                                        {parseFloat(register.value)
                                            .toFixed(2)
                                            .replace('.', ',')}
                                    </h2>
                                    < BsFillTrashFill
                                      className="delete-icon"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        // eslint-disable-next-line no-underscore-dangle
                                        deleteMessage(register._id);
                                    }}
                                      
                                    />
                                </div>
                            </RegisterContainer>
                        ))
                    ) : (
                        <div className="no-registers-container">
                            <p>Não há registros de entrada ou saída</p>
                        </div>
                    )}
                </div>
                {registers.length > 0 ? (
                    <Footer balance={total}>
                        <div className="total-value">
                            <h1 className="balance">SALDO</h1>
                            <h1 className="amount">
                                R$ {total.toFixed(2).replace('.', ',')}
                            </h1>
                        </div>
                    </Footer>
                ) : (
                    <Footer />
                )}
            </RegistersContainer>
            <NewRegisterContainer>
                <NewRegisterButton
                    onClick={() =>
                        navigate(`/registerdeposit`)
                    }
                >
                    <AiOutlinePlusCircle className="new-register-icon" />
                    <div className="new-register-text">
                        <h1>Nova Entrada</h1>
                    </div>
                </NewRegisterButton>
                <NewRegisterButton
                    onClick={() =>
                        navigate(`/registerwithdraw`)
                    }
                >
                    <AiOutlineMinusCircle className="new-register-icon" />
                    <div className="new-register-text">
                        <h1>Nova Saída</h1>
                    </div>
                </NewRegisterButton>
            </NewRegisterContainer>
        </>
    );
}


export default RegistersPage;

const HeaderRegisters = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 28px 24px 0 24px;
    h1 {
        color: #ffffff;
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
    }
    .logout {
        cursor: pointer;
        color: #ffffff;
        font-size: 25px;
    }
`;

const RegistersContainer = styled.header`
    width: 87vw;
    height: 446px;
    background: #ffffff;
    border-radius: 5px;
    margin: 0 auto;
    margin-top: 22px;
    /* overflow-y: scroll; */
    position: relative;
    .values-scroll {
        overflow-y: scroll;
        width: 87vw;
        height: 446px;
    }
    .no-registers-container {
        width: 326px;
        height: 446px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
    }
    p {
        width: 180px;
        height: 46px;
        text-align: center;
        font-style: normal;
        line-height: 23px;
        font-weight: 400;
        font-size: 20px;
        color: #868686;
    }
`;

const RegisterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 12px 0 12px;
    :last-child {
        margin-bottom: 50px;
    }
    .register-container-value h2 {
        color: ${(props) => props.type === 'deposit' && '#03AC00'};
        color: ${(props) => props.type === 'withdraw' && '#C70000'};
    }
    .register-container-date-description {
        word-wrap: break-word;
        display: flex;
        .date {
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            color: #c6c6c6;
        }
        .description {
            padding-left: 10px;
        }
    }
    .register-container-value {
        display: flex;
        .delete-icon {
            font-size: 16px;
            color: #c6c6c6;
            margin-left: 5px;
        }
    }
`;

const Footer = styled.footer`
    .total-value {
        display: flex;
        justify-content: space-between;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        padding: 10px 15px;
        background: #ffffff;
        margin-top: 5px;
        border-radius: 5px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        .balance {
            font-style: normal;
            font-weight: 700;
            font-size: 17px;
            color: #000000;
        }
        .amount {
            font-style: normal;
            font-weight: 400;
            font-size: 17px;
            color: ${(props) => (props.balance > 0 ? '#03AC00' : '#C70000')};
        }
    }
`;

const NewRegisterContainer = styled.div`
    width: 87vw;
    display: flex;
    align-items: center;
    margin: 0 auto;
`;

const NewRegisterButton = styled.div`
    :first-child {
        margin-right: 10px;
    }
    width: 87%;
    height: 87%;
    background: #a328d6;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 12px;
    .new-register-icon {
        width: 25px;
        height: 25px;
        color: #ffffff;
        margin: 8px;
    }
    .new-register-text {
        width: 64px;
        height: 40px;
        margin: 10px;
    }
    h1 {
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        color: #ffffff;
    }
`;
