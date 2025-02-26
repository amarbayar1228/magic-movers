import { Button, Image, Space } from "antd";
import css from "./style.module.css";
import { useEffect, useState } from "react";
const Zurag = () => {
   const [matches500, setMatches5] = useState(false);
    
    useEffect(() => {
      if (typeof window !== "undefined") {
        
        setMatches5(window.matchMedia("(min-width: 500px)").matches);
        window.matchMedia("(min-width: 500px)").addEventListener('change', e => setMatches5(e.matches));
      }
    }, []);
    return<div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
      <div style={{display: "flex", gap: "40px"}}>
        <Image className={css.ftImg}  src="/img/zr1.webp"  width={matches500 ? 250 : 160} height={matches500 ? 250 : 160} alt="magic" />
        <Image className={css.ftImg} src="/img/zr2.webp" width={matches500 ? 250 : 160} height={matches500 ? 250 : 160} alt="magic"/>
      </div>
      <div style={{display: "flex", gap: "40px"}}>
        <Image className={css.ftImg} src="/img/zr3.webp" width={matches500 ? 250 : 160} height={matches500 ? 250 : 160} alt="magic"/>
        <Image className={css.ftImg} src="/img/zr4.webp" width={matches500 ? 250 : 160} height={matches500 ? 250 : 160} alt="magic"/>
      </div>
   
    </div>
}
export default Zurag;