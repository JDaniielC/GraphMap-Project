import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';
import './styles.css';

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
      
      <Handle
        type="source"
        position="bottom"
        // id = 'abc'
        isConnectable={isConnectable}
      />
    </div>
  );
});