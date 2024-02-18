import React from 'react';
import { TailSpin } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100px',
      }}
    >
      <TailSpin color="#00BFFF" height={50} width={50} />
    </div>
  );
};

export default Loader;
