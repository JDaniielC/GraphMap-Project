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
import logo from '../styles/logo.png'

localforage.config({
  name: 'react-flow-docs',
  storeName: 'flows',
});

const flowKey = 'example-flow';

const getNodeId = () => `randomnode_${+new Date()}`;

const TestButton = () => {

  const [rfInstance, setRfInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));

  const [showModal, setShowModal] = useState(false);
  const [modalX, setModalX] = useState("calc(50vw - 100px)");
  const [modalY, setModalY] = useState("calc(50vh - 150px)");

  const [selectedNode, setSelectedNode] = useState({
    name: "Selecionado", discount: 10, since: "16/07"
  })

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();

      localforage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(await localforage.getItem(flowKey));

      if (flow) {
        setElements([]);
        for (const element of flow.elements) {
          setElements((els) => els.concat(element))
        }
      }
    };

    restoreFlow();
  }, [setElements]);

  useEffect(() => { onRestore() }, [onRestore])
 
  const onAdd = useCallback(async () => {
    const node = await localforage.getItem("lastNode");
    const countX = (node) ? node.position.x : 0;
    const countY = (node) ? node.position.y : 0;
    const uniqueId = getNodeId();

    const newNode = {
      id: uniqueId,
      data: { label: `Node ${uniqueId}` },
      position: {
        x: countX,
        y: countY + 100,
      },
    };

    localforage.setItem("lastNode", newNode);
    setElements((els) => els.concat(newNode));
  }, [setElements]);

  function selectNode(evt, node) {
    let selected = selectedNode;
    selected.name = node.data.label;
    setSelectedNode(selected);

    setModalX(`calc(${evt.clientX}px - 100px)`);
    setModalY(`calc(${evt.clientY}px + 25px)`);
    
    setShowModal(true);
  }

  return (
  <ReactFlowProvider>
    <div className="header">
      <img src={logo} alt="logo"/>

      Nilson multinível
    </div>
    <div className="flow">
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
    <div className="save__controls">
        <button onClick={onSave}>save</button>
        <button onClick={onRestore}>restore</button>
        <button onClick={onAdd}>add node</button>
    </div>
    <div className = "overlay" style = {{ 
        display: (showModal) ? "flex" : "none",
        top: modalY, left: modalX
      }}>
      <button onClick = {() => setShowModal(false)}> X </button>
      <h3> { selectedNode.name } </h3>
      <p> Com {selectedNode.discount}% de desconto </p>
      <p> Cadastrado no dia {selectedNode.since} </p>
    </div>
  </ReactFlowProvider>
  );
};

export default TestButton; 