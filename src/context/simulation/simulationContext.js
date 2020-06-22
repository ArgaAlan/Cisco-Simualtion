import React, { useState } from "react";

const initialState = {
  bayesian: {
    mlt_risk: [[0.2, 0.2, 0.1, 0.5], []],
    mqnt_risk: [
      [0.3, 0.3, 0.4],
      [0, 0, 1],
    ],
    mqlt_risk: [
      [0.1, 0.05, 0.25, 0.4, 0.2],
      [0, 0, 0, 0, 1],
    ],
  },
};

export const simulationContext = React.createContext();

const Store = ({ children }) => {
  const [state, setState] = useState(initialState);

  return (
    <simulationContext.Provider value={[state, setState]}>
      {children}
    </simulationContext.Provider>
  );
};

export default Store;
