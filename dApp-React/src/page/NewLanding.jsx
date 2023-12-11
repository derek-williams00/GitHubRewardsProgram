import { useState } from "react";
import MetamaskSetup from "../component/MetamaskSetup";
import GetTaskForm from "../component/GetTaskForm";
import RoleSelection from "../layout/RoleSelection";

const Landing = () => {
    return (
       <>
          <div className="App">
             <MetamaskSetup />
             <GetTaskForm />
             <RoleSelection />
          </div>
       </>
    );
}

export default Landing;
