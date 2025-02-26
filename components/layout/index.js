import { Button, Drawer, Input, Radio, Spin } from "antd";
import { useState, useRef, useEffect } from "react";
import css from "./style.module.css";
import { MailOutlined, PhoneOutlined, MenuOutlined } from '@ant-design/icons';
import Image from "next/image";

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
   
  // ScrollToSection function
  const scrollToSection = (elementRef) => {
    const headerHeight = heroRef.current ? heroRef.current.offsetHeight : 0;  // Use heroRef here
    window.scrollTo({
        top: elementRef.current.offsetTop - headerHeight,
        behavior: 'smooth',
    });
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

  return (
    <div>
      <div className={css.App}>
        <div ref={heroRef} className={css.hero}> {/* Add ref here */}
          <div className={css.flex}>
            <div className={css.imageFlex}>
              <Image src="/img/logo.jpg" width={100} height={100} className={css.Imagecss} />
              {!matches500 && <div><MenuOutlined style={{fontSize: "38px"}} onClick={showDrawer} /></div>}
            </div>

            {matches768 && 
              <div style={{display: "flex", alignItems: "center"}}>
                <div onClick={() => scrollToSection(services)} className={css.link}>Main</div> 
                <div onClick={() => scrollToSection(ourServices)} className={css.link}>Our Services</div>
                <div onClick={() => scrollToSection(aboutUs)} className={css.link}>About us</div>
                <div onClick={() => scrollToSection(reviews)} className={css.link}>Reviews</div>
                <div onClick={() => scrollToSection(contact)} className={css.link}>Contact</div>
              </div>
            }

            {(matches1024 || !matches768) && 
              <div className={css.phone}>
                <div className={css.Icons}>
                  <MailOutlined style={{fontSize: "28px"}}/> magicmoversla@gmail.com
                </div>
                <div className={css.Icons}>
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
                <div onClick={() => scrollToSection(reviews)} className={css.link}>Reviews</div>
                <div onClick={() => scrollToSection(contact)} className={css.link}>Contact</div>
              </div>
            </Drawer>
          </div>
        </div>

        <div ref={services} className={css.services}> 
            <div className={css.mainCss}>
                <div className={css.mainCont}>
                    <div className={css.mainLay1}>
                        <div className={css.mainTitleBig}>Magic Movers LLC - <br/> Relocate with  confidence! </div>
                        <div className={css.mainTitleSmall}>Full Service In-State Movers</div>
                    </div>
                    <div className={css.form}>
                        <div className={css.getTitle}>Get Your Free Quote</div>
                        <div className={css.getTitleSmall}>Moving Size <span style={{color: "rgba(25, 62, 61, 0.9)", fontSize: "25px"}}>*</span></div>
                        <div className={css.groupRadio}> 
                            <Radio.Group
                                // style={{ display: 'flex', flexDirection: 'column' }}
                                name="radiogroup"
                                defaultValue={1}
                                size="large"
                                options={[
                                {
                                    value: 1,
                                    label: <span className={css.radioTitle}>Studio</span>,
                                },
                                {
                                    value: 2,
                                    label: <span className={css.radioTitle}>1 Bedroom</span>,
                                },
                                {
                                    value: 3,
                                    label: <span className={css.radioTitle}>2 Bedroom</span>,
                                },
                                {
                                    value: 4,
                                    label: <span className={css.radioTitle}>3+ Bedroom</span>,
                                },
                                ]}
                            />
                        </div>
                        <div className={css.pickLo}>
                            <div style={{display: "flex", flexDirection: "column",  gap: "10px"}}> 
                                <div className={css.getTitleSmall}>Pick-Up Location <span style={{color: "rgba(25, 62, 61, 0.9)", fontSize: "25px"}}>*</span></div>
                                <div><Input placeholder="Pick-Up Location" size="large"/></div>
                            </div>
                            <div style={{display: "flex", flexDirection: "column",  gap: "10px"}}> 
                                <div className={css.getTitleSmall}>Drop off Location <span style={{color: "rgba(25, 62, 61, 0.9)", fontSize: "25px"}}>*</span></div>
                                <div><Input placeholder="Pick-Up Location" size="large"/></div>
                            </div>
                        </div>
                        <div className={css.pickLo}>
                            <div style={{display: "flex", flexDirection: "column",  gap: "10px"}}> 
                                <div className={css.getTitleSmall}>Moving Date <span style={{color: "rgba(25, 62, 61, 0.9)", fontSize: "25px"}}>*</span></div>
                                <div><Input placeholder="Moving Date" size="large"/></div>
                            </div>
                            <div style={{display: "flex", flexDirection: "column",  gap: "10px"}}> 
                                <div className={css.getTitleSmall}>Name <span style={{color: "rgba(25, 62, 61, 0.9)", fontSize: "25px"}}>*</span></div>
                                <div><Input placeholder="Name" size="large"/></div>
                            </div> 
                        </div>
                        <div className={css.pickLo}>
                            <div style={{display: "flex", flexDirection: "column",  gap: "10px"}}> 
                                <div className={css.getTitleSmall}>Phone <span style={{color: "rgba(25, 62, 61, 0.9)", fontSize: "25px"}}>*</span></div>
                                <div><Input placeholder="Phone" size="large"/></div>
                            </div>
                            <div style={{display: "flex", flexDirection: "column",  gap: "10px"}}> 
                                <div className={css.getTitleSmall}>E-mail <span style={{color: "rgba(25, 62, 61, 0.9)", fontSize: "25px"}}>*</span></div>
                                <div><Input placeholder="E-mail" size="large"/></div>
                            </div> 
                        </div>
                        
                        <div style={{marginTop: "20px"}}> </div>
                        <div className={css.submitCss}>
                            Submit
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div ref={ourServices} className={css.ourServices}><h3>Our Services</h3></div>
        <div ref={aboutUs} className={css.aboutUs}><h3>About Us</h3></div>
        <div ref={reviews} className={css.reviews}><h3>Reviews</h3></div>
        <div ref={contact} className={css.contact}><h3>Contact</h3></div>
      </div>
    </div>
  );
};

export default BaseLayout;
