import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';

import manIcon from '../styles/man.svg'
import womanIcon from '../styles/woman.svg'

export default memo(({ data, isConnectable }) => {
  return (
    <div 
    className="react-flow__node react-flow__node-default selected selectable"
    >
      <Handle
        type="target"
        position="top"
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div>
        Teste arrochado
      </div>
      <Handle
        type="source"
        position="bottom"
        id="a"
        isConnectable={isConnectable}
      />
    </div>
  );
});