import React, { useState, useCallback } from 'react';
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
        // setElements(flow.elements || []);
      }
    };

    restoreFlow();
  }, [setElements]);

  const onAdd = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      data: { label: 'Added node' },
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      },
    };

    setElements((els) => els.concat(newNode));
  }, [setElements]);


return (
    <ReactFlowProvider>
      <div className="flow" style={{ height: 900 }}>
        <ReactFlow
          elements={elements}
          onElementsRemove={onElementsRemove}
          onConnect={onConnect}
          onLoad={setRfInstance}
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
    </ReactFlowProvider>
);

};

export default TestButton; 