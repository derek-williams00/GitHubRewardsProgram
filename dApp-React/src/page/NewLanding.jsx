import { useState } from 'react';
import MetamaskSetup from '../component/MetamaskSetup';
import GetTaskForm from '../component/GetTaskForm';
import RoleSelection from '../layout/RoleSelection';

const Landing = () => {
  return (
    <>
      <div className="inset-0 h-screen w-screen items-center justify-center">
        <div className="flex flex-col h-screen w-screen items-center justify-center">
          <MetamaskSetup />
          <RoleSelection />
          <GetTaskForm />
        </div>
      </div>
    </>
  );
};

export default Landing;
