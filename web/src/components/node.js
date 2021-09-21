import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';
import manIcon from '../styles/woman.svg';
import womanIcon from '../styles/man.svg';
import '../styles/node.css'

// const getNodeId = () => `point_${+new Date()}`;

export default memo(({ data, isConnectable }) => {
  return (
    <div className='noBox'>
      <Handle
        type="target"
        position="top"
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />

      {data.label}
      {data.sex === 1 
      ? <img src={manIcon} alt="Homem" style={{width: 30, height: 30}}/> 
      : <img src={womanIcon} alt="Mulher" style={{width: 30, height: 30}}/>}
      
      <Handle
        type="source"
        position="bottom"
        // id = 'abc'
        isConnectable={isConnectable}
      />
    </div>
  );
});