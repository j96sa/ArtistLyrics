import { createContext, useState } from "react";

const ModesContext = createContext();
const ModesContextProvider = ({children})=>{
    const [lightMode, setLightMode] = useState(false);

    const data = {lightMode,setLightMode};
    return(<ModesContext.Provider value={data}>{children}</ModesContext.Provider>);
};
export {ModesContextProvider};
export default ModesContext;
