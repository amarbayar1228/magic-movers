
import axios from "../../axios-orders"; 

import { useEffect, useState } from "react";
const Dashboard = () =>{
    const [count, setCount] = useState(1);

    useEffect(()=>{ 
          axios
            .get(`customer.json`)
            .then((res) => { 
                const data = Object.entries(res.data).reverse();   
                setCount(data[0][1].user);
            })  
      },[]);

return <div style={{width: "100%", height: "100vh"}}>
    <div style={{display: "flex", alignItems: "center", justifyContent:"center", height:"100%" }}>
        Number of visits to the website:  {count}
    </div>
</div>
}
export default Dashboard;