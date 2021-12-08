import { createContext, useState } from "react";

const ContextResize = createContext();
const ContextResizeProvider = ({children})=>{
    const [onDesktop, setOnDesktop] = useState(false);

    const resize = ()=>{
        let {clientWidth} = document.documentElement;
        clientWidth > 1200 ?setOnDesktop(true) :setOnDesktop(false);
    };
    const width = ()=>{
        let initialWidth = document.documentElement.clientWidth;
        initialWidth > 1200 ?setOnDesktop(true) :setOnDesktop(false);
    };

    let data = {resize,onDesktop,width};
    return(<ContextResize.Provider value={data}>{children}</ContextResize.Provider>);
};
export {ContextResizeProvider};
export default ContextResize;