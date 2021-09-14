import React, { useState } from 'react';

import Page from './statisticPage'
import FlowPage from './reactFlow';

import logo from '../styles/logo.png'
import '../styles/loginPage.css'

const Main = () => {
    const [click, setClick] = useState(true);
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [enter, setEnter] = useState(false)
    const [wrongUser, setWrongUser] = useState('Digite admin')
    const [wrongPass, setWrongPass] = useState('Digite admin')

    function handleRegister (e) {
        e.preventDefault();
        if (user === 'admin') {
            if (password === 'admin') {
                setEnter(true);
            }
            else {
                setWrongPass('Senha incorreta.')
            }
        } else {
            setWrongUser('Usuário errado.')
        }
        
        setUser(''); setPassword('');
    };
    
    function Clicou() {
        setClick(!click)
    }

    return(
        <div>
            {!enter 
            ? <div className="main">
                <div className="login-container">
                    <h1>Graph Project</h1>

                    <div className="input-block">
                        <label htmlFor="user">Usuário</label>
                        <input value={user} required placeholder={wrongUser}
                            onChange={e => {setUser(e.target.value)}}
                        />
                    </div>

                    <div className="input-block">
                        <label htmlFor="password">Senha</label>
                        <input value={password} required placeholder={wrongPass}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <button onClick={handleRegister}>Entrar</button>
                </div> 
            </div> 

            : <div>
                <header className="header">
                    <img src={logo} alt="logo"/>
                    <button onClick={Clicou}>Completar Cadastro</button>
                </header>
                <div>
                    {click 
                    ? <FlowPage />
                    : <Page />
                    }
                </div>
            </div>
            }
        </div>
    )
}

export default Main;