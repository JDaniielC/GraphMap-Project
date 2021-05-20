import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
   Background, 
   MiniMap, 
   Controls, 
   ReactFlowProvider, 
   addEdge, 
   removeElements
  } from 'react-flow-renderer';
import localforage from 'localforage';
import initialElements from './initialElements'
import "../styles/overlay.css";
import '../styles/flow.css';
import '../styles/animations.css'
import logo from '../styles/logo.png'
import api from '../services/api';

localforage.config({
  name: 'react-flow-docs',
  storeName: 'flows',
});

const getNodeId = () => `randomnode_${+new Date()}`;

const TestButton = () => {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [bonus, setBonus] = useState('');

  const [rfInstance, setRfInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));

  const [showModal, setShowModal] = useState(false);
  const [modalX, setModalX] = useState("calc(50vw - 100px)");
  const [modalY, setModalY] = useState("calc(50vh - 150px)");

  const [selectedNode, setSelectedNode] = useState({})

  const onSave = useCallback(async () => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      console.log(flow)
      await api.post('/flow/', { elements: flow.elements });
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const { data: flow } = await api.get('/flow/');
      console.log(flow)
      if (flow) {
        setElements([]);
        for (const element of flow.elements) {
          setElements((els) => els.concat(element))
        }
      }
    };

    restoreFlow();
  }, [setElements]);

  useEffect(() => { 
    async function loadNodes() {
      const response = await api.get('/student/');
      setSelectedNode(response.data);
    }
    loadNodes();
    onRestore();
  }, [onRestore]);
 
  const handleRegister = useCallback(async () => {
    const requestData = await api.post(
      '/student/', { name, value });
    setName(''); setValue('');

    const { 
      name: studentName, 
      value: studentPay,
      discount, createdAt
    } = requestData.data;
    const node = await localforage.getItem("lastNode");
    const countX = (node) ? node.position.x : 0;
    const countY = (node) ? node.position.y : 0;
    const uniqueId = getNodeId();

    const newNode = {
      id: uniqueId,
      data: { 
        label: studentName,
        payment: studentPay,
        since: new Date(Date.parse(createdAt)),
        discount, 
      },
      position: {
        x: countX,
        y: countY + 100,
      },
    };

    localforage.setItem("lastNode", newNode);
    setElements((els) => els.concat(newNode));
  }, [setElements, name, value]);

  function selectNode(evt, node) {
    function formatDate(data){
      var
        dia  = data.getDate().toString(),
        diaF = (dia.length === 1)?'0'+ dia : dia,
        mes  = (data.getMonth()+1).toString(),
        mesF = (mes.length === 1)?'0'+ mes : mes,
        anoF = data.getFullYear();
      return diaF + "/" + mesF + "/" + anoF;
    }

    let selected = selectedNode;
    selected.name = node.data.label;
    selected.value = node.data.payment;
    selected.discount = node.data.discount;
    selected.since = formatDate(node.data.since);
    setSelectedNode(selected);

    console.log(selected)

    setModalX(`calc(${evt.clientX}px - 100px)`);
    setModalY(`calc(${evt.clientY}px + 25px)`);
    
    setShowModal(true);
  }

  return (
  <ReactFlowProvider>
    <div className="header">
      <img src={logo} alt="logo"/>
      Projeto
    </div>
    <div className="content">
    <div className="animate-appear flow">
        <ReactFlow
          elements={elements}
          onElementsRemove={onElementsRemove}
          onConnect={onConnect}
          onLoad={setRfInstance}
          onElementClick = {selectNode}
          onNodeDragStop = {(evt, node) => localforage.setItem("lastNode", node)}
        >
          <Background
            variant="lines"
            gap={12}
            size={1}
          />

          <MiniMap
            nodeColor={(node) => {
              switch (node.type) {
                case 'input':
                  return 'red';
                case 'default':
                  return '#00ff00';
                case 'output':
                  return 'rgb(0,0,255)';
                default:
                  return '#eee';
              }
            }}
            nodeStrokeWidth={3}
          />
          <Controls />
        </ReactFlow>
      </div>

      <div className="animate-left form">
        <h1>
          Cadastro
        </h1>
        <div className="input-block">
          <label htmlFor="name">Nome do aluno</label>
          <input name="name" id="name" required
            onChange={e => {
              setName(e.target.value)}}
          />
        </div>

        <div className="input-block">
          <label htmlFor="value">Mensalidade</label>
          <input type="number" name= "value"
            id= "value" required
            onChange={e => setValue(e.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="bonus">Indicado por</label>
          <input name= "bonus" id="bonus" 
            onChange={e => setBonus(e.target.value)}
          />
        </div>

        <button onClick={handleRegister}> Cadastrar </button>

        <button onClick={onSave}>Salvar mapa</button>

        <button onClick={onRestore}>Restaurar</button>
      </div>
    </div>
    <div className = "overlay" style = {{ 
        display: (showModal) ? "flex" : "none",
        top: modalY, left: modalX
      }}>
      <button onClick = {() => setShowModal(false)}> X </button>
      <h3> { selectedNode.name } </h3>
      <p> Valor da mensalidade é {selectedNode.value} </p>
      <p> Com {selectedNode.discount}% de desconto </p>
      <p>Criado em {selectedNode.since} </p>
    </div>
  </ReactFlowProvider>
  );
};

export default TestButton; 