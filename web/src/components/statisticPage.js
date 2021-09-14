import React, { useState } from "react";
import '../styles/page.css'

const Page = () => {
    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [data, setData] = useState('');
    const [sexo, setSexo] = useState('');
    const [cpf, setCpf] = useState('');

    const handleRegister = async () => {
        return null;
    }

    return (
    <div className="content">
        <div>
            <div id="mapid" className="animate-appear"></div>
        </div>

        <div className="animate-left form">
            <h1>
                Atualizar Cadastro
            </h1>

            <div className="input-block">
            <label htmlFor="name">Nome do aluno</label>
            <input name="name" id="name" value={name} 
                required readOnly
            />
            </div>

            <div className="input-block">
            <label htmlFor="cpf">CPF</label>
            <input name="cpf" id="cpf" value={cpf} required
                onChange={e => {setCpf(e.target.value)}}
            />
            </div>

            <div className="input-block">
            <label htmlFor="sexo">Sexo</label>
            <input name= "sexo" value={sexo}
                id= "sexo" required
                onChange={e => setSexo(e.target.value)}
            />
            </div>

            <div className="input-block">
            <label htmlFor="data">Data de Nascimento</label>
            <input name="data" id="data" value={data} required
                onChange={e => {setData(e.target.value)}}
            />
            </div>

            <div className="input-block">
            <label htmlFor="endereco">Endereço</label>
            <input name= "endereco" value={endereco}
                id= "endereco" required
                onChange={e => setEndereco(e.target.value)}
            />
            </div>

            <div className="input-block">
            <label htmlFor="telefone">Telefone</label>
            <input name="telefone" id="telefone" value={telefone} required
                onChange={e => {setTelefone(e.target.value)}}
            />
            </div>

            <div className="input-block">
            <label htmlFor="email">Email</label>
            <input name= "email" value={email}
                id= "email" required
                onChange={e => setEmail(e.target.value)}
            />

            </div>

            <div className="input-block">
            <label htmlFor="value">Mensalidade</label>
            <input type="number" name= "value" value={value}
                id= "value" required
                readOnly
            />
            </div>

            <button onClick={handleRegister}> Atualizar Cadastro </button>
        </div>
    </div>
    )
}

export default Page;