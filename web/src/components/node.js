import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';
import '../styles/node.css'

export const adulto =  memo(({ data, isConnectable }) => {
  return (
    <div className='noBox' style={{ borderColor: 'blue' }}>
      <Handle
        type="target"
        position="top"
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      {data.label}
      
      <Handle
        type="source"
        position="bottom"
        isConnectable={isConnectable}
      />
    </div>
  );
});

export const idoso =  memo(({ data, isConnectable }) => {
  return (
    <div className='noBox' style={{ borderColor: 'red' }}>
      <Handle
        type="target"
        position="top"
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      {data.label}
      
      <Handle
        type="source"
        position="bottom"
        isConnectable={isConnectable}
      />
    </div>
  );
});