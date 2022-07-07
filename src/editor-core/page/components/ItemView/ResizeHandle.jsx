import React from 'react';

const ResizeHandle = () => {
  return <div style={{
    position: 'absolute',
    background: '#fff',
    border: '1px solid #59c7f9',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }}/>;
}

export default ResizeHandle;