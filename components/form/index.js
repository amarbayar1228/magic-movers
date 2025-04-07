import { DatePicker, Input, message, Radio } from "antd";
import { useEffect, useState } from "react";
import emailjs from "emailjs-com";   
import css from "./style.module.css";
const FormCont = () => {
      const [mailData, setMailData] = useState({
        to_name: "", // your name
        from_name: "", // Your mail
        phone_number: "", // Your mail
        message: "asd",
        pick_up_location: "", // Your mail
        drop_off_location: "", // Your mail
        moving_date: "",
        moving_size: "",
        form_name: "magicmoversla@gmail.com" // tuhai n hvniih
      });
      const [loading, setLoading] = useState(false);
 
        const onChange = (date, dateString) => { 
            setMailData({ ...mailData, moving_date:dateString }) 
          };

          const sendMail = () => { 
            setLoading(true);
          console.log("mailData: ", mailData);
            emailjs
            .send(
                "service_vfeb1rk", // service id service_rq0sez5
                "template_n1limzb", // template id
                mailData,
                "uZb0rDKmRujoy7mfg" // public api uZb0rDKmRujoy7mfg
            )
            .then(
                (response) => { 
                console.log("res: ", response);
                    setMailData({   
                    to_name: "", // your name
                    from_name: "", // Your mail
                    phone_number: "", // Your mail
                    message: "1",
                    pick_up_location: "", // Your mail
                    drop_off_location: "", // Your mail
                    moving_date: "",
                    form_name: "magicmoversla@gmail.com", // tuhai n hvniih
                    moving_size: "",
                    });
                    message.success("sent successfully")
                },
                (err) => {
                message.error("Server Error")
                console.log(err.text);
                }
            ).finally(()=>{
                setLoading(false)
            });
          }
    return <div>
        <div className={css.form}>
        <div className={css.getTitle}>Get Your Free Quote</div>
        <div className={css.getTitleSmall}>Moving Size <span style={{color: "rgba(25, 62, 61, 0.9)", fontSize: "25px"}}>*</span></div>
        <div className={css.groupRadio}> 
        <Radio.Group
        // style={{ display: 'flex', flexDirection: 'column' }}
        className={css.radioGroupCss}
        name="radiogroup"
        defaultValue={1}
        onChange={(e)=> setMailData({ ...mailData, moving_size: e.target.value })}
        size="large"
        options={[
        {
        value:"Studio",
        label: <span className={css.radioTitle}>Studio</span>,
        },
        {
        value: "1 Bedroom",
        label: <span className={css.radioTitle}>1 Bedroom</span>,
        },
        {
        value: "2 Bedroom",
        label: <span className={css.radioTitle}>2 Bedroom</span>,
        },
        {
        value: "3+ Bedroom",
        label: <span className={css.radioTitle}>3+ Bedroom</span>,
        },
        ]}
        />
        </div>
        <div className={css.pickLo}>
        <div style={{display: "flex", flexDirection: "column",  gap: "10px"}}> 
        <div className={css.getTitleSmall}>Pick-Up Location <span style={{color: "rgba(25, 62, 61, 0.9)", fontSize: "25px"}}>*</span></div>
        <div>
        <Input placeholder="Pick-Up Location" size="large" value={mailData.pick_up_location} 
        onChange={(e) => setMailData({ ...mailData, pick_up_location: e.target.value })} 
        /></div>
        </div>
        <div style={{display: "flex", flexDirection: "column",  gap: "10px"}}> 
        <div className={css.getTitleSmall}>Drop off Location <span style={{color: "rgba(25, 62, 61, 0.9)", fontSize: "25px"}}>*</span></div>
        <div><Input placeholder="Drop off Location" size="large"  value={mailData.drop_off_location}
        onChange={(e)=> setMailData({ ...mailData, drop_off_location: e.target.value })}/></div>
        </div>
        </div>
        <div className={css.pickLo}>
        <div style={{display: "flex", flexDirection: "column",  gap: "10px"}}> 
        <div className={css.getTitleSmall}>Moving Date <span style={{color: "rgba(25, 62, 61, 0.9)", fontSize: "25px"}}>*</span></div>
        <div>
        <DatePicker onChange={onChange} size="large" />
        </div>
        </div>
        <div style={{display: "flex", flexDirection: "column",  gap: "10px"}}> 
        <div className={css.getTitleSmall}>Name <span style={{color: "rgba(25, 62, 61, 0.9)", fontSize: "25px"}}>*</span></div>
        <div><Input placeholder="Name" size="large"  value={mailData.to_name}
        onChange={(e)=> setMailData({ ...mailData, to_name: e.target.value })}/></div>
        </div> 
        </div>
        <div className={css.pickLo}>
        <div style={{display: "flex", flexDirection: "column",  gap: "10px"}}> 
        <div className={css.getTitleSmall}>Phone <span style={{color: "rgba(25, 62, 61, 0.9)", fontSize: "25px"}}>*</span></div>
        <div><Input placeholder="Phone" size="large" value={mailData.phone_number} onChange={(e)=> setMailData({ ...mailData, phone_number: e.target.value })}/></div>
        </div>
        <div style={{display: "flex", flexDirection: "column",  gap: "10px"}}> 
        <div className={css.getTitleSmall}>E-mail <span style={{color: "rgba(25, 62, 61, 0.9)", fontSize: "25px"}}>*</span></div>
        <div><Input placeholder="E-mail" size="large" value={mailData.from_name}  onChange={(e)=> setMailData({ ...mailData, from_name: e.target.value })}/></div>
        </div> 
        </div>

        <div style={{marginTop: "20px"}}> </div> 
        <div className={css.submitCss} onClick={()=> sendMail()}
        style={{
        opacity: loading ? 0.6 : 1,
        pointerEvents: loading ? "none" : "auto",
        cursor: loading ? "not-allowed" : "pointer",
        }}
        >
        {loading ? "Loading..." : "Submit"}
        </div>

        </div>
    </div>
}
export default FormCont;