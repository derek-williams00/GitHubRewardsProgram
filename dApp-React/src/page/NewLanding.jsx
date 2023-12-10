import { useState } from "react";
import MetamaskSetup from "../component/MetamaskSetup";
import RoleSelection from "../layout/RoleSelection";

const Landing = () => {
    return (
       <>
          <div className="App">
             <MetamaskSetup />
             <RoleSelection />
          </div>
       </>
    );
}

export default Landing;
