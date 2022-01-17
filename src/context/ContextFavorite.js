import { createContext, useEffect, useState } from "react";

const ls = localStorage;

const ContextFavorite = createContext();
export const ContextFavoriteProvider = ({children})=>{
    
    const [list, setList] = useState(JSON.parse(ls.getItem("favorite-list")) || []);
    const [saved, setSaved] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        if (data){
            let {id} = data;
            
            let inStore = list.find(e=>e.id === id);

            if (inStore){
                setList(list.filter(e=>e.id!==id));
                setSaved(false);
            }else{
                setList([...list,data]);
                setSaved(true);
            };                        
        };
    }, [data]);

    useEffect(() => {
        ls.setItem("favorite-list",JSON.stringify(list));
        setData(null);
    }, [list]);
    
    const value = {saved,setSaved,setData,list,setList};

    return <ContextFavorite.Provider value={value}>{children}</ContextFavorite.Provider>
};
//export {ContextFavoriteProvider};
export default ContextFavorite;