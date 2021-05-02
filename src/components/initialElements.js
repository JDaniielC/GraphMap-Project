import React from 'react';

const initialElements = [
  { id: '1', data: { label: 'Node 1' }, position: { x: 100, y: 100 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
  {
    id: '3',
    type: 'input',
    data: {
      label: (
        <> Welcome to React Flow! </>
      ),
    },
    position: { x: 250, y: 0 },
  },
  { id: 'e1-2', source: '1', target: '2' },
];

export default initialElements;