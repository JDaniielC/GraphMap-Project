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
import "../styles/overlay.css";
import '../styles/flow.css';
import '../styles/animations.css'
import api from '../services/api';

import sexNode from './node';

localforage.config({
  name: 'react-flow-docs',
  storeName: 'flows',
});

const nodeTypes = {
  selectorNode: sexNode,
};

const initialElements = [];

const getNodeId = () => `randomnode_${+new Date()}`;

const FlowPage = () => {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [rfInstance, setRfInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState({});
  const [modalX, setModalX] = useState("calc(50vw - 100px)");
  const [modalY, setModalY] = useState("calc(50vh - 150px)");
  const [elements, setElements] = useState(initialElements);
  const [sex, setSex] = useState();

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  
    const onConnect = (params) => {
    const fatherId = params.source;
    console.log(fatherId)
    setElements((els) => addEdge(params, els));
    addDiscount(fatherId);
  };

  async function addDiscount(fatherId) {
    setElements((els) => els.map((el) => {
      if (el.id === fatherId) {
        const oldDiscount = el.data.discount;
        console.log(rfInstance.toObject())
        el.data = {
          ...el.data,
          discount: oldDiscount + 5
        }
      }
      return el;
    }))
  }

  const onSave = useCallback(async () => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      await api.post('/flow/', { elements: flow.elements });
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const { data: flow } = await api.get('/flow/');

      if (flow) {
        setElements([]);
        for (const element of flow) {
          setElements((els) => els.concat(element))
        }
      }
    };
    restoreFlow();
  }, [setElements]);

  useEffect(() => { 
    const restoreFlow = async () => {
      const { data: flow } = await api.get('/flow/');
      if (flow) {
        setElements([]);
        for (const element of flow) {
          setElements((els) => els.concat(element))
        }
      }
    };
    restoreFlow();
  }, []);
 
  const handleRegister = useCallback(async (e) => {
    e.preventDefault();
    const node = await localforage.getItem("lastNode");
    const countX = (node) ? node.position.x : 0;
    const countY = (node) ? node.position.y : 0;
    const uniqueId = getNodeId();

    const newNode = {
      id: uniqueId,
      data: { 
        label: name,
        payment: value,
        since: new Date(),
        discount: 0, 
        type: sex > 0 ? 'selectorNode' : 'default',
      },
      position: {
        x: countX,
        y: countY + 100,
      }
    };

    setName(''); setValue('');
    localforage.setItem("lastNode", newNode);
    setElements((els) => els.concat(newNode));
  }, [setElements, name, value]);

  function selectNode(evt, node) {
    function formatDate(data){
      data = new Date(Date.parse(data));
      var
        dia  = data.getDate().toString(),
        diaF = (dia.length === 1)?'0'+ dia : dia,
        mes  = (data.getMonth()+1).toString(),
        mesF = (mes.length === 1)?'0'+ mes : mes,
        anoF = data.getFullYear();
      return diaF + "/" + mesF + "/" + anoF;
    }

    function discount(value, percent) {
      
      let mult, div, result;
      mult = value * percent;
      div = mult / 100;
      result = value - div;
  
      return result;
    }

    let selected = selectedNode;
    selected.name = node.data.label;
    selected.value = discount(node.data.payment, node.data.discount);
    selected.discount = node.data.discount;
    selected.since = formatDate(node.data.since);
    setSelectedNode(selected);

    setModalX(`calc(${evt.clientX}px - 100px)`);
    setModalY(`calc(${evt.clientY}px + 25px)`);
    
    setShowModal(true);
  }

  return (
  <ReactFlowProvider>
    <div className="content">
    <div className="animate-appear flow">
        <ReactFlow
          elements={elements}
          onElementsRemove={onElementsRemove}
          onConnect={onConnect}
          onLoad={setRfInstance}
          onElementClick = {selectNode}
          onNodeDragStop = {(evt, node) => localforage.setItem("lastNode", node)}
          nodeTypes={nodeTypes}
        >
          <Background
            variant="lines"
            gap={20}
            size={3}
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
            nodeStrokeWidth={2}
            nodeBorderRadius={8}
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
          <input name="name" id="name" value={name} required
            onChange={e => {setName(e.target.value)}}
          />
        </div>

        <div className="input-block">
          <label htmlFor="value">Mensalidade</label>
          <input type="number" name= "value" value={value}
            id= "value" required
            onChange={e => setValue(e.target.value)}
          />
        </div>

        <div className="input-block radio">
          <label htmlFor="sex">Sexo</label>
          <input type="radio" id= "neutro" name='sex'
          onChange={setSex(0)}/> 
          Neutro
          <input type="radio" name= "sex" id='male'
          onChange={setSex(1)}/> 
          Masculino
          <input type="radio" name= "sex" id='female'
          onChange={setSex(2)}/> 
          Feminino
        </div>

        <button onClick={handleRegister}> Cadastrar </button>

        <button onClick={onSave}>Salvar mapa</button>

        <button onClick={onRestore}>Restaurar</button>

        <h3 className='tutorial'>Atenção</h3>
        <p className='note'>Para apagar nó, use a tecla backspace.</p>
        <p className='note'>Lembre-se de atualizar o cadastro!</p>
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

export default FlowPage; 