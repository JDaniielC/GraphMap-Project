import React, { useState } from 'react';

import Page from './statisticPage'
import FlowPage from './reactFlow';

import logo from '../styles/logo.png'
import '../styles/loginPage.css'
import edit from '../styles/edit.png'

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
        <>
        {!enter 
        ? <div className="main">
            <div className="login-container">
                <h1>GraphMap Project</h1>

                <div className="input-block">
                    <input value={user} required placeholder={wrongUser}
                        onChange={e => {setUser(e.target.value)}}
                    />
                </div>

                <div className="input-block">
                    <input value={password} required placeholder={wrongPass}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <button id='copy' onClick={handleRegister}>Entrar</button>
                <div id="div"></div>
                <button id='forget'>Esqueceu a senha?</button>
            </div> 
        </div> 

        : <>
        <img className='show' onClick={Clicou} src={logo} alt="Mostrar cadastrados" />
        <img className='edit' onClick={Clicou} src={edit} alt="Cadastro" />
            <div>
                {click 
                ? <FlowPage />
                : <Page />
                }
            </div>
        </>
        }
        </>
    )
}

export default Main;