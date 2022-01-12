import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../styles/loginPage.css'

const Main = () => {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [enter, setEnter] = useState(false)
    const [wrongUser, setWrongUser] = useState('Digite o usuário')
    const [wrongPass, setWrongPass] = useState('Digite a senha')

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

    function help() {
        setWrongUser('Digite admin');
        setWrongPass('Digite admin');
    }

    return(
        <> {!enter 
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
                <button id='forget' onClick={help} >Esqueceu a senha?</button>
            </div> 
        </div> 

        : <Navigate to="flow" /> 
        } </>
    )
}

export default Main;