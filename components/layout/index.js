import { Button, Collapse, DatePicker, Drawer, FloatButton, Input, message, Radio, Spin, theme } from "antd";
import { useState, useRef, useEffect } from "react";
import css from "./style.module.css";
import { EnvironmentOutlined, MailOutlined, ClockCircleOutlined, PhoneOutlined, MenuOutlined, CaretRightOutlined  } from '@ant-design/icons';
import Image from "next/image";
import Zurag from "../zurag";
import emailjs from "emailjs-com";
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const getItems = (panelStyle) => [
  {
    key: '1',
    label: 'This is panel header 1',
    children: <p>{text}</p>,
    style: panelStyle,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: <p>{text}</p>,
    style: panelStyle,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <p>{text}</p>,
    style: panelStyle,
  },
];
const BaseLayout = () => {
  const services = useRef(null);
  const services2 = useRef(null);
  const ourServices = useRef(null);
  const aboutUs = useRef(null);
  const reviews = useRef(null);
  const contact = useRef(null);
  const heroRef = useRef(null);  // Add heroRef here
  
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('right');
  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);
  
  const [matches1024, setMatches] = useState(false);
  const [matches768, setMatches7] = useState(false);
  const [matches500, setMatches5] = useState(false);
  const [loading, setLoading] = useState(false);

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
  useEffect(() => {
    if (typeof window !== "undefined") {
      setMatches(window.matchMedia("(min-width: 1024px)").matches);
      window.matchMedia("(min-width: 1024px)").addEventListener('change', e => setMatches(e.matches));
      
      setMatches7(window.matchMedia("(min-width: 768px)").matches);
      window.matchMedia("(min-width: 768px)").addEventListener('change', e => setMatches7(e.matches));

      setMatches5(window.matchMedia("(min-width: 500px)").matches);
      window.matchMedia("(min-width: 500px)").addEventListener('change', e => setMatches5(e.matches));
    }
  }, []);
  const { token } = theme.useToken();
  const panelStyle = { 
    background: token.colorFillAlter,  
  };
   
  // ScrollToSection function
  const scrollToSection = (elementRef) => {
    const headerHeight = heroRef.current ? heroRef.current.offsetHeight : 0;  // Use heroRef here
    window.scrollTo({
        top: elementRef.current.offsetTop - headerHeight,
        behavior: 'smooth',
    });
};

const onChange = (date, dateString) => { 
  setMailData({ ...mailData, moving_date:dateString })

};
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {  // Check if heroRef is not null
        if (window.scrollY > 100) {
          heroRef.current.classList.add(css.stickyHeader);
        } else {
          heroRef.current.classList.remove(css.stickyHeader);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
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
  return (
    <div>
      <FloatButton.BackTop />
      <div className={css.App}>
        <div ref={heroRef} className={css.hero}> {/* Add ref here */}
          <div className={css.flex}>
            <div className={css.imageFlex} onClick={() => scrollToSection(services)} >
              <Image alt="Company Logo" src="/img/logo.jpg" width={90} height={90} className={css.Imagecss} />
              {!matches500 && <div><MenuOutlined style={{fontSize: "38px"}} onClick={showDrawer} /></div>}
            </div>

            {matches768 && 
              <div style={{display: "flex", alignItems: "center"}}>
                <div onClick={() => scrollToSection(services)} className={css.link}>Main</div> 
                <div onClick={() => scrollToSection(ourServices)} className={css.link}>Our Services</div>
                <div onClick={() => scrollToSection(aboutUs)} className={css.link}>About us</div>
                {/* <div onClick={() => scrollToSection(reviews)} className={css.link}>Reviews</div> */}
                <div onClick={() => scrollToSection(contact)} className={css.link}>Contact</div>
              </div>
            }

            {(matches1024 || !matches768) && 
              <div className={css.phone}>
                <div className={css.Icons} onClick={() => window.location.href = "mailto:example@email.com"}>
                  <MailOutlined style={{fontSize: "28px"}}/> 
                  magicmoversla@gmail.com
                </div>
                <div className={css.Icons} onClick={() => window.location.href = "tel:+2137158265"}>
                  <PhoneOutlined rotate={90} style={{fontSize: "28px"}}/> (213) 715-8265
                </div>
              </div>
            }

            <Drawer
              closable
              title="Menu"
              placement={placement}
              onClose={onClose}
              open={open}
              key={placement}
              width={200}
            >
              <div style={{display: "flex", flexDirection: "column"}}>
                <div onClick={() => scrollToSection(services)} className={css.link}>Main</div>
                <div onClick={() => scrollToSection(ourServices)} className={css.link}>Our Services</div>
                <div onClick={() => scrollToSection(aboutUs)} className={css.link}>About us</div>
                {/* <div onClick={() => scrollToSection(reviews)} className={css.link}>Reviews</div> */}
                <div onClick={() => scrollToSection(contact)} className={css.link}>Contact</div>
              </div>
            </Drawer>
          </div>
        </div>

        <div ref={services} className={css.services}> 
            <div className={css.mainCss}>
                <div className={css.mainCont}>
                    <div className={css.mainLay1}>
                        <div className={css.mainTitleBig}>
                        {`POOL TABLES and PIANOS.`}
                        </div>
                        <div className={css.mainTitleSmall}>Important:Magic Movers LLC assumes NO liability for readjustments, resynchronization or refocusing of such articles upon delivery! We do not move pool tables or pianos.</div>
                    </div>
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
            </div>
        </div>
        <div ref={ourServices} className={css.ourServices}>
          <div className={css.ourservicesCss}>
            <div className={css.ourserviceTitle}>Our Service</div>
              <div style={{ 
                      marginTop: "10px",
                      fontSize: "20px",
                      textAlign: "center", 
                      color: "#FF4040", 
                      textShadow: "rgba(0, 0, 0, 0.5) 1px 3px 3px" 
                    }}>
                      Season&apos;s hot rates!
                    </div>

            <div className={css.servicesbox}>
              <div className={css.boxs}>
                <div style={{display: "flex", justifyContent: "center"}}>
                  <Image src="/img/muv2.avif"  alt="Company Logo" width={100} height={48} className={css.muv3} />
                </div>
                <div style={{fontSize: "18px", fontWeight: 600, marginTop: "10px", textAlign: "center"}}>2 MOVERS AND A TRUCK</div>
                <div style={{fontSize: "12px", marginTop: "5px", textAlign: "center"}}>(STUDIO, 1 BDR OR SMALL OFFICE)</div>
                <div style={{fontSize: "25px", color: "red", fontWeight: "600", margin: "12px 0px", textAlign: "center"}}>$109
                  <span style={{color: "#808080", fontSize: "18px", fontWeight: "500"}}>/hr</span>
                </div>
                <div style={{fontSize: "18px", color: "#808080", fontWeight: "600", marginTop: "5px", textAlign: "center"}}>
                  Cash/Zelle/Card/Venmo
                </div>
                <div style={{background: "rgba(25, 62, 61, 0.9)", color: "#fff", padding: "10px 20px", textAlign:"center", borderRadius: "10px", fontWeight: "600", fontSize: "18px", marginTop: "20px"}}>
                  Get a free Quote
                </div>
                <div style={{fontSize: "14px", fontWeight: "500", margin: "12px 0px", fontWeight: "600"}}>Booking policy: 3 hours minimum</div>
                <div style={{fontSize: "14px", fontWeight: "500", marginTop: "15px", fontWeight: "600"}}>What&apos;s included:</div>

                <div style={{alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "13px", marginLeft: "3px"}}>
                  <div style={{ fontWeight: "600",  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div  style={{fontWeight: "600"}}>Use of Blankets</div>
                </div> 
                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "6px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>Use of Wardrobe Boxes</div>
                </div> 
                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "6px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>Disassembly / Reassembly</div>
                </div> 
                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "6px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>Use of Tape & Protective Padding</div>
                </div> 
                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "6px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>Use of Mattress Covers</div>
                </div> 
                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "6px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>Use of Tools & Straps</div>
                </div> 
                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "6px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>Use of Dollies & Equipment</div>
                </div> 
                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "6px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>Tax & Basic Insurance</div>
                </div> 
                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "6px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>Appliances</div>
                </div> 
                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "6px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>Packing / Unpacking</div>
                </div> 


                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#ED1566", marginTop: "26px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>ADDITIONAL FEES:</div>
                </div> 

                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "6px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>Fuel $80 one time flat fee</div>
                </div> 
                <div className={css.BookNow}>
                  Book Now
                  <CaretRightOutlined />
                </div>
              </div>
              <div className={css.boxs}>
                <div style={{display: "flex", justifyContent: "center"}}>
                  <Image src="/img/muv3.avif" alt="Company Logo" width={120} height={48} className={css.muv3} />
                </div>
                <div style={{fontSize: "18px", fontWeight: 600, marginTop: "10px", textAlign: "center"}}>3 MOVERS AND A TRUCK</div>
                <div style={{fontSize: "12px", marginTop: "5px", textAlign: "center"}}>(LARGE 1 BDR, 2 BDR OR MEDIUM OFFICE)</div>
                <div style={{fontSize: "25px", color: "red", fontWeight: "600", margin: "12px 0px", textAlign: "center"}}>$149
                  <span style={{color: "#808080", fontSize: "18px", fontWeight: "500"}}>/hr</span>
                </div>
                <div style={{fontSize: "18px", color: "#808080", fontWeight: "600", marginTop: "5px", textAlign: "center"}}>
                Cash/Zelle/Card/Venmo
                </div>
                <div style={{background: "rgba(25, 62, 61, 0.9)", color: "#fff", padding: "10px 20px", textAlign:"center", borderRadius: "10px", fontWeight: "600", fontSize: "18px", marginTop: "20px"}}>
                  Get a free Quote
                </div>
                <div style={{fontSize: "14px", fontWeight: "500", margin: "12px 0px", fontWeight: "600"}}>Booking policy: 3 hours minimum</div>
                <div style={{fontSize: "14px", fontWeight: "500", marginTop: "15px", fontWeight: "600"}}>What&apos;s included:</div>

                <div style={{alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "13px", marginLeft: "3px"}}>
                  <div style={{ fontWeight: "600",  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div  style={{fontWeight: "600"}}>Use of Blankets</div>
                </div> 
                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "6px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>Use of Wardrobe Boxes</div>
                </div> 
                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "6px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>Disassembly / Reassembly</div>
                </div> 
                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "6px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>Use of Tape & Protective Padding</div>
                </div> 
                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "6px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>Use of Mattress Covers</div>
                </div> 
                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "6px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>Use of Tools & Straps</div>
                </div> 
                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "6px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>Use of Dollies & Equipment</div>
                </div> 
                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "6px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>Tax & Basic Insurance</div>
                </div> 
                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "6px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>Appliances</div>
                </div> 
                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "6px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>Packing / Unpacking</div>
                </div> 


                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#ED1566", marginTop: "26px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>ADDITIONAL FEES:</div>
                </div> 

                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "6px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>Fuel $80 one time flat fee</div>
                </div> 
                <div className={css.BookNow}>
                  Book Now
                  <CaretRightOutlined />
                </div>
              </div>
              <div className={css.boxs}>
                <div style={{display: "flex", justifyContent: "center"}}>
                  <Image src="/img/muv4.avif" alt="Company Logo" width={130} height={48} className={css.muv3} />
                </div>
                <div style={{fontSize: "18px", fontWeight: 600, marginTop: "10px", textAlign: "center"}}>4 MOVERS AND A TRUCK</div>
                <div style={{fontSize: "12px", marginTop: "5px", textAlign: "center"}}>(LARGE 2 BDR, 3 BDR OR LARGE OFFICE)</div>
                <div style={{fontSize: "25px", color: "red", fontWeight: "600", margin: "12px 0px", textAlign: "center"}}>$189
                  <span style={{color: "#808080", fontSize: "18px", fontWeight: "500"}}>/hr</span>
                </div>
                <div style={{fontSize: "18px", color: "#808080", fontWeight: "600", marginTop: "5px", textAlign: "center"}}>
                Cash/Zelle/Card/Venmo
                </div>
                <div style={{background: "rgba(25, 62, 61, 0.9)", color: "#fff", padding: "10px 20px", textAlign:"center", borderRadius: "10px", fontWeight: "600", fontSize: "18px", marginTop: "20px"}}>
                  Get a free Quote
                </div>
                <div style={{fontSize: "14px", fontWeight: "500", margin: "12px 0px", fontWeight: "600"}}>Booking policy: 3 hours minimum</div>
                <div style={{fontSize: "14px", fontWeight: "500", marginTop: "15px", fontWeight: "600"}}>What&apos;s included:</div>

                <div style={{alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "13px", marginLeft: "3px"}}>
                  <div style={{ fontWeight: "600",  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div  style={{fontWeight: "600"}}>Use of Blankets</div>
                </div> 
                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "6px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>Use of Wardrobe Boxes</div>
                </div> 
                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "6px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>Disassembly / Reassembly</div>
                </div> 
                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "6px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>Use of Tape & Protective Padding</div>
                </div> 
                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "6px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>Use of Mattress Covers</div>
                </div> 
                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "6px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>Use of Tools & Straps</div>
                </div> 
                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "6px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>Use of Dollies & Equipment</div>
                </div> 
                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "6px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>Tax & Basic Insurance</div>
                </div> 
                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "6px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>Appliances</div>
                </div> 
                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "6px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>Packing / Unpacking</div>
                </div> 


                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#ED1566", marginTop: "26px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>ADDITIONAL FEES:</div>
                </div> 

                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "6px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>Fuel $80 one time flat fee</div>
                </div> 
                <div className={css.BookNow}>
                  Book Now
                  <CaretRightOutlined />
                </div>
              </div>
              <div className={css.boxs} style={{height: "300px", width: "100%"}}>
                <div style={{display: "flex", justifyContent: "center"}}>
                  <Image src="/img/muv5.avif" width={80} height={45} className={css.muv3} alt="Movers"/>
                </div>
                <div style={{fontSize: "18px", fontWeight: 600, marginTop: "10px", textAlign: "center"}}>Long Distance moving</div>
                <div style={{fontSize: "12px", marginTop: "5px", textAlign: "center"}}>(STUDIO, 1 BDR OR SMALL OFFICE)</div>
                <div style={{fontSize: "25px", color: "red", fontWeight: "600", margin: "12px 0px", textAlign: "center"}}>$220
                  <span style={{color: "#808080", fontSize: "18px", fontWeight: "500"}}>/hr</span>
                </div> 
                <div style={{fontSize: "14px", color: "#808080", fontWeight: "600", marginTop: "5px", textAlign: "center", lineHeight: "20px"}}>
                  Call or Email our representatives to discuss details about your move and Get your <span style={{color: "red"}}>FREE Flat Fee Offer</span>
                </div>
                <div style={{background: "rgba(25, 62, 61, 0.9)", color: "#fff", padding: "10px 20px", textAlign:"center", borderRadius: "10px", fontWeight: "600", fontSize: "18px", marginTop: "20px"}}>
                  Get a free Quote
                </div>   
              </div>
              
            </div>
          </div>
        </div>
        <div ref={aboutUs} className={css.aboutUs}> 
          <div className={css.aboutUsDetail}>
            <Zurag />
            <div className={css.aboutdetail}>
              <div className={css.AboutTitle}>About us</div>
              <div style={{color: "#374151", marginTop: "40px", marginLeft: "10px"}} className={css.AboutDesc}> Customer satisfaction is at the heart of our mission. We believe in open communication, transparent pricing, and the personalized attention that every client deserves. Your peace of mind is our top priority, and we go above and beyond to exceed your expectations.</div>
              <div style={{display:"flex",  color: "#374151", marginTop: "20px"}} className={css.AboutDesc}> 
              <EnvironmentOutlined style={{fontSize: "25px", color: "#000", marginLeft:"-25px"}} /> Our office and fleet are conveniently located in the heart of Hollywood, Los Angeles CA - 90036. You can rest assured we will always be on time, anywhere, anytime.</div>
              <div  style={{color: "#374151", marginTop: "40px", position: "relative"}} className={css.AboutDesc}>
                <div style={{color: "#ffbd35", marginLeft:"-25px"}}> <Image width={70} height={70} alt="magic" src={"/img/balancing-scale-outline.png"}  /></div> We uphold our commitments, recognizing the significance of our clients trust, especially during the emotionally charged process of transitioning from one residence to another.</div>
              <div style={{color: "#374151", marginTop: "20px"}} className={css.AboutDesc}> 
              <div style={{color: "#ffbd35", marginLeft:"-25px"}}> <Image width={40} height={40} alt="magic" src={"/img/love.png"}  /></div> Our reputation has been built on referrals and loyal customers, and we are committed to maintaining this tradition. </div>
            </div>
          </div>  
        </div>
        {/* <div className={css.qacss}>
              <Collapse
                bordered={false} 
                    defaultActiveKey={['1']}
                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                    style={{
                      background: token.colorBgContainer,
                    }}
                    items={getItems(panelStyle)}
                /> 
          </div> */}
        {/* <div ref={reviews} className={css.reviews}><h3>Reviews</h3></div> */}
        <div ref={contact} className={css.contact}>
              <div className={css.contact2}>
                <div className={css.FooterLogo}>
                  <div>
                  <Image alt="Company Logo" src="/img/logo.jpg" width={200} height={170} className={css.imgFooter}/>
                  </div>
                  <div>Professional Moving Services at Lowest Rates!</div>
                </div>
                <div className={css.footerLayout2}>
                  <div className={css.Icons} onClick={() => window.location.href = "mailto:example@email.com"}>
                    <EnvironmentOutlined style={{ color: "#faad14", fontSize: "28px"}}/> 
                    11706 Dorothy St. Los Angeles, CA 90036
                  </div>
                  <div className={css.Icons} onClick={() => window.location.href = "mailto:example@email.com"}>
                    <MailOutlined style={{ color: "#faad14", fontSize: "28px"}}/> 
                    magicmoversla@gmail.com
                  </div>
                  <div className={css.Icons} onClick={() => window.location.href = "tel:+2137158265"}>
                    <PhoneOutlined rotate={90} style={{ color: "#faad14", fontSize: "28px"}}/> (213) 715-8265
                  </div>
                  <div className={css.Icons} onClick={() => window.location.href = "mailto:example@email.com"}>
                    <ClockCircleOutlined style={{ color: "#faad14", fontSize: "28px"}}/> 
                    Mon - Sun 7:00 AM - 8:00 PM
                  </div>
                </div>

                <div style={{display: "flex", alignItems: "center", fontSize: "20px"}}></div> 
              </div>
        </div>
        <div style={{width: "100%", background: "#fff", textAlign: "center", fontSize: "14px", padding: "10px 0px"}}>©2025 by Magic Movers LLC.</div>
      </div>
    </div>
  );
};

export default BaseLayout; 