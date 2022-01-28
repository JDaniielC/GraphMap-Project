import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';
import clothingIcon from '../styles/cloching-donation.png';
import moneyIcon from '../styles/sponsorship.png';
import prayIcon from '../styles/prayer.png';
import foodIcon from '../styles/food-donation.png';
import '../styles/node.css'

export const clothing =  memo(({ data, isConnectable }) => {
  return (
    <div className='noBox' style={{ borderColor: 'blue' }}>
      <Handle
        type="target"
        position="top"
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />

      {data.label}
      <div className='noBoxImage'>
        <img src={clothingIcon} alt="Ajuda com vestimenta" />
      </div>
            
      <Handle
        type="source"
        position="bottom"
        isConnectable={isConnectable}
      />
    </div>
  );
});

export const money =  memo(({ data, isConnectable }) => {
  return (
    <div className='noBox' style={{ borderColor: 'red' }}>
      <Handle
        type="target"
        position="top"
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />

      {data.label}
      <div className='noBoxImage'>
        <img src={moneyIcon} alt="Ajuda com dinheiro" />
      </div>   

      <Handle
        type="source"
        position="bottom"
        isConnectable={isConnectable}
      />
    </div>
  );
});

export const pray =  memo(({ data, isConnectable }) => {
  return (
    <div className='noBox' style={{ borderColor: 'yellow' }}>
      <Handle
        type="target"
        position="top"
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />

      {data.label}
      <div className='noBoxImage'>
        <img src={prayIcon} alt="Ajuda com espiritual" /> 
      </div>
      
      <Handle
        type="source"
        position="bottom"
        isConnectable={isConnectable}
      />
    </div>
  );
});

export const food =  memo(({ data, isConnectable }) => {
  return (
    <div className='noBox' style={{ borderColor: 'orange' }}>
      <Handle
        type="target"
        position="top"
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />

      {data.label}
      <div className='noBoxImage'>
        <img src={foodIcon} alt="Ajuda com alimentos" />
      </div>      

      <Handle
        type="source"
        position="bottom"
        isConnectable={isConnectable}
      />
    </div>
  );
});