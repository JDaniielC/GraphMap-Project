import React, { useState } from 'react';

import Page from './statisticPage'
import FlowPage from './reactFlow';

import logo from '../styles/logo.png'
import '../styles/flow.css'

const Main = () => {
    const [click, setClick] = useState(true);

    function Clicou() {
        setClick(!click)
    }

    return(
        <div>
            <header className="header">
                <img src={logo} alt="logo"/>
                <button onClick={Clicou}>Clique aqui</button>
            </header>
            <div>
                {click 
                 ? <FlowPage />
                 : <Page />
                }
            </div>
        </div>
    )
}

export default Main;