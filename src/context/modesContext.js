import { createContext, useState } from "react";

const ModesContext = createContext();
const ModesContextProvider = ()=>{
    const [lightMode, setLightMode] = useState(false);

    const data = {lightMode,setLightMode};
};