
import dynamic from "next/dynamic"; 
import {   Collapse, DatePicker, Drawer, FloatButton, Input, message, Radio,   theme } from "antd";
import { useState, useRef, useEffect } from "react";
import css from "./style.module.css";
import { EnvironmentOutlined, MailOutlined, ClockCircleOutlined, PhoneOutlined, MenuOutlined, CaretRightOutlined  } from '@ant-design/icons';
import Image from "next/image";
import Zurag from "../zurag";
import emailjs from "emailjs-com";   
import "leaflet/dist/leaflet.css"; 
import Loading from "../loading";
import axios from "../../axios-orders";


const locations = [
   
  { lat: 34.05759105072021, lng: -118.24560731723486, name: "Los Angeles" },
  { lat: 34.012678765475115, lng: -118.48855389823142, name: "Santa Monica" },
  { lat: 34.091698349837976, lng: -118.4067443713288, name: "Beverly Hills" },
  { lat: 34.104441161593016, lng: -118.51648502020402, name: "Brentwood" },
  { lat: 34.083610027677125, lng: -118.54497999354102, name: "Pacific Palisades" },
  { lat: 34.16083099227308, lng:  -118.43576840631293, name: "Sherman Oaks" },
  { lat: 33.735929216638105, lng:  -118.29482295738991, name: "San Pedro" },
  { lat: 34.0139623608645, lng:  -118.43767491115526, name: "Mar Vista" },
  { lat: 34.02078487857845,  lng: -118.39494906133692, name: "Culver City" },
  { lat: 34.169667920963114, lng: -118.61172944463954, name: "Woodland Hills" },
  { lat: 33.76911816909051,  lng: -118.18560489523813, name: "Long Beach" },
  { lat: 34.13737470632144,  lng: -118.65957559531174, name: "Calabasas" },
  { lat: 34.14333842264153,  lng: -118.39324154131123, name: "Studio City" },
  { lat: 34.091452110775855, lng: -118.32764413159798, name: "Hollywood" },
  { lat: 34.04338676673281, lng: -118.35315656847716, name: "Mid-City" },
  { lat: 34.187296883371054, lng: -118.3891163185336, name: "North Hollywood" },
  { lat: 34.155832162554404, lng: -118.48687050127783, name: "Encino" },
  { lat: 34.09400189114344, lng: -118.36669540015637, name: "West Hollywood" },
  { lat: 34.09994500948251, lng: -118.26571759831695, name: "Silver Lake" },
  {lat: 34.14722140260508, lng: -118.24641693492552, name: "Glendale"},
  {lat: 33.74738176298284, lng: -118.38567609469865, name: "Rancho Palos Verdes"},
  {lat: 33.97903829351712, lng: -118.41419935777493, name: "Playa Vista"},
  {lat: 34.037341249599336, lng: -118.69128004470258, name: "Malibu"},
  {lat: 34.14545942241944, lng: -118.14497143594124, name: "Pasadena"},
  {lat: 34.18268549548751, lng: -118.30970029771422, name: "Burbank"},
  {lat: 33.84861894461722, lng: -118.38491492914915, name: "Redondo Beach"},
  {lat: 34.065464786288835, lng: -118.43871577993836, name: "Westwood"},
  {lat: 33.84109534606345, lng: -118.33739321560873, name: "Torrance"},
  
]; 
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });
 

const getItems = (panelStyle) => [
  {
    key: '1',
    label: <div style={{fontWeight: "500", fontSize: "18px"}}>Budget Friendly</div>,
    children: <div style={{color: "#374151", fontSize: "18px", margin: "0px 23px", lineHeight: "21px"}}> 
      <div>1. We are one of very few companies that include all protective padding in our rates. </div>
      <div>2. We do not charge extra fees for materials, equipment, few handyman services, insurance, long walks, stairs, appliance reconnection and disassembly/re-assembly. Its all included in hourly rates.</div>
      <div>3. We are also respectful of your paid time and take breaks off the clock to save you even more.</div> 
      <div style={{marginTop: "15px"}}>You can hire Magic Movers LLC to move you locally for a low hourly rate and if you’re planning a long-distance move (within California), we can handle it for a flat fee as well, that will include all the services of a local move.</div> 
    </div>,
    style: panelStyle,
  },
  {
    key: '2',
    label: <div style={{fontWeight: "500", fontSize: "18px"}}>Insured</div>,
    children: <div style={{color: "#374151", fontSize: "18px", margin: "0px 23px", lineHeight: "21px"}}> 
      <div>Magic Movers LLC carries all required insurance and basic coverage is included in your rate (up to 20k in damages) for your belongings, to protect them during the move.</div>
    </div>,
    style: panelStyle,
  },
  {
    key: '3',
    label: <div style={{fontWeight: "500", fontSize: "18px"}}>Professional</div>,
    children: <div style={{color: "#374151", fontSize: "18px", margin: "0px 23px", lineHeight: "21px"}}> 
      <div>Our movers are highly trained professionals who routinely handle the most complicated moves. You can trust them to know what needs to be done and to be courteous and professional at all times. 
      When you hire Magic Movers LLC you can relax knowing that you can rely on our movers to arrive on time and to complete your move as quickly and efficiently as possible.</div>
    </div>,
    style: panelStyle,
  },
  {
    key: '4',
    label: <div style={{fontWeight: "500", fontSize: "18px"}}>Experienced</div>,
    children: <div style={{color: "#374151", fontSize: "18px", margin: "0px 23px", lineHeight: "21px"}}> 
      <div>With years of experience in moving business we know how to carefully pack shrink-wrap and/or cover your furniture and appliances with padded blankets to protect against damage, load, transport and unload your belongings safely. </div>
    </div>,
    style: panelStyle,
  },
  {
    key: '5',
    label: <div style={{fontWeight: "500", fontSize: "18px"}}>Privacy Policy</div>,
    children: <div style={{color: "#374151", fontSize: "18px", margin: "0px 23px", lineHeight: "21px", textDecoration: "underline"}}> 
      <div>Magic Movers LLC</div>
      {/* <div style={{fontWeight: "500"}}>CAL-T 192594</div> */}
      <div style={{fontWeight: "500", marginTop: "10px"}}>General</div>
      <div>This privacy policy discloses the privacy practices for www.goldentigerag.us</div>
      <div>This privacy policy applies solely to information collected by this web site.</div>
      <div>Magic Movers LLC is the sole owner of the information collected on this site.</div>
      <div>We only have access to/collect information that you voluntarily give us via email, contact form or other direct contact from you.</div>
      <div>We will not sell or rent this information to anyone.</div>
      <div>We will use your information to respond to you, regarding the reason you contacted us.</div>
      <div>We will not share your information with any third party outside of our organization, other than as necessary to fulfill your request, e.g. to ship an order.</div>
      <div>Unless you ask us not to, we may contact you via email in the future to tell you about specials, new products or services, or changes to this privacy policy.</div>
      <div>Your Access to and Control over Information</div>
      <div>You may opt out of any future contacts from us at any time. You can do the following at any time by contacting us via the email address or phone number given on our website:</div>
      <div style={{lineHeight: "2px"}}>  
        <ul><li>See what data we have about you, if any. </li></ul>
        <ul><li>Change/correct any data we have about you. </li></ul>
        <ul><li>Have us delete any data we have about you. </li></ul>
        <ul><li>Express any concern you have about our use of your data.</li></ul>
      </div>
      <div>Links to other Web Sites</div>
      <div>This site may contain links to other web sites.</div>
      <div>Magic Movers LLC is not responsible for the privacy practices or the content of such other web sites, nor does Magic Movers LLC endorse any products or services offered by those sites.</div>
      <div>Security</div>
      <div>We take precautions to protect your information. When you submit sensitive information via the website, your information is protected both online and offline.</div>
      <div>Wherever we collect sensitive information (such as credit card data), that information is encrypted and transmitted to us in a secure way. You can verify this by looking for a closed lock icon at the bottom of your web browser, or looking for “https” at the beginning of the address of the web page.</div>
      <div>While we use encryption to protect sensitive information transmitted online, we also protect your information offline. Only employees who need the information to perform a specific job (for example, billing or customer service) are granted access to personally identifiable information. The computers/servers in which we store personally identifiable information are kept in a secure environment.</div>
      <div>Updates</div>
      <div>Our Privacy Policy may change from time to time and all updates will be posted on this page.</div>
      <div>Contact Information</div>
      <div>If you would like to: access, correct, amend or delete any personal information we have about you, or simply want more information, contact us via telephone at (213) 715-8265 or via email at dimalexagllc@gmail.com</div>
      <div>Phone Number: (213) 715-8265</div>
      <div>E-mail: magicmoversla@gmail.com</div>
      <div>Los Angeles CA 90036</div> 
    </div>,
    style: panelStyle,
  },
  {
    key: '6',
    label: <div style={{fontWeight: "500", fontSize: "18px"}}>Terms & Conditions</div>,
    children: <div style={{color: "#374151", fontSize: "18px", margin: "0px 23px", lineHeight: "21px"}}> 
      IMPORTANT NOTICE

<div>The quoted rates are believed to be in accordance with the rates prescribed by the Bureau of Household Goods and Services as published in Its Maximum Rate Tariff 4 and are to be applies fo the number of hours involved in providing service, to the actual weight, or to the actual number of other units of measurement, subject to the designated minimum provisions, unless in conflict with the rates and regulations of that tariff. Copies of the tariff are open for public inspection at the Bureau’s office in Sacramento and at the offices of the carrier.</div>

<div>Unless it is specifically and clearly indicated in the Agreement For Service, the NOT TO EXCEED PRICE does not include charges for any accessorial services which may be requested and provided or for which rates are provided in Maximum Rate Tariff 4. That means that unless it is specifically and clearly stated, the NOT TO EXCEED PRICE does not include charges for service including but not limited to appliance servicing, disassembly or reassembly of articles, flight or long carry charges, rigging, hoisting, lowering or elevator charges shuttle charges light and bulky article charges, split pick-up and/or delivery charges, storage-in-transit or storage-in transit transportation charges from storage to point of destination or charges resulting from a failure of shipper to accept delivery as arranged.</div>

TERMS AND CONDITIONS

<div>1. LIABILITY OF THE COMPANY, CARRIER OR WAREHOUSEMAN IN POSSESSION (HEREINAFTER REFERRED TO AS THE “carrier”.</div>
<div>A. PERILS ASSUMED – The carrier assumes obligation against direct physical damage or loss of the property to be moved, packed, stored, shipped, forwarded or otherwise handled from any external cause except as hereinafter excluded.</div>
<div>B. The carrier shall be liable only for its failure to use ordinary care and then only in the amount of customer’s declared valuation of the goods. The burden of proving negligence or failure to use the care required by law shall be upon the customer.</div>

<div>The carrier shall not be liable for any loss or damage of household goods after the shipper has signed the receipt of the property at destination in “Combined Agreement and Fright Bill”. When signing the receipt of property after the delivery, shipper acknowledges that all transported property has been delivered safe and damage free. It is shipper’s responsibility to promptly inspect the goods after the delivery, before signing the Agreement.</div>

<div>The carrier shall not be liable for any loss or damage of household goods after the shipper has signed the receipt of the property at destination in “Combined Agreement and Fright Bill”. When signing the receipt of property after the delivery, shipper acknowledges that all transported property has been delivered safe and damage free. It is shipper’s responsibility to promptly inspect the goods after the delivery, before signing the Agreement.</div>

C. VALUATION

<div>1. The terms “Declared Valuation”,”Agreed Value”, “Released Valuation” as used in various Tariffs, Laws and Regulations are intended to have the same meaning and are used herein for the purpose of fixing the limit, under all conditions, on the amount that the carrier’s liability, for money damages, as rates and charges are based upon such declared and agreed value.</div>

<div>2. Tho carrier shall not be liable for more than the lesser of the following amounts:</div>
<div>(a) The actual cash value of the goods at the lime of loss, allowing for depreciation and/or obsolescence or (b) The maximum limit of obligation stated on the bill of lading and/or storage receipt .</div>
<div>(c) The actual costs lo repair the damaged goods.</div>

<div>D. As applicable terms and conditions herein shall apply to property of customers, hereafter added to storage, and also when the property is ordered out of storage or is ordered, shipped or moved.</div>

<div>2. CARRIER LIABILITY FOR LOSS OR DAMAGE TO HOUSEHOLD GOODS IS LIMITED AS FOLLOWS AND IS REQUIRED BY ORDER OF THE CALIFORNIA PUBLIC UTILITIES COMMISSION UNDER ITS GENERAL ORDER NO 136 SERIES: The liability of the carrier shall be limited by the following exclusions:</div>

<div>A No liability shall be provided for the condition or flavour of perishable articles.</div>

<div>B. No liability shall be provided on the following items, unless the item is specifically listed on the shipping document by description and value: bills of exchange, bonds, bullion, precious metals, currency, deeds. documents, evidence of debt, credit cards, firearms (see Note 1), money, gems, jewellery, watches, precious stones, pearls, gold, silver, or platinum articles (see Note 2), stock certificates, securities, stamp collections, stamps (postage. revenue or trading) or letters or packets of letters.</div>
<div>NOTE 1 Liability shall be provided for firearms legally acceptable under tho Federal Gun Control Act of 1968. provided that shipper furnishes to the carrier the caliber, make and serial number of such firearms and that such firearms are packed by carrier at shipper’s expense at charges not more than those shown In Maximum Rate Tariff 4. NOTE 2. Includes gold, silver and platinum household articles such as silverware, coffee service sets, trays, candlesticks, and dishes.</div>

<div>C. No liability shall be provided for loss or damage to articles of extraordinary value except under circumstances where each ouch article is specifically listed on the carrier’s shipping document or inventor of the shipment and specifically designated as an article of extraordinary value and by listing the value thereof and carrier is afforded tho opportunity prior to pickup of the shipment to pack and otherwise provide adequate protection for such article (at carrier’’s published charges) if the packing by shipper is determined by carrier to be inadequate protection for such article. As used herein, the term “articles of extraordinary value” refers to those articles tendered to a carrier for transportation which because of uniqueness or rarity have a value substantially in excess of the cost of newly manufactured items of substantially the same type and quality apart from such uniqueness or rarity, such as, but not limited to, musical instruments of rare quality or historical significance; original manuscripts, first editions or autograph copies of books, antique furniture, heirlooms, paintings, sculptures, and other works of art; and hobby collections and exhibits.</div>

<div>D. No liability shall he provided for loss or damage caused by or resulting from:</div>
<div>(1) An act, omission, or order of shipper, including damage or breakage resulting from improper packing by shipper. (2) (2) Insects, moths, vermin, ordinary wear and tear, or gradual deterioration.</div>

<div>(3) Defect or inherent vice of the article, including susceptibility to damage because of atmospheric conditions such as temperature arid humidity or change therein.</div>

<div>(4) (I) Hostile or war-like action in time of peace or war, including action in hindering, combating, or defending against an actual impending or expected attack: (A) by any government or sovereign power, or by any authority maintaining or using military, naval, or air forces, or (B) by military, “naval or air forces. or (C) An agent of such government power, authority, or forces. (II) Any weapon of war employing atomic fission or radioactive force whether in time of peace or war. (III) insurrection, rebellion revolution, civil war, usurped power, or action token by governmental authority in hindering, combating, or defending against such an occurrence, leisure, or destruction under quarantine or customs regulations, confiscations by order of any government or public authority, or risks of contraband, or illegal transportation or trade.</div>

<div>E. No liability shall be provided for the mechanical or electrical derangements of pianos, radios, phonographs, clocks, refrigerators, television sets, automatic washers, or other instruments or appliances unless evidenced by external damage lo such equipment, or unless said articles or appliances are serviced as provided In subparagraph (I) below.</div>

<div>The carrier reserves the right to inspect these articles or appliances to determine whether they are in good working order before accepting them for shipment. Carrier assumes no liability whatsoever for returning, refocusing or other adjustments of television set unless such services were made necessary duo lo carrier’s negligence</div>

<div>(1) Upon request of shipper, owner or consignee of the goods, carrier will, subject to subparagraph (2) below, service and un-service such articles as stoves, automatic washers and dryers at origin and destination. Such servicing and un-servicing does not include removal or installation of articles secured to the premises or plumbing, electrical, or carpentry services necessary lo disconnect, remove, conned, and Install such articles and appliances</div>

<div>(2) If carrier does not posses the qualified personnel to properly service and un-service such articles or appliances, carrier, upon request of shipper or consignee or an agent for them, can engage third persons to perform the servicing and un-servicing. When third persons are engaged by the carrier to perform any service, the carrier will not assume responsibility for their activities or conduct; amount of their charges, nor to the quality or quantity of service furnished.</div>

<div>(3) Except in Instances where prior credit has been arranged, all charges of the third persons must be paid directly by the shipper to said third person.</div>
<div>F. No liability shall be provided by virtue, for any loss of damage caused as a result of any strike, lockout, labor disturbance, riot, civil commotion, or any person or persons taking part in any such occurrence or disorder.</div>
<div>G. No liability shall be provided for any loss or damage arising out of the breakage of china, glassware, bric-a-brac, or similar articles of a brittle or fragile nature unless packed by the carrier’s employees or unless such breakage results from either the negligence of the carrier or from fire, lighting, theft, malicious damage, or by collision or overturning of the conveyance.</div>

<div>H. Liability of carrier and insurance company for loss or damage shall be subject to compliance by the shipper with applicable provisions of item 92 of Maximum Rate Tariff 4 (Claim.s tor Loss or Damage).</div>

<div>3. OWNERSHIP OF GOODS- Tho customer, shipper, depositor, or agent hereinafter, referred to as customer represents and warrants that he/‘she is lawfully possessed of the said property and/or has the authority to authorize the transportation and/or storage of said property in accordance with the terms hereof, customer agrees to indemnify and save harmless the carrier in the event it is made a party to any litigation by reason of having said property, or any portion thereof transported and/or stored, and to pay cost of court and attorney’s fees incurred in connection therewith. The carrier’s lien shall secure all such costs and expenses in addition to its transportation and/or storage charges.</div>

<div>4 .BUILDING FIRE WATCHMAN The carrier doos not represent or warrant that its buildings are fireproof or that the contents of said buildings including the said property, cannot be destroyed by fire. The carrier shall not be required to maintain a watchman, and its failure lo do so shall not constitute negligence.</div>

<div>5. TERMS OF PAYMENT – Invoices and/or statements for transportation, first month’s storage, advances and other charges are due and payable upon completion of such transportation or receipt for storage. Thereafter, storage bills are payable monthly in advance. A labor charge will be made for placing the property in storage end removing for delivery or access. Payments must be made by Cash, Credit Card, Venmo or Zelle..</div>

<div>6. GENERAL LIEN FOR CHARGES – The carrier shall have a general lien upon any and all property now or hereafter delivered to or deposited with the carrier by the Customer or the legal possessor of such property for all charges for transportation, storage, preservation of the properly, and the performance of other services; also for all lawful claims for money advanced, interest, insurance, labor, weighing, coopering, wrapping and other charges in relation to such property or any part thereof; also for all charges and expenses for notice and advertisement of sale and for sale of the property where there has been a default in satisfying the carrier’s lien; also for all costs incurred and allowed to be recovered as reasonable expenses under provisions of the California Commercial Code or Civil Code in collecting said charges or enforcing it’s lien, or defending itself in the event that is made a party to any litigation concerning said property. In the event of sale under this paragraph the carrier may retain out of the proceeds thereof an amount sufficient to pay all unpaid charges plus interest thereon at the legal rate per month charged monthly will be made together with costs incurred in possession and foreclosure, Including attorney’s fees.</div>

<div>7. NOTICE AND PROOF OF LOSS OR DAMAGE – The Customer shall as soon as practical, report to the carrier, or its agent, any loss and damage which may become a claim under this agreement and shall also file with the Carrier or its agent within nine (9) months from dale of loss, sworn proof of loss in accordance with Item 92 of the governing Maximum Rate Tariff 4.</div>

<div>The carrier shall not be liable for any loss or damage of household goods after the shipper has signed the receipt of the property at destination in “Combined Agreement and Fright Bill”. When signing the receipt of property after the delivery, shipper acknowledges that all transported property has been delivered safe and damage free. It is shipper’s responsibility to promptly inspect the goods after the delivery, before signing the Agreement.</div>

ADDITIONAL CONDITIONS:

<div>8. STORAGE –  Magic Movers LLC does not hold liability for loss and damages of household goods previously stored by another carrier. </div>

<div>9. DEPOSIT –  A Non-Refundable minimum reservation deposit is required for each move upon reservation. After a reservation request is received (verbal or written), our agent will collect the payment of the deposit, to secure a moving date. The non-refundable deposit consists of minimum 3 (three) hours of labor at the rate agreed upon reservation. Deposits may be paid by Credit/Debit Card, Zelle, Venmo, Cash.</div>

<div>For reservations of Long Distance moves, 50% of the total amount agreed between shipper and carrier for moving services will be paid after the loading of the truck. The rest of 50% will be due after unloading the truck at the final destination.</div>

<div>10. CANCELLATION – In the event of cancellation for moving services requested by the shipper, the deposit will remain non-refundable, regardless of the cancellation reasons or the time when notice of cancellation was submitted by the shipper. This policy is instated by Magic Movers LLC to cover certain expenses associated with the cancellation or “no show”, like lost opportunities, paid wages, fuel and vehicle amortization, to name a few.</div>

<div>In the event of cancellation made by the carrier, the Notice of Cancellation will be submitted to the shipper and the deposit will be refunded to the shipper immediately.</div>

<div>11. RE-SCHEDULING – In the event of re-scheduling of the date for requested moving services, the shipper has the options to re-schedule the move one time, free of charge. If the move has been re-scheduled more than one time from it’s original scheduled date, the carrier shall consider the move “cancelled by shipper” and the Cancellation Policy shall take effect. Same regulation applies to the carrier. If the cancellation has been made by carrier, the deposit will be refunded back to the shipper immediately.</div>

<div>NOTICE: PLEASE INSPECT YOUR GOODS PROMPTLY. CLAIMS FOR ANY LOST OR DAMAGED GOODS MUST BE FILED WITH THE CARRIER IN WRITING.</div>

<div>CUSTOMER REPRESENTS AND WARRANTS THAT THE PROPERTY CONSISTS OF HOUSEHOLD GOODS ONLY AND THAT NO COMBUSTIBLE OR INFLAMMABLE MATERIAL IS INCLUDED.</div>
    </div>,
    style: panelStyle,
  },
];
const getItems2 = (panelStyle) => [
  {
    key: '1',
    label: <div style={{fontWeight: "500", fontSize: "18px"}}>Reserve your date</div>,
    children: <div style={{color: "#374151", fontSize: "18px", margin: "0px 23px", lineHeight: "21px"}}>
      <div>Book us online by using Book Now button, to see our availability, secure your date and starting time. Thats the easiest way. This service is free of charge and it is created for your convenience, for a faster booking process. </div>
      <div>No deposits or pre-payment required.</div>
      <div>Shortly after online booking, a representative will get it touch with you to discuss essential details.</div>
      <div>Of course, you can always use the traditional email or calling options for your booking.</div>
      <div>Also, get your free quote online by submitting the form at the top of our site. </div>
    </div>,
    style: panelStyle,
  },
  {
    key: '2',
    label: <div style={{fontWeight: "500", fontSize: "18px"}}>Confirm booking/ Agreement</div>,
    children: <div style={{color: "#374151", fontSize: "18px", margin: "0px 23px", lineHeight: "21px"}}>
      <div> After submitting your online booking request or quote form, one of our representatives will get in touch with you to discuss essential details about your move, like parking, additional notes & instructions, listen & answering your questions and concerns.</div>
      <div> After the confirmation, we will send the Combined Agreement & Freight Bill, Important Notice and Booklet  for your review, using your email address. Signing the electronic version of the Agreement is not necessary. These documents are sent for your review and information only. </div>
      <div> Upon the arrival of the movers, you will be handed the physical Agreement for signatures. That is when the counting of the time starts.</div>
    </div>,
    style: panelStyle,
  },
  {
    key: '3',
    label: <div style={{fontWeight: "500", fontSize: "18px"}}>Day of the move/ Loading</div>,
    children: <div style={{color: "#374151", fontSize: "18px", margin: "0px 23px", lineHeight: "21px"}}>
      <div> Day of the move/ Loading</div>
      <div> Upon arrival of the movers, you will be handed the physical Agreement for signatures. This is the moment when the counting of the time starts.</div>
      <div> It is strongly recommended that the shipper is ready and packed as much as possible upon the arrival of the movers. This means boxes with personal or kitchen items should be packed and ready to go. This not only will speed up the moving process but will also save you time & money. Furniture, beds, appliances, art and heavy items to be left in care of professionals. </div>
      <div> FYI:</div>
      <div> Loading the truck takes the longest part of the move because it involves wrapping each piece of furniture with blankets or shrink wrap, disassembly, securing the furniture for a safe ride and delivery. Sometimes there are long walks or stairs involved that might influence the time of the loading process as well. </div>
      <div> Please consider all these factors affecting the time of your move.</div>
      <div> Disclaimer:</div>
      <div> Please be aware, that at any point, Magic Movers LLC assumes no liability for the condition of the items packed by the shipper.</div>
    </div>,
    style: panelStyle,
  },
  {
    key: '4',
    label: <div style={{fontWeight: "500", fontSize: "18px"}}>Safe Delivery/ Unloading</div>,
    children: <div style={{color: "#374151", fontSize: "18px", margin: "0px 23px", lineHeight: "21px"}}>
      <div> After the delivery and unloading, we will reinstall/re-assemble your furnitures, connect your appliances, place boxes accordingly and at your request, mount your TVs. After all our services are done, the time will be stopped and you will be handed the Combined Agreement and Freight Bill for final signature of receipt of your belongings. The total on the bill must be paid using the payment method of your convenience, after the stopping of the time.  </div>
      <div> Congratulations!</div>
      <div> Your move is done.</div>
      <div> A review on our Google page will be much appreciated </div>
      <div> THANK YOU!!!</div>
    </div>,
    style: panelStyle,
  },
  
];
const getItems3 = (panelStyle) => [
  {
    key: '1',
    label: <div style={{fontWeight: "500", fontSize: "18px"}}>Are you insured?</div>,
    children: <div style={{color: "#374151", fontSize: "18px", margin: "0px 23px", lineHeight: "21px"}}>
      <div> We are fully insured moving company with liability and cargo insurance.</div>
      <div> Basic insurance of 0.60 cents per pound per article  (up to $20.000 in damages) is included in your rate, as well as taxes.</div>
    </div>,
    style: panelStyle,
  },
  {
    key: '2',
    label: <div style={{fontWeight: "500", fontSize: "18px"}}>Can you pack my stuff or does it have to be packed?</div>,
    children: <div style={{color: "#374151", fontSize: "18px", margin: "0px 23px", lineHeight: "21px"}}>
      <div> We recommend that you start packing your belongings yourself days in advance before the move, in order to save time and money. Depending on the volume of work, packing can add quite a few hours.</div>

      <div> We also recommend purchasing boxes from the vendor of your choice.</div>

      <div> However, if you want help, our packing services are included in hourly rates. </div>

      <div> We can also allocate a separate day, just for packing of your belongings. On request, we can provide regular boxes, kitchen paper and bubble wrap for a small fee. Please let us know beforehand about the quantity of boxes you need us to supply.</div>
    </div>,
    style: panelStyle,
  },
  {
    key: '3',
    label: <div style={{fontWeight: "500", fontSize: "18px"}}>Is Packing / Unpacking included in hourly rate?</div>,
    children: <div style={{color: "#374151", fontSize: "18px", margin: "0px 23px", lineHeight: "21px"}}>
      <div> Yes, packing services are included in our rates. </div>
      <div> Packing supplies included in rate: FREE wardrobe boxes (if returned on the same day). FREE plastic wrap. FREE tape. FREE blankets (if returned on the same day).</div>
      <div style={{lineHeight: "2px", marginTop: "20px"}}>  
        <div>At customers request, we can also provide packing materials for a fee:</div>
        <ul><li>Boxes (medium, large) $10/item</li></ul>
        <ul><li>Dish Pack $35/item</li></ul>
        <ul><li>Glass Pack $35/item</li></ul>
        <ul><li>Bubble wrap $20/roll</li></ul>
        <ul><li>Kitchen paper $30/roll</li></ul> 
      </div>
    </div>,
    style: panelStyle,
  },
  {
    key: '4',
    label: <div style={{fontWeight: "500", fontSize: "18px"}}>Do you provide disassembly and reassembly of my furniture?</div>,
    children: <div style={{color: "#374151", fontSize: "18px", margin: "0px 23px", lineHeight: "21px"}}>
      Magic Movers provides disassemble and re-assemble of your furniture. This service is included in the rates of local or long distance moves! No extra fees.
    </div>,
    style: panelStyle,
  },
  {
    key: '5',
    label: <div style={{fontWeight: "500", fontSize: "18px"}}>Can you mount my TV?</div>,
    children: <div style={{color: "#374151", fontSize: "18px", margin: "0px 23px", lineHeight: "21px"}}>
      TV Mounting is an extra handyman service that we offer, and it comes with additional fee of $100/item.
    </div>,
    style: panelStyle,
  },
  {
    key: '6',
    label: <div style={{fontWeight: "500", fontSize: "18px"}}>How about Appliances?</div>,
    children: <div style={{color: "#374151", fontSize: "18px", margin: "0px 23px", lineHeight: "21px"}}>
      <div>Transportation of regular appliances from ground to ground floor or via elevator is included in the hourly rate. </div>
      <div>However, moving appliances via sets of stairs (more than 5 steps)or extra large appliances will add $100/item to your bill. </div>
      <div>IMPORTANT: Magic Movers LLC assumes NO liability for readjustments, resynchronization or refocusing of such articles upon delivery!</div>
    </div>,
    style: panelStyle,
  },
  {
    key: '7',
    label: <div style={{fontWeight: "500", fontSize: "18px"}}>Do you move unique or extra large items?</div>,
    children: <div style={{color: "#374151", fontSize: "18px", margin: "0px 23px", lineHeight: "21px"}}>
        <div>Unique or large items are part of our job. Extra heavy items like safe, china cabinet, grand father clocks, extra large outdoor items will add a $100/item to your bill and it can be discussed in advance. Contact us for more details about your unique/heavy items. </div>
        <div>IMPORTANT: Magic Movers LLC assumes NO liability for readjustments, resynchronization or refocusing of such articles upon delivery!</div>
    </div>,
    style: panelStyle,
  },
  {
    key: '8',
    label: <div style={{fontWeight: "500", fontSize: "18px"}}>What is Double Drive Time?</div>,
    children: <div style={{color: "#374151", fontSize: "18px", margin: "0px 23px", lineHeight: "21px"}}>
        The Double Drive Time is a California Law that requires moving companies to double traveling time from pickup to delivery point. i.e. If it takes 15 minutes to drive from pickup to delivery, the moving company will note 30 minutes as a driving time. Double Drive Time is there to cover workers traveling time and it is included in hourly rate.
    </div>,
    style: panelStyle,
  },
  {
    key: '9',
    label: <div style={{fontWeight: "500", fontSize: "18px"}}>Do you have minimum requirements?</div>,
    children: <div style={{color: "#374151", fontSize: "18px", margin: "0px 23px", lineHeight: "21px"}}>
        Minimum booking policy for our services is 3 hours. 
    </div>,
    style: panelStyle,
  },
  {
    key: '10',
    label: <div style={{fontWeight: "500", fontSize: "18px"}}>Do I have to pay a deposit?</div>,
    children: <div style={{color: "#374151", fontSize: "18px", margin: "0px 23px", lineHeight: "21px"}}>
        No deposit required.
    </div>,
    style: panelStyle,
  },
  {
    key: '11',
    label: <div style={{fontWeight: "500", fontSize: "18px"}}>Can I Re-schedule my move?</div>,
    children: <div style={{color: "#374151", fontSize: "18px", margin: "0px 23px", lineHeight: "21px"}}>
        In the event of re-scheduling of the date for moving services, the shipper has the options to re-schedule the move one time, free of charge. If the move has been re-scheduled more than one time from its original date, the carrier shall charge the shipper a lost opportunities fee of $327 at the end of the move or shall consider the move “cancelled by shipper” and cancellation notice will be sent, without any fees.
    </div>,
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
  const [loadingIcon, setLoadingIcon] = useState(true);

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

  useEffect(()=>{

    const localData = localStorage.getItem("user");
    if(localData){  
      console.log("user exists")
    } else {
      console.log("no user exists")
      localStorage.setItem("user", "1");
      axios
        .get(`customer.json`)
        .then((res) => { 
            const data = Object.entries(res.data).reverse();   
            if(data[0][1].user){ 
              const count = data[0][1].user + 1 
              const body = {
                user: count
              }
               axios
                .patch(`customer/${data[0][0]}.json`, body)
                .then((res) => { 

                }) 
            }
        })
      
      // axios
      // .patch(`customer/-OMRC4M59wiF097j8T22.json`, body)
      // .then((res) => {
        
      // }) 
    } 
  },[]);

  const { token } = theme.useToken(); 
  const panelStyle = { 
    background: token.colorFillAlter,  
  };
 
  useEffect(()=>{ 
    setTimeout(()=>{
      setLoadingIcon(false)
    },4000)
  },[])
   
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
      {loadingIcon ? <Loading /> : null}
      
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
                        {` Magic Movers LLC - Relocate with confidence!`}
                        </div>
                        <div className={css.mainTitleSmall}>
                        Full Service In-State Movers 
                        </div>
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
                <div style={{fontSize: "25px", color: "red", fontWeight: "600", margin: "12px 0px", textAlign: "center"}}>$98.9
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
                  <div style={{fontWeight: "600"}}>ADDITIONAL FEES: 50$</div>
                </div> 

                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "6px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>Fuel $50 one time flat fee</div>
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
                <div style={{fontSize: "25px", color: "red", fontWeight: "600", margin: "12px 0px", textAlign: "center"}}>$138.9
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
                  <div style={{fontWeight: "600"}}>ADDITIONAL FEES: 50$</div>
                </div> 

                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "6px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>Fuel $50 one time flat fee</div>
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
                <div style={{fontSize: "25px", color: "red", fontWeight: "600", margin: "12px 0px", textAlign: "center"}}>$178.9
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
                  <div style={{fontWeight: "600"}}>ADDITIONAL FEES: 50$</div>
                </div> 

                <div style={{ alignItems: "center", fontSize: "14px", display: "flex", gap: "8px", color: "#808080", marginTop: "6px", marginLeft: "3px"}}>
                  <div style={{  background: "#808080", width: "5px", height: "5px", borderRadius: "50%"}}></div>
                  <div style={{fontWeight: "600"}}>Fuel $50 one time flat fee</div>
                </div> 
                <div className={css.BookNow}>
                  Book Now
                  <CaretRightOutlined />
                </div>
              </div>
              <div className={css.boxs} style={{height: "40%"}}>
                <div style={{display: "flex", justifyContent: "center"}}>
                  <Image src="/img/muv5.avif" width={80} height={45} className={css.muv3} alt="Movers"/>
                </div>
                <div style={{fontSize: "18px", fontWeight: 600, marginTop: "10px", textAlign: "center"}}>Long Distance moving</div>
                <div style={{fontSize: "12px", marginTop: "5px", textAlign: "center"}}>(STUDIO, 1 BDR OR SMALL OFFICE)</div>
                <div style={{fontSize: "25px", color: "red", fontWeight: "600", margin: "12px 0px", textAlign: "center"}}>$209.9
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
        <div   className={css.whyMagicCss}> 
          <div className={css.ourservicesCss} > 
            <div className={css.whyMagicTitle}>
              Why Magic Movers LLC?
            </div>
            <Collapse 
            size="large"
                bordered={false} 
                    defaultActiveKey={['1']}
                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                    style={{
                      background: token.colorBgContainer,
                    }}
                    items={getItems(panelStyle)}
                /> 
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
              
            <div><div className={css.submitCss} style={{margin: "30px 0px"}}>GET A FREE QUOTE</div></div>
            </div>
          </div>  
        </div>
        <div   className={css.whyMagicCss}> 
          <div className={css.ourservicesCss} > 
            <div className={css.whyMagicTitle}>
              How to work?
            </div>
            <Collapse 
            size="large"
                bordered={false} 
                    defaultActiveKey={['1']}
                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                    style={{
                      background: token.colorBgContainer,
                    }}
                    items={getItems2(panelStyle)}
                /> 
          </div>  
        </div>
        <div   className={css.whyMagicCss} style={{background: "#fafafa"}}> 
          <div className={css.ourservicesCss} > 
            <div className={css.whyMagicTitle} style={{color: "#000"}}>
            Q&A
            </div>
            <Collapse 
            size="large"
                bordered={false} 
                    defaultActiveKey={['1']}
                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                    style={{
                      background: token.colorBgContainer,
                    }}
                    items={getItems3(panelStyle)}
                /> 
          </div>  
        </div>
        <div className={css.whyMagicCss} style={{background: "#faad142b"}}> 
          <div className={css.ourservicesCss} > 
            <div className={css.whyMagicTitle} style={{color: "rgba(25, 62, 61, 0.9)"}}>
            Areas We Serve 
            </div>
                    <div className={css.mapsLayout}>
                      <div className={css.mapsTitles}>
                          <div style={{width: "215px"}}> 
                            <ul><li>Los Angeles</li></ul>
                            <ul><li>Santa Monica</li></ul>
                            <ul><li>Beverly Hills</li></ul>
                            <ul><li>Brentwood</li></ul>
                            <ul><li>Pacific Palisades</li></ul>
                            <ul><li>Sherman Oaks</li></ul>
                            <ul><li>San Pedro</li></ul>
                            <ul><li>Mar Vista</li></ul>
                            <ul><li>Culver City</li></ul>
                            <ul><li>Woodland Hills</li></ul>
                            <ul><li>Long Beach</li></ul>
                            <ul><li>Calabasas</li></ul>
                            <ul><li>Studio City</li></ul>
                            <ul><li>Hollywood</li></ul>
                          </div>
                          <div style={{width: "215px"}}> 
                            <ul><li>Mid City</li></ul>
                            <ul><li>North Hollywood</li></ul>
                            <ul><li>Encino</li></ul>
                            <ul><li>West Hollywood</li></ul>
                            <ul><li>Silver Lake</li></ul>
                            <ul><li>Glendale</li></ul>
                            <ul><li>Rancho Palos Verdes</li></ul>
                            <ul><li>Playa Vista</li></ul>
                            <ul><li>Malibu</li></ul>
                            <ul><li>Pasadena</li></ul>
                            <ul><li>Burbank</li></ul>
                            <ul><li>Redondo Beach</li></ul>
                            <ul><li>Westwood</li></ul>
                            <ul><li>Torrance</li></ul>
                          </div>
                      </div>
                      <MapContainer center={[34.05759105072021, -118.24560731723486]} zoom={10} style={{ height: "500px", width: "90%", zIndex: "0", margin: "0px auto" }}>
                          <TileLayer  
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          />
                          {locations.map((loc, index) => (
                            <Marker key={index} position={[loc.lat, loc.lng]} 
                            >
                              <Popup>{loc.name}</Popup>
                            </Marker>
                          ))}
                      </MapContainer>
                  </div>
          </div>  
        </div> 
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
                      Los Angeles, CA 90036
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