export const fetchRequest = async(url)=>{
    try {
        let req = await fetch(url);
        let res = await req.json();
        
        if (req.ok){
            return res;
        }else{
            throw new Error({status:req.status,statusText:req.statusText});
        };
    } 
    catch(err) {
        console.log(err);
        return err;
    };
};
